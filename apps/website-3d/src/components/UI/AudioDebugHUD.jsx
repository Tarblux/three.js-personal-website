import React from 'react'

export function AudioDebugHUD({ 
  distance, 
  volume, 
  refDistance, 
  maxDistance, 
  rolloffFactor,
  position,
  show = false 
}) {
  if (!show) return null

  // Calculate effective volume based on distance
  const effectiveVolume = distance <= refDistance 
    ? volume 
    : volume * (refDistance / (refDistance + rolloffFactor * (distance - refDistance)))

  const isAudible = distance <= maxDistance

  return (
    <div style={{
      position: 'fixed',
      bottom: '1px',
      right: '10px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '15px',
      borderRadius: '8px',
      fontFamily: 'monospace',
      fontSize: '12px',
      zIndex: 1000,
      minWidth: '250px',
    }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#00ff00' }}>Factory Audio Debug</h3>
      
      <div style={{ marginBottom: '8px' }}>
        <strong>Distance:</strong> <span style={{ color: '#ffff00' }}>{distance.toFixed(2)} units</span>
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <strong>Effective Volume:</strong> 
        <span style={{ 
          color: effectiveVolume > 0.5 ? '#00ff00' : effectiveVolume > 0.1 ? '#ffff00' : '#ff4444' 
        }}>
          {` ${(effectiveVolume * 100).toFixed(1)}%`}
        </span>
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <strong>Status:</strong> 
        <span style={{ color: isAudible ? '#00ff00' : '#ff4444' }}>
          {isAudible ? ' AUDIBLE' : ' SILENT'}
        </span>
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <strong>Position:</strong> 
        <span style={{ color: '#cccccc' }}>
          {` (${position[0].toFixed(1)}, ${position[1].toFixed(1)}, ${position[2].toFixed(1)})`}
        </span>
      </div>
      
      <hr style={{ margin: '10px 0', border: 'none', borderTop: '1px solid #444' }} />
      
      <div style={{ fontSize: '10px', color: '#aaaaaa' }}>
        <div>Ref Distance: {refDistance} units</div>
        <div>Max Distance: {maxDistance} units</div>
        <div>Rolloff Factor: {rolloffFactor}</div>
      </div>
    </div>
  )
} 