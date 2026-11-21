import React, { Suspense } from 'react'
import { usePriorityLoading } from '../../hooks/usePriorityLoading.js'

// TODO: Check if this will cause browser specific specific loading behaviours
// --- Experimental Progressive Loader used for reducing initial load time ---
/**
 * ProgressiveLoader - Renders components progressively based on loading phases
 * @param {Object} components - Object with phase keys and component arrays
 * @param {React.Component} fallback - Fallback component while loading
 */
export function ProgressiveLoader({ components, fallback = null }) {
  const { phases } = usePriorityLoading()
  
  const shouldRenderPhase = (phaseName) => {
    const phase = phases[phaseName]
    return phase && (phase.completed || phase.loaded > 0)
  }
  
  return (
    <>
      {/* Critical components - always render first */}
      {shouldRenderPhase('critical') && (
        <Suspense fallback={fallback}>
          {components.critical?.map((Component, index) => 
            React.createElement(Component, { key: `critical-${index}` })
          )}
        </Suspense>
      )}
      
      {/* High priority components */}
      {shouldRenderPhase('high') && (
        <Suspense fallback={fallback}>
          {components.high?.map((Component, index) => 
            React.createElement(Component, { key: `high-${index}` })
          )}
        </Suspense>
      )}
      
      {/* Medium priority components */}
      {shouldRenderPhase('medium') && (
        <Suspense fallback={fallback}>
          {components.medium?.map((Component, index) => 
            React.createElement(Component, { key: `medium-${index}` })
          )}
        </Suspense>
      )}
      
      {/* Low priority components */}
      {shouldRenderPhase('low') && (
        <Suspense fallback={fallback}>
          {components.low?.map((Component, index) => 
            React.createElement(Component, { key: `low-${index}` })
          )}
        </Suspense>
      )}
    </>
  )
}

export default ProgressiveLoader
