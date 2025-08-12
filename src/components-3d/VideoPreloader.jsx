import { useEffect, useRef } from 'react'
import soundManager from '../utils/soundManager.js'

// Preloads a list of video URLs when `active` becomes true.
// It attaches media elements to the soundManager (muted, inactive) to warm caches without audio.
export default function VideoPreloader({ urls = [], active = false }) {
  const elementsRef = useRef([])

  useEffect(() => {
    if (!active || !urls.length) return
    
    // Create video elements and start loading
    const created = urls.map((src, index) => {
      const el = document.createElement('video')
      el.src = src
      el.preload = 'auto'
      el.muted = true
      el.playsInline = true
      el.loop = true
      try { el.load?.() } catch {}
      
      const key = `preload-${index}`
      const detach = soundManager.attachMediaElement(key, el, { localVolume: 0, active: false })
      return { el, key, detach, src }
    })
    elementsRef.current = created

    return () => {
      // Detach and cleanup when leaving active state or unmounting
      elementsRef.current.forEach(({ detach }) => {
        try { detach?.() } catch {}
      })
      elementsRef.current = []
    }
  }, [active, urls])

  return null
}


