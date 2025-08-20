/**
 * FUTURE ME: This component uses a HYBRID VIDEO APPROACH to solve cross-browser compatibility issues.
 * 
 * WHY WE NEEDED THIS:
 * - Chrome/Desktop: The simplified approach caused "AbortError: play() request interrupted by pause()" 
 *   and lost the autoplay behavior when users approach the stadium
 * - Safari/Mobile: The full approach caused constant video remounting, browser freezing, and 
 *   conflicts with strict autoplay policies
 * 
 * THE SOLUTION:
 * - Safari/Mobile: Use simplified mode - just attach to soundManager, let useVideoTexture handle everything
 * - Chrome/Desktop: Use full mode - manual video control, autoplay behavior, stopAllMediaExcept logic
 * 
 * This gives us the best of both worlds: Safari compatibility + Chrome autoplay functionality.
 * 
 * If you're debugging video issues, check which mode is being used in the console logs.
 */
import React, { Suspense, useMemo, useEffect, useRef } from 'react'
import { useGLTF, useVideoTexture } from '@react-three/drei'
import { useSmartTexture } from '../hooks/useSmartTexture.js'
import soundManager from '../utils/soundManager.js'
import { isSafari, isMobile } from '../utils/deviceDetection.js'

function VideoMaterial({ src, audioActive, mediaKey = 'stadium-video' }) {
  const texture = useVideoTexture(src, {
    muted: true,
    loop: true,
    start: true,
    playsInline: true,
    crossOrigin: 'anonymous',
  })
  const videoElRef = useRef(null)

  // Flip the video using UV scaling
  useMemo(() => {
    texture.repeat.set(1, -1)
    texture.offset.set(0, 1)
  }, [texture])

  // Store video element reference when texture loads
  useEffect(() => {
    if (texture.image) {
      videoElRef.current = texture.image
    }
  }, [texture.image])

  // Hybrid approach: use simplified method for Safari/mobile, full method for others
  useEffect(() => {
    const videoEl = videoElRef.current
    if (!videoEl) return

    const key = `${mediaKey}`
    const useSafariMode = isSafari() || isMobile()

    if (useSafariMode) {
      // Simplified Safari/mobile approach
      const detach = soundManager.attachMediaElement(key, videoEl, {
        localVolume: 1,
        active: !!audioActive,
      })
      return detach
    } else {
      // Full Chrome/desktop approach with autoplay behavior
      // Stop all other videos before starting this one
      soundManager.stopAllMediaExcept(key)

      // Ensure starts muted to satisfy autoplay policies and start playing immediately
      try {
        videoEl.muted = true
        videoEl.playsInline = true
        videoEl.currentTime = 0 // Always start from beginning
        videoEl.play() // Start playing immediately (muted)
      } catch (error) {
        console.warn('Video play failed:', error)
      }

      // Attach to global audio control and set initial active state
      const detach = soundManager.attachMediaElement(key, videoEl, {
        localVolume: 1,
        active: !!audioActive,
      })

      // Also reflect active -> muted directly for immediate effect
      try {
        const state = soundManager.getState()
        const effectiveVolume = state.muted || !audioActive ? 0 : state.volume
        videoEl.volume = effectiveVolume
        videoEl.muted = effectiveVolume === 0
      } catch (error) {
        console.warn('Video volume setup failed:', error)
      }

      return () => {
        detach?.()
      }
    }
  }, [src, audioActive, mediaKey]) // Only depend on props, not texture object

  return <meshBasicMaterial map={texture} toneMapped={false} />
}

export function Stadium({ videoUrl, audioActive = false, videoChangeKey = 0, ...props }) {
  const { nodes } = useGLTF('/models/stadium.glb')
  
  const bakedTexture = useSmartTexture('stadium')
  bakedTexture.flipY = false

  const safeVideoUrl = useMemo(() => videoUrl || '/videos/reiss.mp4', [videoUrl])

  // Trigger restart when videoChangeKey changes (same video re-selected)
  useEffect(() => {
    if (videoChangeKey > 0) {
      soundManager.restartMedia('stadium-video')
    }
  }, [videoChangeKey])

  return (
    <group {...props} dispose={null} scale={100}>
      <mesh
        geometry={nodes['stadium-panel'].geometry}
        position={[-3.547, 0.266, 2.451]}
        rotation={[Math.PI / 2, 0, 1.582]}
      >
        <Suspense fallback={<meshBasicMaterial color={'black'} wireframe />}>
          {safeVideoUrl && (
            <VideoMaterial key={safeVideoUrl} src={safeVideoUrl} audioActive={audioActive} />
          )}
        </Suspense>
      </mesh>
      <mesh
        geometry={nodes.stadium.geometry}
        position={[-3.547, 0.266, 2.451]}
        rotation={[Math.PI / 2, 0, 1.582]}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/stadium.glb')
