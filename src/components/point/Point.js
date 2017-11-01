import React from 'react'

import DraggableSVG from 'react-draggable-svg'

import { RED, WHITE } from '../../constants/colors'
import { VERTICES } from '../../constants/vertices'

const Point = ({ points, hideCircle, moveCircle, shouldCircleHide }) => {
  return (
    points.map((point, key) => (
      <DraggableSVG.g
        key={key}
        onDragStart={() => key <= 2 && hideCircle(key)}
        onDragEnd={(e) => key <= 2 && moveCircle(e, key)}
      >
        <circle
          cx={point.x}
          cy={point.y}
          r="11"
          stroke="transparent"
          fill={RED}
          className={`board-draggable ${shouldCircleHide(key)}`}
        />

        <text
          x={point.x}
          y={point.y}
          textAnchor="middle"
          stroke={WHITE}
          strokeWidth="1px"
          dy=".3em"
          className={`board-draggable board-number ${shouldCircleHide(key)}`}
        >
          {VERTICES[key]}
        </text>
      </DraggableSVG.g>
    ))
  )
}

export default Point
