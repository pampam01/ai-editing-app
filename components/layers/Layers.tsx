import React from 'react'
import { Card, CardTitle, CardContent, CardDescription } from '../ui/card'
import { useLayerStore } from '@/lib/layer-store'

const Layers = () => {
    const layers = useLayerStore((state) => state.layers)
    const activeLayer = useLayerStore((state) => state.activeLayer)
  return (
    <Card>Layers</Card>
  )
}

export default Layers