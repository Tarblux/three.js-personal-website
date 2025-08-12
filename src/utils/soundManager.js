/**
 * soundManager – centralized audio utility powered by Howler.
 *
 * Global audio state overview
 * ---------------------------------
 * This module owns a global audio state shared across:
 * - 2D UI sounds managed by Howler (Howl instances)
 * - 3D scene sounds (e.g., Three.js PositionalAudio) that subscribe to changes
 *
 * Exposed global state API:
 * - setGlobalVolume(0..1): sets the master volume (applies to Howler and notifies 3D subscribers)
 * - setMuted(boolean): globally mutes/unmutes (applies to Howler and notifies 3D subscribers)
 * - getState(): returns { volume, muted }
 * - subscribe(listener): receive updates when the global state changes; returns unsubscribe()
 *
 * Effective volume in 3D:
 * - 3D sounds should combine local controls with global state as:
 *     effectiveVolume = muted ? 0 : (globalVolume * localVolume)
 * - Apply a short gain ramp (e.g., ~50ms) to avoid pops when updating volume
 *
 * Data flow
 * ---------
 *
 *   [UI Volume/Mute (React)]
 *            |
 *            | setGlobalVolume(0..1) / setMuted(bool)
 *            v
 *   +------------------------------+
 *   | soundManager (global state)  |
 *   |  - volume, muted             |
 *   |  - notifies subscribers      |
 *   +---------------+--------------+
 *                   |                         (Howler global)
 *                   | notify subscribers      Howler.volume()/mute()
 *                   v                                 |
 *        [3D PositionalAudio]                         |
 *        subscribes and applies                        v
 *        effective volume with ramp           [All 2D UI Howl instances]
 *                                            auto-affected by Howler
 *
 * Other capabilities
 * ------------------
 * - Caches sounds by string keys so repeated plays reuse one Howl instance
 * - Supports ensure/preload, play (with optional sprite id), stop, pause, per-sound volume
 * - Accepts a single src string, array of srcs, or full Howl options object
 * - Exposes Howler for low-level access when needed
 */
import { Howl, Howler } from 'howler';

const registry = new Map();
const mediaRegistry = new Map();

const toSources = (srcOrArray) => (Array.isArray(srcOrArray) ? srcOrArray : [srcOrArray]);

// Global UI audio state shared across Howler sounds and Three.js positional audio
let globalVolume = 1; // 0..1
let globalMuted = false;
const subscribers = new Set();

const clamp01 = (n) => Math.min(1, Math.max(0, n));

const notifySubscribers = () => {
  const state = { volume: globalVolume, muted: globalMuted };
  subscribers.forEach((fn) => {
    try { fn(state); } catch {}
  });
};

const soundManager = {
  Howler,

  ensure(key, srcOrOptions) {
    if (registry.has(key)) return registry.get(key);

    let howl;
    if (typeof srcOrOptions === 'string' || Array.isArray(srcOrOptions)) {
      howl = new Howl({ src: toSources(srcOrOptions), preload: true });
    } else {
      howl = new Howl({ preload: true, ...srcOrOptions });
    }
    registry.set(key, howl);
    return howl;
  },

  preload(key, srcOrOptions) {
    return this.ensure(key, srcOrOptions);
  },

  play(key, srcOrOptions, spriteOrId) {
    const howl = this.ensure(key, srcOrOptions);
    return spriteOrId ? howl.play(spriteOrId) : howl.play();
  },

  stop(key) {
    const h = registry.get(key);
    if (h) h.stop();
  },

  pause(key) {
    const h = registry.get(key);
    if (h) h.pause();
  },

  volume(key, value) {
    const h = registry.get(key);
    if (h && typeof value === 'number') h.volume(value);
    return h ? h.volume() : undefined;
  },

  // Global state API
  setGlobalVolume(value) {
    globalVolume = clamp01(value);
    Howler.volume(globalVolume);
    notifySubscribers();
    return globalVolume;
  },

  setMuted(muted) {
    globalMuted = !!muted;
    Howler.mute(globalMuted);
    notifySubscribers();
    return globalMuted;
  },

  getState() {
    return { volume: globalVolume, muted: globalMuted };
  },

  subscribe(listener) {
    if (typeof listener !== 'function') return () => {};
    subscribers.add(listener);
    // Call immediately with current state
    try { listener(this.getState()); } catch {}
    return () => subscribers.delete(listener);
  },

  muteAll(muted) {
    Howler.mute(!!muted);
  },

  unload(key) {
    const h = registry.get(key);
    if (h) {
      h.unload();
      registry.delete(key);
    }
  },

  unloadAll() {
    registry.forEach((h) => h.unload());
    registry.clear();
  },

  // VIDEO/HTMLMediaElement integration
  attachMediaElement(key, mediaElement, options = {}) {
    if (!mediaElement) return () => {};
    
    // First, detach any existing element with this key to prevent overlaps
    this.detachMediaElement(key);
    
    const config = {
      localVolume: typeof options.localVolume === 'number' ? options.localVolume : 1,
      active: options.active ?? true,
    };

    const apply = () => {
      const effectiveVolume = globalMuted || !config.active ? 0 : (globalVolume * config.localVolume);
      try {
        mediaElement.volume = effectiveVolume;
        mediaElement.muted = effectiveVolume === 0;
      } catch {}
    };

    // Initial apply and subscription to global changes
    apply();
    const unsubscribe = this.subscribe(apply);

    mediaRegistry.set(key, { element: mediaElement, config, unsubscribe });

    // Return a detach function
    return () => {
      this.detachMediaElement(key);
    };
  },

  detachMediaElement(key) {
    const rec = mediaRegistry.get(key);
    if (rec) {
      try { 
        // Stop the media element
        rec.element.pause();
        rec.element.currentTime = 0;
        rec.unsubscribe?.(); 
      } catch {}
      mediaRegistry.delete(key);
    }
  },

  setMediaLocalVolume(key, localVolume) {
    const rec = mediaRegistry.get(key);
    if (!rec) return;
    rec.config.localVolume = clamp01(localVolume);
    // Re-apply immediately
    try {
      const effectiveVolume = globalMuted || !rec.config.active ? 0 : (globalVolume * rec.config.localVolume);
      rec.element.volume = effectiveVolume;
      rec.element.muted = effectiveVolume === 0;
    } catch {}
  },

  setMediaActive(key, active) {
    const rec = mediaRegistry.get(key);
    if (!rec) return;
    rec.config.active = !!active;
    // Re-apply immediately
    try {
      const effectiveVolume = globalMuted || !rec.config.active ? 0 : (globalVolume * rec.config.localVolume);
      rec.element.volume = effectiveVolume;
      rec.element.muted = effectiveVolume === 0;
      if (rec.config.active) {
        // Restart from beginning when becoming active
        rec.element.currentTime = 0;
        try { rec.element.play?.(); } catch {}
      } else {
        // Pause when becoming inactive
        try { rec.element.pause?.(); } catch {}
      }
    } catch {}
  },

  // Stop all media elements except the specified key
  stopAllMediaExcept(exceptKey) {
    mediaRegistry.forEach((rec, key) => {
      if (key !== exceptKey) {
        try {
          rec.element.pause();
          rec.element.currentTime = 0;
        } catch {}
      }
    });
  },

  // Restart a specific media element from the beginning
  restartMedia(key) {
    const rec = mediaRegistry.get(key);
    if (rec) {
      try {
        rec.element.currentTime = 0;
        rec.element.play();
      } catch {}
    }
  },
};

export default soundManager;


