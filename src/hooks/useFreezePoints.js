/**
 * Freeze Points Hook – how it works and how to tune
 *
 * Purpose
 * - Eliminates scroll overshoot by snapping to predefined freeze points
 *   and briefly holding the scroll position before releasing again.
 *
 * Behavior
 * - Detect proximity to a freeze point using a small tolerance (epsilon).
 * - Instantly snap the scroll container to the point (no smooth glide).
 * - Enforce a hard hold window where input is suppressed (wheel, touch, pointer, key).
 * - After the hold window elapses, user input releases the lock as normal.
 * - Hysteresis prevents immediately re-triggering the same freeze point until
 *   the user moves outside a small band around it.
 *
 * Key tuning knobs
 * - holdMs: duration of the hard lock (in milliseconds). Longer = less chance
 *   users blast through at high speed; shorter = snappier feel.
 *   Typical range: 300–1500 (defaults to 1000 in this project).
 *
 * - epsilon: how close the scroll offset must be to trigger a freeze.
 *   Smaller = harder to trigger (requires more precision), larger = triggers more easily.
 *   Typical range: 0.002–0.006 (offset units 0..1; ≈3–9vh when total = 1500vh).
 *
 * - hysteresis: re-arm band around the freeze point. Prevents instant re-trigger
 *   until the user moves beyond this band. Increase if you notice rapid re-freezing
 *   right after release.
 *   Typical range: 0.006–0.02.
 *
 * Freeze points
 * - Provide an array of { id, offset } where offset is normalized (0..1).
 * - If you derive points from vh values, use: offset = vh / 1500 (when pages = 15).
 *
 * Notes
 * - The hook pins the internal ScrollControls container (scroll.el) to keep
 *   camera and HTML perfectly in sync.
 * - The hold window suppresses input; after the timer, any user interaction
 *   releases the lock, and hysteresis avoids immediate re-trigger.
 */
import { useEffect, useMemo, useRef, useState } from 'react'
import { useScroll } from '@react-three/drei'
import soundManager from '../utils/soundManager'

/**
 * Detects proximity to freeze points, snaps the scroll position, briefly holds it,
 * and plays a sound when the snap occurs. Releases on strong wheel input.
 */
export function useFreezePoints({
  points,
  epsilon = 0.004,
  enabled = true,
  holdMs = 1000,
  soundUrl = '/sounds/scroll-stop.mp3',
  volume = 0.1,
  hysteresis = 0.01,
}) {
  const scroll = useScroll()
  const containerRef = useRef(null)
  const [frozenIndex, setFrozenIndex] = useState(-1)
  const releaseTimerRef = useRef(null)
  const lastFrozenIndexRef = useRef(-1)
  const rearmLowRef = useRef(0)
  const rearmHighRef = useRef(0)
  const holdActiveRef = useRef(false)

  useEffect(() => {
    const oggFirst = soundUrl.endsWith('.mp3')
      ? soundUrl.replace('.mp3', '.ogg')
      : soundUrl
    const srcs = [oggFirst, soundUrl]
    soundManager.preload('freezeStop', { src: srcs, volume })
    soundManager.volume('freezeStop', volume)
    return () => {
      soundManager.unload('freezeStop')
    }
  }, [soundUrl, volume])

  useEffect(() => {
    containerRef.current = scroll.el
  }, [scroll.el])

  // Snap when close to a freeze point
  useEffect(() => {
    if (!enabled) return
    const el = containerRef.current
    if (!el) return
    if (frozenIndex !== -1) return

    // Do not re-arm the same point until we leave its hysteresis band
    const isRearmed =
      lastFrozenIndexRef.current === -1 ||
      scroll.offset < rearmLowRef.current ||
      scroll.offset > rearmHighRef.current

    if (!isRearmed) return

    const idx = points.findIndex((p) => Math.abs(scroll.offset - p.offset) < epsilon)
    if (idx !== -1) {
        // Fixes the issue where the scroll position is not exactly at the freeze point
      const scrollRange = Math.max(1, el.scrollHeight - el.clientHeight)
      const targetTop = points[idx].offset * scrollRange
      // Snap
      el.scrollTop = targetTop
      // Play sound
      try {
        soundManager.play('freezeStop')
      } catch (_) {
        // ignore play errors
      }
      // Dispatch a window event for UI feedback (used in src/components/KineticTitle.jsx)
      try {
        window.dispatchEvent(
          new CustomEvent('freeze-lock', {
            detail: { index: idx, point: points[idx] },
          })
        )
      } catch (_) {
        // ignore
      }
      setFrozenIndex(idx)
      holdActiveRef.current = true
      lastFrozenIndexRef.current = idx
      const center = points[idx].offset
      const band = Math.max(hysteresis, epsilon * 3)
      rearmLowRef.current = Math.max(0, center - band)
      rearmHighRef.current = Math.min(1, center + band)
      clearTimeout(releaseTimerRef.current)
      releaseTimerRef.current = setTimeout(() => {
        holdActiveRef.current = false
        setFrozenIndex(-1)
      }, holdMs)
    }
  }, [enabled, points, scroll.offset, epsilon, holdMs, frozenIndex, hysteresis])

  // While frozen, pin to target and release on strong wheel intent
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    if (frozenIndex === -1) return

    const scrollRange = Math.max(1, el.scrollHeight - el.clientHeight)
    const targetTop = points[frozenIndex].offset * scrollRange

    const onScroll = () => {
      if (Math.abs(el.scrollTop - targetTop) > 1) {
        el.scrollTop = targetTop
      }
    }
    const release = () => {
      if (!holdActiveRef.current) setFrozenIndex(-1)
    }
    const onWheel = (e) => {
      if (holdActiveRef.current) {
        e.preventDefault()
        return
      }
      release()
    }
    const onPointerDown = (e) => {
      if (holdActiveRef.current) {
        e.preventDefault()
        return
      }
      release()
    }
    const onKeyDown = (e) => {
      if (holdActiveRef.current) {
        e.preventDefault()
        return
      }
      release()
    }
    const onTouchStart = (e) => {
      if (holdActiveRef.current) {
        e.preventDefault()
        return
      }
      release()
    }
    const onTouchMove = (e) => {
      if (holdActiveRef.current) {
        e.preventDefault()
        return
      }
      release()
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('pointerdown', onPointerDown, { passive: true })
    // Keyboard events are attached to window to ensure capture regardless of focus
    window.addEventListener('keydown', onKeyDown)
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: true })

    // Ensure exact pin at the start of freeze
    el.scrollTop = targetTop

    return () => {
      el.removeEventListener('scroll', onScroll)
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKeyDown)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
    }
  }, [frozenIndex, points])

  // Rearm logic: once user leaves the hysteresis band around the last frozen point,
  // allow snapping again
  useEffect(() => {
    if (lastFrozenIndexRef.current === -1) return
    const off = scroll.offset
    if (off < rearmLowRef.current || off > rearmHighRef.current) {
      lastFrozenIndexRef.current = -1
    }
  }, [scroll.offset])

  return useMemo(() => ({ frozen: frozenIndex !== -1, index: frozenIndex }), [frozenIndex])
}


