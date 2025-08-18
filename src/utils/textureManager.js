import { 
  isMobile, 
  getDeviceMemory, 
  getHardwareConcurrency, 
  getGPUTier
} from './deviceDetection.js';

// Quality levels enum
export const TextureQuality = {
  HIGH: 'high',     // 4K .ktx2 (was .webp 4K)
  MEDIUM: 'medium', // 4K .ktx2 
  LOW: 'low'        // 2K .ktx2 (all mobile devices, safe on iPhones etc)
};

class TextureManager {
  constructor() {
    this.performanceMode = false; // Can be toggled for dynamic downgrading
    this.quality = null; // Will be set async
    
    // Initialize quality detection asynchronously
    this.initQuality();
  }

  /**
   * Initialize quality detection asynchronously
   */
  async initQuality() {
    this.quality = await this.detectQuality();
    console.log(`[TextureManager] Detected quality: ${this.quality}`);
    this.logDeviceInfo();
  }

  /**
   * Detect the optimal texture quality based on device capabilities
   * @returns {Promise<string>} TextureQuality enum value
   */
  async detectQuality() {
    // Always use LOW quality for mobile devices (weirdly , iphone GPUs on old phones come as GPU Tier 3 , but they are not high end lol)
    if (isMobile()) {
      console.log('[TextureManager] Mobile device detected');
      return TextureQuality.LOW;
    }

    // Get device specs
    const memory = getDeviceMemory();
    const cores = getHardwareConcurrency();
    const gpuTier = await getGPUTier();
    const hasGoodGPU = gpuTier.tier >= 2;

    console.log(`[TextureManager] Device specs - Memory: ${memory}GB, Cores: ${cores}, GPU Tier: ${gpuTier.tier}, High-end GPU: ${hasGoodGPU}`);

    // High-end desktop (GPU tier 3+ or very good specs)
    if ((memory >= 8 && cores >= 8 && hasGoodGPU) || gpuTier.tier >= 3) {
      return TextureQuality.HIGH;
    }

    // High-core count systems
    if (memory >= 8 && cores >= 16) {
      return TextureQuality.HIGH;
    }

    // Medium-range desktop (GPU tier 2+ with decent specs)
    if ((memory >= 6 && cores >= 4) || gpuTier.tier >= 2) {
      return TextureQuality.MEDIUM;
    }

    // Low-end desktop or laptop
    return TextureQuality.LOW;
  }

  /**
   * Get the appropriate texture path based on quality settings
   * @param {string} baseName - base name of the texture
   * @param {Object} options - texture path options
   * @param {string} options.webp - path to WebP texture (legacy - kept for future use)
   * @param {string} options.ktx4k - path to 4K KTX2 texture
   * @param {string} options.ktx2k - path to 2K KTX2 texture
   * @returns {string} texture path
   */
  getTexture(baseName, options = {}) {
    const { webp, ktx4k, ktx2k } = options;
    
    // Filter out null/undefined options
    const availableOptions = [ktx4k, ktx2k, webp].filter(Boolean);
    
    if (availableOptions.length === 0) {
      console.warn(`[TextureManager] No texture options available for: ${baseName}`);
      return `/textures/${baseName}2k.ktx2`; // Fallback
    }
    
    // If in performance mode, always use lowest quality available
    if (this.performanceMode) {
      return ktx2k || ktx4k || webp || availableOptions[0];
    }

    // If quality hasn't been detected yet, use fallback (medium quality)
    const currentQuality = this.quality || TextureQuality.MEDIUM;

    // Use ktx2 textures for optimal performance and compression
    switch (currentQuality) {
      case TextureQuality.HIGH:
        return ktx4k || ktx2k || availableOptions[0];
        // Legacy WebP support (commented out but preserved):
        // return webp || ktx4k || ktx2k || availableOptions[0];
      case TextureQuality.MEDIUM:
        return ktx4k || ktx2k || availableOptions[0];
        // Legacy WebP support (commented out but preserved):
        // return ktx4k || ktx2k || webp || availableOptions[0];
      case TextureQuality.LOW:
      default:
        return ktx2k || ktx4k || availableOptions[0];
        // Legacy WebP support (commented out but preserved):
        // return ktx2k || ktx4k || webp || availableOptions[0];
    }
  }

  /**
   * Get texture path using standard naming convention
   * Assumes your textures follow the pattern:
   * - baseName4k.ktx2 (for HIGH/MEDIUM quality)
   * - baseName2k.ktx2 (for LOW quality)
   * - baseName.webp (legacy - preserved for future use)
   * @param {string} baseName - base name without extension
   * @returns {string} texture path
   */
  getTextureAuto(baseName) {
    // Handle special cases with different file extensions
    const specialCases = {
      'language-institute': {
        webp: `/textures/language-institute.jpg`, // Legacy
        ktx4k: `/textures/language-institute4k.ktx2`,
        ktx2k: `/textures/language-institute2k.ktx2`
      },
      'train-wheel': {
        webp: `/textures/train-wheel.jpg`, // Legacy
        ktx4k: `/textures/train-wheel4k.ktx2`,
        ktx2k: `/textures/train-wheel2k.ktx2`
      }
    };

    if (specialCases[baseName]) {
      return this.getTexture(baseName, specialCases[baseName]);
    }

    // Handle missing train.webp - fallback directly to 2k
    if (baseName === 'train') {
      return this.getTexture(baseName, {
        webp: null, // No webp version available
        ktx4k: null, // No 4k version available  
        ktx2k: `/textures/${baseName}2k.ktx2`
      });
    }

    return this.getTexture(baseName, {
      webp: `/textures/${baseName}.webp`, // Legacy - preserved for future use
      ktx4k: `/textures/${baseName}4k.ktx2`,
      ktx2k: `/textures/${baseName}2k.ktx2`
    });
  }

  /**
   * Enable performance mode (forces LOW quality)
   * Useful for dynamic downgrading when FPS drops
   */
  enablePerformanceMode() {
    console.log('[TextureManager] Performance mode enabled');
    this.performanceMode = true;
  }

  /**
   * Disable performance mode (returns to detected quality)
   */
  disablePerformanceMode() {
    console.log('[TextureManager] Performance mode disabled');
    this.performanceMode = false;
  }

  /**
   * Get current quality level
   * @returns {string} current quality level
   */
  getCurrentQuality() {
    return this.performanceMode ? TextureQuality.LOW : this.quality;
  }

  /**
   * Force a specific quality level (for testing/debugging)
   * @param {string} quality - TextureQuality enum value
   */
  setQuality(quality) {
    if (Object.values(TextureQuality).includes(quality)) {
      this.quality = quality;
      console.log(`[TextureManager] Quality manually set to: ${quality}`);
    } else {
      console.warn(`[TextureManager] Invalid quality level: ${quality}`);
    }
  }

  /**
   * Log device information for debugging
   */
  async logDeviceInfo() {
    console.group('[TextureManager] Device Information');
    console.log('Mobile:', isMobile());
    console.log('Memory:', getDeviceMemory() + 'GB');
    console.log('CPU Cores:', getHardwareConcurrency());
    
    try {
      const gpuTier = await getGPUTier();
      console.log('GPU Tier:', gpuTier.tier);
      console.log('GPU Type:', gpuTier.type);
      console.log('GPU Name:', gpuTier.gpu);
      console.log('High-end GPU:', gpuTier.tier >= 2);
    } catch (error) {
      console.log('GPU Detection Error:', error.message);
    }
    
    console.log('Selected Quality:', this.quality);
    console.groupEnd();
  }
}

// Export singleton instance
export const textureManager = new TextureManager();

// Export class for testing
export { TextureManager };

// Import debug utilities in development
if (import.meta.env.DEV) {
  import('./textureManagerDebug.js').then(debug => {
    console.log('[TextureManager] Debug utilities loaded');
  });
}
