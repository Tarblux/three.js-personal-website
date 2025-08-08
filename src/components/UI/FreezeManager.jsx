import { useFreezePoints } from '../../hooks/useFreezePoints.js'

export default function FreezeManager({ points, active }) {
  useFreezePoints({ points, enabled: active })
  return null
}


