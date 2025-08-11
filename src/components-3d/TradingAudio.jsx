import React, { useState, useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { AudioListener, PositionalAudio as ThreePositionalAudio, AudioLoader } from 'three'
import { getBestAudioFormat } from '../utils/formatUtils'
import soundManager from '../utils/soundManager'
import { useTradingAudioControls } from '../hooks/useTradingAudioControls'

export function TradingAudio({ theatreSequence, onDebugUpdate, ...props }) {
  const [audioReady, setAudioReady] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)
  const [distanceToCamera, setDistanceToCamera] = useState(0)
  const { camera, scene } = useThree()
  const audioRef = useRef(null)
  const listenerRef = useRef(null)
  const unsubscribeRef = useRef(null)
  const [globalAudio, setGlobalAudio] = useState(() => {
    try { return soundManager.getState() } catch { return { volume: 1, muted: false } }
  })

  // Smoothly ramp volume to avoid pops and pauses
  const applyVolume = (targetVolume, rampSeconds = 0.05) => {
    if (!audioRef.current) return
    const audio = audioRef.current
    const v = Math.max(0, Math.min(1, targetVolume))
    const ctx = audio.context
    const gainParam = audio.gain && audio.gain.gain
    if (gainParam && ctx) {
      try {
        const now = ctx.currentTime
        gainParam.cancelScheduledValues(now)
        // Start from current value and ramp to target
        gainParam.setValueAtTime(gainParam.value, now)
        gainParam.linearRampToValueAtTime(v, now + rampSeconds)
        return
      } catch {}
    }
    // Fallback to old method
    audio.setVolume(v)
  }
  
  const {
    volume,
    refDistance,
    maxDistance,
    rolloffFactor,
    position,
    showInfluenceArea,
    showCenterIndicator,
    influenceOpacity,
    debugLogging,
    showDebugHUD,
  } = useTradingAudioControls()
  
  // Get the best supported audio format
  const audioUrl = getBestAudioFormat('/sounds/trading-office')

  // Step 1: Wait for user interaction (Browser requirement)
  useEffect(() => {
    const handleInteraction = () => {
      setUserInteracted(true)
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('keydown', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
    }

    document.addEventListener('click', handleInteraction)
    document.addEventListener('keydown', handleInteraction) 
    document.addEventListener('touchstart', handleInteraction)

    return () => {
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('keydown', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
    }
  }, [])

  // Step 2: Setup AudioListener and PositionalAudio after Theatre.js stabilizes
  useEffect(() => {
    if (!userInteracted || !camera) return

    // Wait for Theatre.js to settle (deferred initialization)
    const deferredSetup = setTimeout(() => {
      try {
        // Ensure AudioListener exists on camera
        let listener = camera.children.find(child => child instanceof AudioListener)
        
        if (!listener) {
          listener = new AudioListener()
          camera.add(listener)
          listenerRef.current = listener
        }

        // Create PositionalAudio manually using Three.js (more control)
        const positionalAudio = new ThreePositionalAudio(listener)
        
        // Load audio
        const audioLoader = new AudioLoader()
        audioLoader.load(
          audioUrl,
          (buffer) => {
            positionalAudio.setBuffer(buffer)
            positionalAudio.setRefDistance(refDistance)
            positionalAudio.setMaxDistance(maxDistance)
            positionalAudio.setRolloffFactor(rolloffFactor)
            positionalAudio.setLoop(true)
            positionalAudio.setVolume(globalAudio.muted ? 0 : volume * (globalAudio.volume ?? 1))
            
            // Position the audio
            positionalAudio.position.set(...position)
            
            // Add to scene
            scene.add(positionalAudio)
            audioRef.current = positionalAudio
            
            // Start playing
            positionalAudio.play()
            
            setAudioReady(true)
          },
          (progress) => {
            if (debugLogging) {
              console.log('DeferredTradingAudio: Loading progress:', progress)
            }
          },
          (error) => {
            console.error('DeferredTradingAudio: Error loading audio:', error)
          }
        )

      } catch (error) {
        console.error('DeferredTradingAudio: Setup error:', error)
      }
    }, 2000) // 2 second delay to ensure Theatre.js is stable

    return () => {
      clearTimeout(deferredSetup)
      
      // Cleanup
      if (audioRef.current) {
        audioRef.current.stop()
        scene.remove(audioRef.current)
        audioRef.current = null
      }
      
      if (listenerRef.current && listenerRef.current.parent) {
        listenerRef.current.parent.remove(listenerRef.current)
        listenerRef.current = null
      }
    }
  }, [userInteracted, camera, scene, audioUrl])

  // Update audio properties when controls change
  useEffect(() => {
    if (audioRef.current) {
      // Combine local control with global state
      const effective = globalAudio.muted ? 0 : volume * (globalAudio.volume ?? 1)
      applyVolume(effective, 0.05)
      audioRef.current.setRefDistance(refDistance)
      audioRef.current.setMaxDistance(maxDistance)
      audioRef.current.setRolloffFactor(rolloffFactor)
      audioRef.current.position.set(...position)
      
      if (debugLogging) {
        console.log('DeferredTradingAudio: Updated properties:', {
          volume: effective,
          refDistance,
          maxDistance,
          rolloffFactor,
          position,
        })
      }
    }
  }, [volume, refDistance, maxDistance, rolloffFactor, position, debugLogging, globalAudio.volume, globalAudio.muted])

  // Subscribe to global sound manager changes
  useEffect(() => {
    if (!soundManager || typeof soundManager.subscribe !== 'function') return
    unsubscribeRef.current = soundManager.subscribe((state) => setGlobalAudio(state))
    return () => {
      if (unsubscribeRef.current) {
        try { unsubscribeRef.current() } catch {}
        unsubscribeRef.current = null
      }
    }
  }, [])

  // Calculate distance to camera for debugging
  useFrame(() => {
    if (camera && audioReady) {
      const distance = camera.position.distanceTo({
        x: position[0],
        y: position[1],
        z: position[2],
      })
      setDistanceToCamera(distance)
      
      // Update debug data for HUD
      if (onDebugUpdate) {
        onDebugUpdate({
          distance,
          volume,
          refDistance,
          maxDistance,
          rolloffFactor,
          position,
          showDebugHUD,
        })
      }
      
      if (debugLogging && Math.floor(distance) !== Math.floor(distanceToCamera)) {
        console.log(`Distance to trading audio: ${distance.toFixed(2)} units`)
        
        // Audio volume calculations for debugging
        const base = distance <= refDistance 
          ? volume 
          : volume * (refDistance / (refDistance + rolloffFactor * (distance - refDistance)))
        const effectiveVolume = (globalAudio.muted ? 0 : base * (globalAudio.volume ?? 1))
        
        console.log(`Effective audio volume: ${(effectiveVolume * 100).toFixed(1)}%`)
      }
    }
  })

  // Visual debugging indicators
  if (audioReady) {
    return (
      <group {...props}>
        {/* Center indicator - small sphere at exact audio position */}
        {showCenterIndicator && (
          <mesh position={position} scale={[1, 1, 1]}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshBasicMaterial color="red" transparent opacity={0.8} />
          </mesh>
        )}
        
        {/* Reference distance sphere - where audio is at full volume */}
        {showInfluenceArea && (
          <mesh position={position}>
            <sphereGeometry args={[refDistance, 32, 32]} />
            <meshBasicMaterial 
              color="yellow" 
              transparent 
              opacity={influenceOpacity}
              wireframe
            />
          </mesh>
        )}
        
        {/* Max distance sphere - where audio becomes inaudible */}
        {showInfluenceArea && (
          <mesh position={position}>
            <sphereGeometry args={[maxDistance, 32, 32]} />
            <meshBasicMaterial 
              color="blue" 
              transparent 
              opacity={influenceOpacity * 0.5}
              wireframe
            />
          </mesh>
        )}
        
        {/* Distance indicator text (you can remove this if not needed) */}
        {debugLogging && (
          <group position={[position[0], position[1] + 5, position[2]]}>
            <mesh scale={[0.2, 0.2, 0.2]}>
              <sphereGeometry args={[1, 8, 8]} />
              <meshBasicMaterial color="white" />
            </mesh>
          </group>
        )}
      </group>
    )
  }

  // Show loading indicator before audio is ready
  if (userInteracted && !audioReady) {
    return (
      <group {...props}>
        <mesh position={position} scale={[2, 2, 2]}>
          <sphereGeometry args={[0.5, 8, 8]} />
          <meshBasicMaterial color="orange" transparent opacity={0.5} />
        </mesh>
      </group>
    )
  }

  return null
}
