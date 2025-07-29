/**
 * Utility functions for checking browser support for different media formats
 * and providing fallback strategies for better compatibility
 */

/**
 * Check if the browser can play a specific audio format
 * @param {string} type - MIME type to check (e.g., 'audio/ogg; codecs="vorbis"', 'audio/mpeg')
 * @returns {boolean} - True if the format is supported
 */
const canPlayAudio = (type) => {
  const audio = document.createElement('audio');
  return !!audio.canPlayType && audio.canPlayType(type) !== '';
};

/**
 * Check if the browser supports a specific image format
 * @param {string} format - Image format to check ('webp', 'avif')
 * @returns {Promise<boolean>} - Promise that resolves to true if supported
 */
const canDisplayImage = (format) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    
    // Test images (1x1 pixel) for each format
    const testImages = {
      webp: 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
      avif: 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A='
    };
    
    img.src = testImages[format];
  });
};

/**
 * Get the best supported audio format with fallback
 * @param {string} basePath - Base path without extension (e.g., '/sounds/factory')
 * @returns {string} - Full path with the best supported extension
 */
export const getBestAudioFormat = (basePath) => {
  // Try OGG first (better compression, quality)
  if (canPlayAudio('audio/ogg; codecs="vorbis"')) {
    return `${basePath}.ogg`;
  }
  // Fallback to MP3 for Safari and older browsers
  else if (canPlayAudio('audio/mpeg')) {
    return `${basePath}.mp3`;
  }
  // If neither is supported, default to MP3 (most widely supported)
  else {
    console.warn('No optimal audio format detected, defaulting to MP3');
    return `${basePath}.mp3`;
  }
};

/**
 * Get the best supported image format with fallback
 * @param {string} basePath - Base path without extension (e.g., '/images/photo')
 * @returns {Promise<string>} - Promise that resolves to full path with best supported extension
 */
export const getBestImageFormat = async (basePath) => {
  // Try AVIF first (best compression)
  if (await canDisplayImage('avif')) {
    return `${basePath}.avif`;
  }
  // Fallback to WebP (good compression, wide support)
  else if (await canDisplayImage('webp')) {
    return `${basePath}.webp`;
  }
  // Final fallback to JPEG/PNG (assume jpg if no specific extension needed)
  else {
    console.warn('No modern image format detected, defaulting to WebP');
    return `${basePath}.webp`;
  }
};

/**
 * Get multiple audio URLs for fallback loading strategy
 * @param {string} basePath - Base path without extension
 * @returns {string[]} - Array of URLs ordered by preference (OGG first, MP3 fallback)
 */
export const getAudioFallbackUrls = (basePath) => {
  const formats = [];
  
  // Add OGG first if supported (better quality/compression)
  if (canPlayAudio('audio/ogg; codecs="vorbis"')) {
    formats.push(`${basePath}.ogg`);
  }
  
  // Always add MP3 as fallback for Safari compatibility
  if (canPlayAudio('audio/mpeg')) {
    formats.push(`${basePath}.mp3`);
  }
  
  // If no formats detected, still provide both for graceful degradation
  if (formats.length === 0) {
    console.warn('No audio format support detected, providing both formats');
    return [`${basePath}.ogg`, `${basePath}.mp3`];
  }
  
  return formats;
};

/**
 * Try loading audio with fallback strategy (for Three.js AudioLoader)
 * @param {THREE.AudioLoader} loader - Three.js AudioLoader instance
 * @param {string} basePath - Base path without extension
 * @param {function} onLoad - Success callback
 * @param {function} onError - Error callback (optional)
 */
export const loadAudioWithFallback = (loader, basePath, onLoad, onError) => {
  const urls = getAudioFallbackUrls(basePath);
  
  const tryNext = (index) => {
    if (index >= urls.length) {
      if (onError) onError(new Error('No compatible audio format could be loaded'));
      return;
    }

    loader.load(
      urls[index],
      onLoad,
      undefined,
      (err) => {
        console.warn(`Failed to load ${urls[index]}, trying next format...`);
        tryNext(index + 1);
      }
    );
  };

  tryNext(0);
};

/**
 * Browser compatibility info for debugging
 */
export const getFormatSupport = () => {
  return {
    audio: {
      ogg: canPlayAudio('audio/ogg; codecs="vorbis"'),
      mp3: canPlayAudio('audio/mpeg'),
      wav: canPlayAudio('audio/wav'),
      aac: canPlayAudio('audio/aac')
    },
    // Note: Image support check is async, so this is just for reference
    imageFormatsToCheck: ['webp', 'avif']
  };
}; 