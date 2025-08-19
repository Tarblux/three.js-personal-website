/**
 * PriorityLoadingManager - A custom loading manager that prioritizes critical assets
 * 
 * Allows users to start interacting with the app after critical assets load,
 * while lower priority assets continue loading in the background.
 */

// TODO: Add all assets to the manifest , and make sure nothing here is blocking the progress of the app EVER !!!

import * as THREE from 'three'
import React from 'react'
import soundManager from './soundManager.js'

class PriorityLoadingManager {
  constructor() {
    this.listeners = new Set()
    this.threeLoadingManager = null
    this.setupThreeLoadingManager()
    this.phases = {
      critical: {
        name: 'Critical Assets',
        loaded: 0,
        total: 0,
        assets: [],
        completed: false
      },
      high: {
        name: 'High Priority',
        loaded: 0,
        total: 0,
        assets: [],
        completed: false
      },
      medium: {
        name: 'Medium Priority',
        loaded: 0,
        total: 0,
        assets: [],
        completed: false
      },
      low: {
        name: 'Low Priority',
        loaded: 0,
        total: 0,
        assets: [],
        completed: false
      }
    }
    
    this.currentPhase = 'critical'
    this.overallProgress = 0
    this.criticalAssetsReady = false
    
    // Asset definitions
    this.assetManifest = {
      critical: {
        videos: [
          '/videos/city-loading2.mp4'
        ],
        images: [
          '/images/UI/portfolio-boardingpass.webp'
        ],
        models: [
          '/models/train.glb',
          '/models/train-wheel.glb', 
          '/models/fences.glb',
          '/models/trees.glb',
          '/models/railtrack.glb',
          '/models/booch.glb',
          '/models/chesspark.glb',
          '/models/landscape.glb',
          '/models/projects.glb',
          '/models/campus.glb',
          '/models/streetlights.glb',
          '/models/downtown.glb',
          '/models/stadium.glb'
        ],
        textures: [
          '/textures/train.ktx2',
          '/textures/train-wheel.jpg',
          '/textures/fences.webp',
          '/textures/trees.webp',
          '/textures/railtrack.webp',
          '/textures/booch.webp',
          '/textures/chesspark.webp',
          '/textures/landscape.webp',
          '/textures/projects.webp',
          '/textures/campus.webp',
          '/textures/streetlights.webp',
          '/textures/downtown.webp',
          '/textures/stadium.webp',
          '/textures/stock-slider.webp',
          '/textures/stock-slider2.webp',
          '/textures/stock-slider3.webp',
          '/textures/stock-slider4.webp',
          '/textures/stock-slider5.webp',
          '/textures/cloud.webp'
        ],
        sounds: [
          '/sounds/ticket-printer.ogg',
          '/sounds/ticket-printer.mp3',
          '/sounds/train-sounds.ogg', 
          '/sounds/train-sounds.mp3'
        ]
      },
      high: {
        sounds: [
          '/sounds/factory.ogg',
          '/sounds/factory.mp3',
          '/sounds/trading-office.ogg',
          '/sounds/trading-office.mp3'
        ]
      },
      medium: {
        models: [
          '/models/language-institute.glb',
          '/models/flags.glb',
          '/models/field.glb'
        ],
        textures: [
          '/textures/language-institute.jpg',
          '/textures/flags.webp',
          '/textures/field.webp'
        ],
        videos: [
          '/videos/reiss.mp4',
          '/videos/declan.mp4',
          '/videos/tariq-freekick.mp4'
        ]
      },
      low: {
        models: [
          '/models/contact.glb'
        ],
        textures: [
          '/textures/contact.webp'
        ],
        videos: [
          '/videos/hobbies-solo-dolo.mp4',
          '/videos/tariq-blooper.mp4',
          '/videos/sakaletters.mp4'
        ],
        sounds: [
          '/sounds/book-touch.ogg',
          '/sounds/book-touch.mp3',
          '/sounds/bottle-sfx.ogg',
          '/sounds/bottle-sfx.mp3',
          '/sounds/infographic-pop-1.ogg',
          '/sounds/infographic-pop-1.mp3',
          '/sounds/modal-close.ogg',
          '/sounds/modal-close.mp3',
          '/sounds/polaroid-print.ogg',
          '/sounds/polaroid-print.mp3',
          '/sounds/scroll-stop.ogg',
          '/sounds/scroll-stop.mp3',
          '/sounds/send-swoosh.ogg',
          '/sounds/send-swoosh.mp3'
        ]
      }
    }
    
    this.loadedAssets = new Set()
    this.failedAssets = new Set()
    this.initializePhaseTotals()
  }
  
  setupThreeLoadingManager() {
    this.threeLoadingManager = new THREE.LoadingManager(
      // onLoad
      () => {
        // All items loaded
      },
      // onProgress
      (url, itemsLoaded, itemsTotal) => {
        // Individual item loaded
        const phase = this.getAssetPhase(url)
        this.markAssetLoaded(url, phase)
      },
      // onError
      (url) => {
        const phase = this.getAssetPhase(url)
        this.markAssetFailed(url, phase, new Error(`Failed to load: ${url}`))
      }
    )
    
    // Set this as the default loading manager for Three.js
    THREE.DefaultLoadingManager.onLoad = this.threeLoadingManager.onLoad
    THREE.DefaultLoadingManager.onProgress = this.threeLoadingManager.onProgress
    THREE.DefaultLoadingManager.onError = this.threeLoadingManager.onError
  }
  
  initializePhaseTotals() {
    Object.keys(this.phases).forEach(phase => {
      const manifest = this.assetManifest[phase]
      if (manifest) {
        let total = 0
        Object.values(manifest).forEach(assetArray => {
          total += assetArray.length
        })
        this.phases[phase].total = total
      }
    })
  }
  
  subscribe(listener) {
    this.listeners.add(listener)
    // Immediately call with current state
    listener(this.getStatus())
    
    return () => {
      this.listeners.delete(listener)
    }
  }
  
  notifyListeners() {
    const status = this.getStatus()
    this.listeners.forEach(listener => {
      try {
        listener(status)
      } catch (error) {
        console.warn('PriorityLoadingManager listener error:', error)
      }
    })
  }
  
  getStatus() {
    const totalLoaded = Object.values(this.phases).reduce((sum, phase) => sum + phase.loaded, 0)
    const totalAssets = Object.values(this.phases).reduce((sum, phase) => sum + phase.total, 0)
    
    return {
      phase: this.currentPhase,
      phases: { ...this.phases },
      overallProgress: totalAssets > 0 ? (totalLoaded / totalAssets) * 100 : 0,
      criticalReady: this.criticalAssetsReady,
      canStartExperience: this.phases.critical.completed
    }
  }
  
  markAssetLoaded(assetPath, phase) {
    if (this.loadedAssets.has(assetPath)) return
    
    this.loadedAssets.add(assetPath)
    this.phases[phase].loaded++
    
    // Check if phase is complete
    if (this.phases[phase].loaded >= this.phases[phase].total) {
      this.phases[phase].completed = true
      
      if (phase === 'critical') {
        this.criticalAssetsReady = true
      }
      
      // Move to next phase
      if (phase === 'critical' && !this.phases.high.completed) {
        this.currentPhase = 'high'
      } else if (phase === 'high' && !this.phases.medium.completed) {
        this.currentPhase = 'medium'
      } else if (phase === 'medium' && !this.phases.low.completed) {
        this.currentPhase = 'low'
      }
    }
    
    this.notifyListeners()
  }
  
  markAssetFailed(assetPath, phase, error) {
    if (this.failedAssets.has(assetPath)) return
    
    this.failedAssets.add(assetPath)
    console.warn(`Failed to load ${phase} asset: ${assetPath}`, error)
    
    // Still count as "loaded" to not block progress
    this.markAssetLoaded(assetPath, phase)
  }
  
  async preloadVideoAsset(src) {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video')
      video.preload = 'metadata'
      video.muted = true
      video.playsInline = true
      
      const onCanPlay = () => {
        cleanup()
        resolve(video)
      }
      
      const onError = () => {
        cleanup()
        reject(new Error(`Failed to load video: ${src}`))
      }
      
      const cleanup = () => {
        video.removeEventListener('canplaythrough', onCanPlay)
        video.removeEventListener('error', onError)
      }
      
      video.addEventListener('canplaythrough', onCanPlay)
      video.addEventListener('error', onError)
      video.src = src
    })
  }
  
  async preloadImageAsset(src) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
      img.src = src
    })
  }
  
  async preloadSoundAsset(src) {
    return new Promise((resolve, reject) => {
      const sound = soundManager.ensure(`preload-${src}`, {
        src: [src],
        preload: true,
        volume: 0
      })
      
      sound.once('load', () => resolve(sound))
      sound.once('loaderror', () => reject(new Error(`Failed to load sound: ${src}`)))
    })
  }
  
  async preloadPhase(phaseName) {
    const manifest = this.assetManifest[phaseName]
    if (!manifest) return
    
    const loadPromises = []
    
    // Load videos
    if (manifest.videos) {
      manifest.videos.forEach(src => {
  if (this.loadedAssets.has(src)) return
        loadPromises.push(
          this.preloadVideoAsset(src)
            .then(() => this.markAssetLoaded(src, phaseName))
            .catch(error => this.markAssetFailed(src, phaseName, error))
        )
      })
    }
    
    // Load images
    if (manifest.images) {
      manifest.images.forEach(src => {
  if (this.loadedAssets.has(src)) return
        loadPromises.push(
          this.preloadImageAsset(src)
            .then(() => this.markAssetLoaded(src, phaseName))
            .catch(error => this.markAssetFailed(src, phaseName, error))
        )
      })
    }
    
    // Load sounds
    if (manifest.sounds) {
      manifest.sounds.forEach(src => {
  if (this.loadedAssets.has(src)) return
        loadPromises.push(
          this.preloadSoundAsset(src)
            .then(() => this.markAssetLoaded(src, phaseName))
            .catch(error => this.markAssetFailed(src, phaseName, error))
        )
      })
    }
    
    // Note: Models and textures are handled by Three.js hooks in components
    // We'll track them when components mount
    if (manifest.models) {
      manifest.models.forEach(src => {
  if (this.loadedAssets.has(src)) return
        // These will be marked as loaded when the components using them mount
        // For now, we'll preload them using Three.js
        loadPromises.push(
          new Promise((resolve, reject) => {
            const loader = new THREE.GLTFLoader()
            loader.load(
              src,
              () => {
                this.markAssetLoaded(src, phaseName)
                resolve()
              },
              undefined,
              (error) => {
                this.markAssetFailed(src, phaseName, error)
                reject(error)
              }
            )
          })
        )
      })
    }
    
    if (manifest.textures) {
      manifest.textures.forEach(src => {
  if (this.loadedAssets.has(src)) return
        loadPromises.push(
          new Promise((resolve, reject) => {
            const loader = src.endsWith('.ktx2') ? new THREE.KTX2Loader() : new THREE.TextureLoader()
            loader.load(
              src,
              () => {
                this.markAssetLoaded(src, phaseName)
                resolve()
              },
              undefined,
              (error) => {
                this.markAssetFailed(src, phaseName, error)
                reject(error)
              }
            )
          })
        )
      })
    }
    
    // Don't wait for all to complete, load progressively
    return Promise.allSettled(loadPromises)
  }
  
  async startLoading() {
    // Start with critical assets
    this.currentPhase = 'critical'
    // 1. Force the loading screen video to load (if not already) BEFORE anything else
    const loadingVideo = '/videos/city-loading2.mp4'
    if (!this.loadedAssets.has(loadingVideo)) {
      try {
        await this.preloadVideoAsset(loadingVideo)
        this.markAssetLoaded(loadingVideo, 'critical')
      } catch (e) {
        this.markAssetFailed(loadingVideo, 'critical', e)
      }
    }
    // 2. Now preload remaining critical assets (skips already loaded ones)
    await this.preloadPhase('critical')
    
    // Start high priority in background
    this.preloadPhase('high')
    
    // Chain medium and low priority
    setTimeout(() => {
      if (this.phases.high.completed) {
        this.preloadPhase('medium')
        setTimeout(() => {
          if (this.phases.medium.completed) {
            this.preloadPhase('low')
          }
        }, 1000)
      }
    }, 2000)
  }
  
  // Method for components to register that they've loaded their assets
  registerAssetLoaded(assetPath, phase = 'critical') {
    this.markAssetLoaded(assetPath, phase)
  }
  
  // Method to get the appropriate phase for an asset
  getAssetPhase(assetPath) {
    for (const [phase, manifest] of Object.entries(this.assetManifest)) {
      for (const assetArray of Object.values(manifest)) {
        if (assetArray.includes(assetPath)) {
          return phase
        }
      }
    }
    return 'critical' // Default to critical if not found
  }
}

// Create singleton instance
export const priorityLoadingManager = new PriorityLoadingManager()

// React hook is exported from separate file to avoid circular imports

// Higher-order component to track asset loading
export function withAssetTracking(WrappedComponent, assetPaths) {
  return function TrackedComponent(props) {
    React.useEffect(() => {
      assetPaths.forEach(assetPath => {
        const phase = priorityLoadingManager.getAssetPhase(assetPath)
        priorityLoadingManager.registerAssetLoaded(assetPath, phase)
      })
    }, [])
    
    return React.createElement(WrappedComponent, props)
  }
}

export default priorityLoadingManager
