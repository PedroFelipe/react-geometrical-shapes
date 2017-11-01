import React from 'react'

import DraggableSVG from 'react-draggable-svg'

import { YELLOW } from '../../constants/colors'

const Circle = ({ center, circle }) => {
  if (circle.radius > 0) {
    return (
      <circle
        cx={center.x}
        cy={center.y}
        r={circle.radius}
        stroke={YELLOW}
        strokeWidth="2"
        fill="transparent"
      />
    )
  }

  return null
}

export default Circle
