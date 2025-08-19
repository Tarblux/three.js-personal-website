/**
 * Device detection utilities based on capability
 */

import { getGPUTier as detectGPU } from 'detect-gpu';

/**
 * Detects mobile devices based on hover capability
 * More reliable than user agent sniffing
 * @returns {boolean} true if device is mobile
 */
export const isMobile = () => {
  return window.matchMedia("(any-hover: none)").matches;
};

/**
 * Detects touch support
 * @returns {boolean} true if device supports touch
 */
export const isTouchScreen = () => {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};

/**
 * Get device memory in GB (if available)
 * @returns {number} device memory in GB, defaults to 4
 */
export const getDeviceMemory = () => {
  return navigator.deviceMemory || 4;
};

/**
 * Get hardware concurrency (CPU cores)
 * @returns {number} number of logical processors, defaults to 4
 */
export const getHardwareConcurrency = () => {
  return navigator.hardwareConcurrency || 4;
};

/**
 * Get GPU tier using detect-gpu library
 * @returns {Promise<Object>} GPU tier information
 */
export const getGPUTier = async () => {
  try {
    const gpuTier = await detectGPU();
    console.log(`[DeviceDetection] GPU Tier: ${gpuTier.tier}, Type: ${gpuTier.type}, GPU: ${gpuTier.gpu}`);
    return gpuTier;
  } catch (error) {
    console.warn('[DeviceDetection] Failed to detect GPU tier:', error);
    return { tier: 1, isMobile: false }; // Fallback to conservative tier
  }
};

/**
 * Detect if device has high-end GPU based on detect-gpu tier
 * @returns {Promise<boolean>} true if GPU tier is 2 or higher
 */
export const hasHighEndGPU = async () => {
  const gpuInfo = await detectGPU();
  return gpuInfo.tier >= 2;
};

// Legacy GPU detection (kept for reference) , it was not working as expected and was not reliable
// export const hasHighEndGPU = () => {
//   const canvas = document.createElement('canvas');
//   const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
//   
//   if (!gl) return false;
//   
//   const renderer = gl.getParameter(gl.RENDERER);
//   const vendor = gl.getParameter(gl.VENDOR);
//   
//   // Check for dedicated GPU indicators
//   const highEndIndicators = [
//     'nvidia', 'geforce', 'gtx', 'rtx', 'quadro', 'tesla',
//     'amd', 'radeon', 'rx ', 'vega', 'fury',
//     'intel arc', 'xe graphics'
//   ];
//   
//   // Check for integrated/low-end GPU indicators
//   const lowEndIndicators = [
//     'intel(r) uhd', 'intel(r) hd', 'intel(r) iris',
//     'mali', 'adreno', 'powervr', 'videocore'
//   ];
//   
//   const rendererLower = renderer.toLowerCase();
//   const vendorLower = vendor.toLowerCase();
//   
//   // If we detect low-end GPU, return false
//   if (lowEndIndicators.some(indicator => 
//     rendererLower.includes(indicator) || vendorLower.includes(indicator)
//   )) {
//     return false;
//   }
//   
//   // Check for high-end GPU
//   const hasHighEndGPU = highEndIndicators.some(indicator => 
//     rendererLower.includes(indicator) || vendorLower.includes(indicator)
//   );
//   
//   console.log(`[DeviceDetection] GPU - Renderer: ${renderer}, Vendor: ${vendor}, High-end: ${hasHighEndGPU}`);
//   
//   return hasHighEndGPU;
// };
