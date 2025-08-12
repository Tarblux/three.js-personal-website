# Priority Loading Manager

A custom loading system that prioritizes critical assets for faster initial user experience.

## Overview

The Priority Loading Manager divides assets into four priority levels:

1. **Critical** - Essential assets needed for initial user interaction
2. **High** - Important assets loaded after critical
3. **Medium** - Secondary features loaded progressively  
4. **Low** - Nice-to-have assets loaded last

## How It Works

### 1. Asset Classification

Assets are automatically classified based on the manifest in `PriorityLoadingManager.js`:

```javascript
critical: {
  videos: ['/videos/city-loading2.mp4'],
  models: ['/models/train.glb', '/models/landscape.glb', ...],
  textures: ['/textures/train.ktx2', '/textures/landscape.webp', ...],
  sounds: ['/sounds/train-sounds.ogg', ...]
}
```

### 2. Progressive Loading

- **Critical assets** load first and enable user interaction when ready
- **High priority** assets start loading in background
- **Medium/Low priority** assets load after higher priorities complete

### 3. Component Rendering

React components are rendered progressively based on asset readiness:

```jsx
// Critical components render when critical assets start loading
{priorityStatus.phases.critical.loaded > 0 && (
  <Introduction />
)}

// High priority components render when critical is complete
{priorityStatus.phases.critical.completed && (
  <ProjectsWarehouse />
)}
```

## Usage

### Basic Hook Usage

```jsx
import { usePriorityLoading } from '../hooks/usePriorityLoading.js'

function MyComponent() {
  const priorityStatus = usePriorityLoading()
  
  return (
    <div>
      <p>Phase: {priorityStatus.phase}</p>
      <p>Critical Ready: {priorityStatus.criticalReady}</p>
      <p>Overall Progress: {priorityStatus.overallProgress}%</p>
    </div>
  )
}
```

### Asset Tracking

The system automatically tracks Three.js assets via the integrated LoadingManager. For manual tracking:

```javascript
import { priorityLoadingManager } from '../utils/PriorityLoadingManager.js'

// Register when an asset loads
priorityLoadingManager.registerAssetLoaded('/models/mymodel.glb', 'critical')
```

### Testing

In development, you can test the loading manager:

```javascript
// In browser console
testPriorityLoadingManager()
```

## Benefits

1. **Faster Perceived Loading** - Users can interact with critical features while other assets load
2. **Better UX** - Progressive enhancement instead of blocking loading screen
3. **Bandwidth Efficient** - Load only what's needed first
4. **Graceful Degradation** - Falls back to standard loading if priority system fails

## Configuration

### Adding New Assets

1. Add asset paths to appropriate priority level in `PriorityLoadingManager.js`
2. Assets are automatically tracked when Three.js loads them
3. For custom assets, call `registerAssetLoaded()` manually

### Adjusting Priorities

Move asset paths between priority levels in the `assetManifest` object:

```javascript
// Move from high to critical priority
critical: {
  models: [..., '/models/important-model.glb']
}
```

### Customizing Loading Phases

Modify the `phases` object to add new priority levels or change thresholds.

## Debugging

- Enable debug info in the loader UI (development mode only)
- Check browser console for loading progress logs
- Use `testPriorityLoadingManager()` to simulate loading

## Integration Points

- **Loader Component** (`src/index.jsx`) - Shows progress and enables interaction
- **Experience Component** (`src/Experience.jsx`) - Renders 3D components progressively  
- **ScrollSections** (`src/ScrollSections.jsx`) - Renders UI components progressively
- **Three.js LoadingManager** - Automatically tracks model/texture loading
