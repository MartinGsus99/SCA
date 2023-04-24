import React, { Component } from 'react'
import G6 from '@antv/g6'
import { helper } from 'echarts'


export default function KnowledgeMap () {
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (ref.current) {
      const data = {
        nodes: [

        ],
        edges: [

        ],
      }
      const graph = new G6.Graph({
        container: ref.current,
        width: document.getElementById('map-container').offsetWidth,
        height: document.getElementById('map-container').offsetHeight,
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
        },
      })

      graph.data(data)
      graph.render()
    }
  }, [])

  return (
    <div id="map-container" ref={ref} style={{ height: '100%', width: '100%' }}></div>
  )
}
