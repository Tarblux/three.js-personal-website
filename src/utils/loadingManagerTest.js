/**
 * Test script for PriorityLoadingManager
 * Run this in development to validate the loading system
 */

import { priorityLoadingManager } from './PriorityLoadingManager.js'

export function testPriorityLoadingManager() {
  console.log(' Testing Priority Loading Manager...')
  const startTime = performance.now()
  let criticalCompleteTime = null
  
  // Subscribe to loading updates
  const unsubscribe = priorityLoadingManager.subscribe((status) => {
    const elapsed = ((performance.now() - startTime) / 1000).toFixed(2)
    
    console.log(` [${elapsed}s] Loading Status Update:`, {
      phase: status.phase,
      criticalReady: status.criticalReady,
      canStartExperience: status.canStartExperience,
      overallProgress: `${Math.round(status.overallProgress)}%`,
      phases: Object.entries(status.phases).map(([name, phase]) => ({
        name,
        progress: `${phase.loaded}/${phase.total}`,
        completed: phase.completed,
        percentage: phase.total > 0 ? `${Math.round((phase.loaded / phase.total) * 100)}%` : '0%'
      }))
    })
    
    if (status.criticalReady && !criticalCompleteTime) {
      criticalCompleteTime = performance.now()
      const criticalTime = ((criticalCompleteTime - startTime) / 1000).toFixed(2)
      console.log(` [${criticalTime}s] Critical assets ready! User can start interacting.`)
    }
  })
  
  // Simulate loading some assets
  console.log('Starting simulated asset loading...')
  
  setTimeout(() => {
    // Simulate critical asset loading
    priorityLoadingManager.registerAssetLoaded('/models/train.glb', 'critical')
    priorityLoadingManager.registerAssetLoaded('/textures/train.ktx2', 'critical')
    priorityLoadingManager.registerAssetLoaded('/videos/city-loading2.mp4', 'critical')
  }, 1000)
  
  setTimeout(() => {
    // Simulate more critical assets
    priorityLoadingManager.registerAssetLoaded('/models/landscape.glb', 'critical')
    priorityLoadingManager.registerAssetLoaded('/textures/landscape.webp', 'critical')
  }, 2000)
  
  setTimeout(() => {
    // Simulate high priority assets
    priorityLoadingManager.registerAssetLoaded('/sounds/factory.ogg', 'high')
    priorityLoadingManager.registerAssetLoaded('/sounds/trading-office.ogg', 'high')
  }, 3000)
  
  // Clean up after 10 seconds
  setTimeout(() => {
    const totalTime = ((performance.now() - startTime) / 1000).toFixed(2)
    const criticalDuration = criticalCompleteTime ? ((criticalCompleteTime - startTime) / 1000).toFixed(2) : 'N/A'
    
    unsubscribe()
    console.log(`Test completed in ${totalTime}s`)
    console.log(`Critical assets took: ${criticalDuration}s`)
    console.log(`Performance Summary:`, {
      totalDuration: `${totalTime}s`,
      criticalDuration: `${criticalDuration}s`,
      backgroundDuration: criticalCompleteTime ? `${(totalTime - criticalDuration).toFixed(2)}s` : 'N/A'
    })
  }, 10000)
}

// Export for use in development console
if (typeof window !== 'undefined') {
  window.testPriorityLoadingManager = testPriorityLoadingManager
}
