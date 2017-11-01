import React from 'react'

import { isEmpty, hasIn } from 'ramda'

import { BLUE } from '../../constants/colors'

const Line = ({ points, edges }) => {
  if (points[3] && hasIn('x', points[3]) && hasIn('y', points[3]) && !isEmpty(edges)) {
    return (
      <g>
        <line x1={edges.nearest.x} y1={edges.nearest.y} x2={edges.middle.x} y2={edges.middle.y} stroke={BLUE} strokeWidth="2" />
        <line x1={edges.middle.x} y1={edges.middle.y} x2={edges.farest.x} y2={edges.farest.y} stroke={BLUE} strokeWidth="2" />
        <line x1={edges.farest.x} y1={edges.farest.y} x2={points[3].x} y2={points[3].y} stroke={BLUE} strokeWidth="2" />
        <line x1={points[3].x} y1={points[3].y} x2={edges.nearest.x} y2={edges.nearest.y} stroke={BLUE} strokeWidth="2" />
      </g>
    )
  }

  return null;
}

export default Line
