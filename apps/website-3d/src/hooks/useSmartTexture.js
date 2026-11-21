import { useTexture, useKTX2 } from '@react-three/drei';
import { textureManager } from '../utils/textureManager.js';

/**
 * Smart texture loading hook that uses the appropriate loader based on file format
 * @param {string} baseName - base name of the texture
 * @param {Object} options - optional texture path overrides
 * @returns {Texture} loaded texture
 */
export function useSmartTexture(baseName, options = null) {
  // Get the texture path from TextureManager
  const texturePath = options 
    ? textureManager.getTexture(baseName, options)
    : textureManager.getTextureAuto(baseName);

  // Determine which hook to use based on file extension
  const isKTX2 = texturePath.endsWith('.ktx2');
  
  // Use the appropriate hook
  const texture = isKTX2 
    ? useKTX2(texturePath)
    : useTexture(texturePath);

  return texture;
}

/**
 * Alternative hook that returns both the texture and the loader type used
 * Useful for debugging
 */
export function useSmartTextureWithInfo(baseName, options = null) {
  const texturePath = options 
    ? textureManager.getTexture(baseName, options)
    : textureManager.getTextureAuto(baseName);

  const isKTX2 = texturePath.endsWith('.ktx2');
  const loaderType = isKTX2 ? 'KTX2' : 'Standard';
  
  const texture = isKTX2 
    ? useKTX2(texturePath)
    : useTexture(texturePath);

  // Log for debugging
  console.log(`[useSmartTexture] ${baseName}: ${texturePath} (${loaderType})`);

  return {
    texture,
    texturePath,
    loaderType,
    isKTX2
  };
}
