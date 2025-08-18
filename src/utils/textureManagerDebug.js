import { textureManager, TextureQuality } from './textureManager.js';

/**
 * Debug utilities for TextureManager
 * Provides tools to test and debug texture loading behavior
 */

/**
 * Test texture path resolution for all quality levels
 * @param {string} baseName - texture base name to test
 */
export const testTextureResolution = (baseName) => {
  console.group(`[TextureDebug] Testing texture resolution for: ${baseName}`);
  
  // Save current quality
  const originalQuality = textureManager.quality;
  
  // Test each quality level
  Object.values(TextureQuality).forEach(quality => {
    textureManager.setQuality(quality);
    const path = textureManager.getTextureAuto(baseName);
    console.log(`${quality.toUpperCase()}: ${path}`);
  });
  
  // Restore original quality
  textureManager.setQuality(originalQuality);
  
  console.groupEnd();
};

/**
 * Test all available textures
 */
export const testAllTextures = () => {
  const textureNames = [
    'booch', 'campus', 'chesspark', 'contact', 'downtown',
    'fences', 'field', 'flags', 'landscape', 'language-institute',
    'projects', 'railtrack', 'stadium', 'streetlights',
    'train', 'train-wheel', 'trees'
  ];
  
  console.log(`[TextureDebug] Current quality: ${textureManager.getCurrentQuality()}`);
  console.log(`[TextureDebug] Performance mode: ${textureManager.performanceMode ? 'ON' : 'OFF'}`);
  
  console.group('[TextureDebug] Testing all textures');
  textureNames.forEach(name => testTextureResolution(name));
  console.groupEnd();
};

/**
 * Display current device information and quality selection
 */
export const displayDeviceInfo = () => {
  textureManager.logDeviceInfo();
};

/**
 * Force quality level for testing
 * @param {string} quality - TextureQuality enum value
 */
export const forceQuality = (quality) => {
  textureManager.setQuality(quality);
  console.log(`[TextureDebug] Forced quality to: ${quality}`);
};

/**
 * Toggle performance mode for testing
 */
export const togglePerformanceMode = () => {
  if (textureManager.performanceMode) {
    textureManager.disablePerformanceMode();
  } else {
    textureManager.enablePerformanceMode();
  }
  console.log(`[TextureDebug] Performance mode: ${textureManager.performanceMode ? 'ON' : 'OFF'}`);
};

/**
 * Check if specific texture files exist
 * @param {string} baseName - texture base name
 * @returns {Promise<Object>} availability of each format
 */
export const checkTextureAvailability = async (baseName) => {
  const formats = {
    webp: `/textures/${baseName}.webp`,
    ktx4k: `/textures/${baseName}4k.ktx2`,
    ktx2k: `/textures/${baseName}2k.ktx2`
  };
  
  const results = {};
  
  for (const [format, path] of Object.entries(formats)) {
    try {
      const response = await fetch(path, { method: 'HEAD' });
      results[format] = response.ok;
    } catch (error) {
      results[format] = false;
    }
  }
  
  console.log(`[TextureDebug] Availability for ${baseName}:`, results);
  return results;
};

/**
 * Global debug object for browser console
 */
if (typeof window !== 'undefined') {
  window.TextureDebug = {
    testTexture: testTextureResolution,
    testAll: testAllTextures,
    deviceInfo: displayDeviceInfo,
    forceQuality,
    togglePerformance: togglePerformanceMode,
    checkAvailability: checkTextureAvailability,
    manager: textureManager
  };
  
  console.log('[TextureDebug] Debug utilities available at window.TextureDebug');
}
