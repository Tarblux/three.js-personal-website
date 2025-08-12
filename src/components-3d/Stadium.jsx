import React, { Suspense, useMemo, useEffect } from 'react'
import { useGLTF, useVideoTexture, useTexture } from '@react-three/drei'
import soundManager from '../utils/soundManager.js'

function VideoMaterial({ src, audioActive, mediaKey = 'stadium-video' }) {
  const texture = useVideoTexture(src, {
    muted: true,
    loop: true,
    start: true,
    playsInline: true,
    crossOrigin: 'anonymous',
  })

  // Flip the video using UV scaling
  texture.repeat.set(1, -1)
  texture.offset.set(0, 1)

  useEffect(() => {
    const videoEl = texture.image; // HTMLVideoElement
    if (!videoEl) return;

    const key = `${mediaKey}`;

    // Stop all other videos before starting this one
    soundManager.stopAllMediaExcept(key);

    // Ensure starts muted to satisfy autoplay policies and start playing immediately
    try {
      videoEl.muted = true;
      videoEl.playsInline = true;
      videoEl.currentTime = 0; // Always start from beginning
      videoEl.play(); // Start playing immediately (muted)
    } catch {}

    // Attach to global audio control and set initial active state
    const detach = soundManager.attachMediaElement(key, videoEl, {
      localVolume: 1,
      active: !!audioActive,
    });

    // Also reflect active -> muted directly for immediate effect
    try {
      const state = soundManager.getState();
      const effectiveVolume = state.muted || !audioActive ? 0 : state.volume;
      videoEl.volume = effectiveVolume;
      videoEl.muted = effectiveVolume === 0;
    } catch {}

    return () => {
      detach?.();
    };
  }, [texture, src, audioActive])

  return <meshBasicMaterial map={texture} toneMapped={false} />
}

export function Stadium({ videoUrl, audioActive = false, videoChangeKey = 0, ...props }) {
  const { nodes } = useGLTF('/models/stadium.glb')
  const bakedTexture = useTexture('/textures/stadium.webp')
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
