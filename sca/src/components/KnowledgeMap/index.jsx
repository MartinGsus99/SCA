import React, { Component } from 'react'
import G6 from '@antv/g6'
import { helper } from 'echarts'


export default function KnowledgeMap (props) {
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (ref.current) {
      const data = props.mapData

      const tooltip = new G6.Tooltip({
        offsetX: 10,
        offsetY: 10,
        // the types of items that allow the tooltip show up
        // 允许出现 tooltip 的 item 类型
        itemTypes: ["node",],
        // custom the tooltip's content
        // 自定义 tooltip 内容
        getContent: (e) => {
          const outDiv = document.createElement("div")
          outDiv.style.width = "fit-content"
          outDiv.style.padding = "0px 0px 20px 0px"
          outDiv.innerHTML = `
                   <div style="width:450px">
                    <h4>节点信息</h4>
                    <ul>
                        <li>Label: ${e.item.getModel().label ||
            e.item.getModel().id
            }</li>
                    </ul>
                    <ul>
                        <li>描述信息: ${e.item.getModel().describtion || "无"
            }</li>
                    </ul></div>`
          return outDiv
        },
      })

      const graph = new G6.Graph({
        container: ref.current,
        width: document.getElementById('map-container').offsetWidth,
        height: document.getElementById('map-container').offsetHeight,
        layout: {
          type: 'concentric',
          center: [500, 400], // 可选，
          linkDistance: 50, // 可选，边长
          preventOverlap: true, // 可选，必须配合 nodeSize
          nodeSize: 130, // 可选
          nodeSpacing: 130,
          sweep: 5, // 可选
          equidistant: true, // 可选
          startAngle: 0, // 可选
          clockwise: true, // 可选

        },

        fitViewPadding: [1, 1, 1, 1],

        defaultNode: {
          type: "circle",
          size: 50,
        },

        defaultEdge: {
          type: "poliline",
          style: {
            fill: '#A0E4CB',
            radius: 10,
            lineWidth: 2,
            offset: 30,
            endArrow: true,
          },
        },

        defaultCombo: {
          style: {
            fill: "#fff",
          },
        },

        //插件
        plugins: [tooltip],
        enabledStack: true,

        //交互
        modes: {
          default: [
            "drag-node",
            "drag-canvas",
            "zoom-canvas",
          ],
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
