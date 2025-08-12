import React, { useEffect } from 'react'
import { priorityLoadingManager } from '../../utils/PriorityLoadingManager.js'

/**
 * Higher-order component that tracks when assets are loaded by a component
 * @param {React.Component} WrappedComponent - The component to wrap
 * @param {Array} assetPaths - Array of asset paths this component loads
 * @param {string} defaultPhase - Default phase if asset not in manifest
 */
export function withAssetTracking(WrappedComponent, assetPaths, defaultPhase = 'critical') {
  return function TrackedComponent(props) {
    useEffect(() => {
      // Register all assets as loaded when component mounts
      assetPaths.forEach(assetPath => {
        const phase = priorityLoadingManager.getAssetPhase(assetPath) || defaultPhase
        priorityLoadingManager.registerAssetLoaded(assetPath, phase)
      })
    }, [])
    
    return React.createElement(WrappedComponent, props)
  }
}

export default withAssetTracking
