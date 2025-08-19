/**
 * Mobile scroll utilities to handle viewport and scrolling differences on mobile devices
 */

import { isMobile } from './deviceDetection.js'

/**
 * Get the actual viewport height accounting for mobile browser chrome
 * @returns {number} The actual viewport height in pixels
 */
const getActualViewportHeight = () => {
  // Use visualViewport API if available (modern browsers)
  if (window.visualViewport) {
    return window.visualViewport.height
  }
  
  // Fallback to window.innerHeight
  return window.innerHeight
}

/**
 * Calculate mobile-adjusted scroll multiplier
 * Mobile devices often have different scroll behaviors and viewport issues
 * @returns {number} Scroll multiplier for mobile devices
 */
export const getMobileScrollMultiplier = () => {
  if (!isMobile()) return 1
  
  const actualVH = getActualViewportHeight()
  const standardVH = window.innerHeight
  
  // Adjust for mobile viewport differences
  const ratio = actualVH / standardVH
  
  // Apply a mobile-specific scaling factor
  // This helps account for mobile scrolling physics and browser chrome
  return ratio * 0.95 // Slightly reduce to account for mobile scrolling differences
}

/**
 * Get mobile-specific top position accounting for safe areas and viewport
 * @param {string} position - Position string like "100vh"
 * @returns {string} Adjusted position for mobile
 */
export const getMobileAdjustedPosition = (position) => {
  if (!isMobile()) return position
  
  const vh = parseInt(position)
  const multiplier = getMobileScrollMultiplier()
  const adjustedVh = vh * multiplier
  
  return `${adjustedVh}vh`
}

/**
 * Mobile-optimized fade calculation
 * Mobile devices may need different fade timing due to scrolling characteristics
 * @param {number} fadeValue - Original fade value
 * @returns {number} Mobile-adjusted fade value
 */
export const getMobileAdjustedFade = (fadeValue) => {
  if (!isMobile()) return fadeValue
  
  const multiplier = getMobileScrollMultiplier()
  return fadeValue * multiplier
}

/**
 * Check if device has mobile viewport issues (like dynamic viewport on iOS Safari)
 * @returns {boolean} True if device has known viewport issues
 */
const hasMobileViewportIssues = () => {
  if (!isMobile()) return false
  
  // Check for iOS Safari which has dynamic viewport behavior
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
  
  return isIOS || isSafari
}
