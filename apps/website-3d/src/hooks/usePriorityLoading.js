import { useState, useEffect } from 'react'
import { priorityLoadingManager } from '../utils/PriorityLoadingManager.js'

export function usePriorityLoading() {
  const [status, setStatus] = useState(priorityLoadingManager.getStatus())
  
  useEffect(() => {
    return priorityLoadingManager.subscribe(setStatus)
  }, [])
  
  return status
}

export default usePriorityLoading

