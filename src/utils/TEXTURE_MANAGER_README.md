# Texture Manager

A dynamic texture management system that automatically selects optimal texture quality based on device capabilities.

## Overview

The TextureManager provides a 3-tier quality system:
- **HIGH**: `.webp` 4K textures (desktop w/ plenty of headroom, sharpest)
- **MEDIUM**: 4K `.ktx2` textures (modern desktop/laptop with less GPU memory)
- **LOW**: 2K `.ktx2` textures (all mobile devices, safe on iPhones etc)

## Quick Start

### 1. Basic Usage in Components (Recommended)

```jsx
import { useSmartTexture } from '../hooks/useSmartTexture.js';

export function MyComponent() {
  // Automatic texture selection and appropriate loader usage
  const texture = useSmartTexture('landscape');
  texture.flipY = false;
  
  return (
    <mesh>
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}
```

### 2. Manual Usage (Advanced)

```jsx
import { textureManager } from '../utils/textureManager.js';
import { useTexture, useKTX2 } from '@react-three/drei';

export function MyComponent() {
  const texturePath = textureManager.getTextureAuto('landscape');
  
  // Manually choose loader based on format
  const texture = texturePath.endsWith('.ktx2') 
    ? useKTX2(texturePath)
    : useTexture(texturePath);
  
  return (
    <mesh>
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}
```

### 2. Manual Texture Path Selection

```jsx
const texturePath = textureManager.getTexture('landscape', {
  webp: '/textures/landscape.webp',      // HIGH quality
  ktx4k: '/textures/landscape4k.ktx2',   // MEDIUM quality  
  ktx2k: '/textures/landscape2k.ktx2'    // LOW quality
});
```

## File Naming Convention

The `getTextureAuto()` uses the following naming convention for textures:
- `baseName.webp` - for HIGH quality
- `baseName4k.ktx2` - for MEDIUM quality  
- `baseName2k.ktx2` - for LOW quality

Example: `landscape.webp`, `landscape4k.ktx2`, `landscape2k.ktx2`

## Device Detection Logic

### Mobile Detection
- Uses `(any-hover: none)` media query instead of user agent sniffing
- More reliable and future-proof than regex-based detection

### Quality Selection Algorithm
```
if (mobile device) {
  → LOW quality (2K KTX2)
} else if (memory >= 8GB && cores >= 8 && high-end GPU) {
  → HIGH quality (WebP)
} else if (memory >= 6GB && cores >= 4) {
  → MEDIUM quality (4K KTX2)
} else {
  → LOW quality (2K KTX2)
}
```

## Performance Mode

Dynamic downgrading for performance optimization:

```javascript
// Enable performance mode (forces LOW quality)
textureManager.enablePerformanceMode();

// Disable performance mode (returns to detected quality)
textureManager.disablePerformanceMode();
```

## Debugging

### Browser Console
```javascript
// Test specific texture
TextureDebug.testTexture('landscape');

// Test all textures
TextureDebug.testAll();

// View device information
TextureDebug.deviceInfo();

// Force specific quality for testing
TextureDebug.forceQuality('high');

// Toggle performance mode
TextureDebug.togglePerformance();

// Check texture file availability
await TextureDebug.checkAvailability('landscape');
```

### Manual Quality Override
```javascript
import { textureManager, TextureQuality } from '../utils/textureManager.js';

// Force high quality for testing
textureManager.setQuality(TextureQuality.HIGH);
```

## Migration from useKTX2

**Before:**
```jsx
import { useKTX2 } from '@react-three/drei';

const bakedTexture = useKTX2('/textures/landscape2k.ktx2');
```

**After (Recommended):**
```jsx
import { useSmartTexture } from '../hooks/useSmartTexture.js';

const bakedTexture = useSmartTexture('landscape');
```

**After (Manual):**
```jsx
import { useTexture, useKTX2 } from '@react-three/drei';
import { textureManager } from '../utils/textureManager.js';

const texturePath = textureManager.getTextureAuto('landscape');
const bakedTexture = texturePath.endsWith('.ktx2') 
  ? useKTX2(texturePath)
  : useTexture(texturePath);
```

## API Reference

### TextureManager Methods

- `getTextureAuto(baseName)` - Auto texture selection with naming convention
- `getTexture(baseName, options)` - Manual texture path selection
- `enablePerformanceMode()` - Force low quality
- `disablePerformanceMode()` - Return to detected quality
- `setQuality(quality)` - Override quality level
- `getCurrentQuality()` - Get current effective quality
- `logDeviceInfo()` - Display device detection results

### TextureQuality Enum

- `TextureQuality.HIGH` - WebP format
- `TextureQuality.MEDIUM` - 4K KTX2 format
- `TextureQuality.LOW` - 2K KTX2 format
