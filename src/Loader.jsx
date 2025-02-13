import React from 'react'
import { Html, useProgress } from '@react-three/drei'

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', height: '10px', background: '#ccc' }}>
        <div style={{ width: `${progress}%`, height: '100%', background: '#4caf50' }} />
      </div>
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <img src="/images/city-loading.gif" alt="Loading..." style={{ width: '300px', height: 'auto' }} />
        <p style={{ textAlign: 'center' }}>{progress.toFixed(2)}% loaded</p>
      </div>
    </Html>
  )
}

export default Loader