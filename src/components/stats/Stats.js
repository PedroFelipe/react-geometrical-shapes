import React from 'react'

import { VERTICES } from '../../constants/vertices'

const Stats = ({ points, circle }) => {
  return (
    <div className="board-stats">
      <div className="board-stats-column">
        {
          points.map((point, key) => (
            <p className="board-stats-line" key={key}>{VERTICES[key]}: [x: {point.x.toFixed(2)}, y: {point.y.toFixed(2)}]</p>
          ))
        }
      </div>

      {
        circle.area && circle.radius &&
        <div className="board-stats-column">
          <p className="board-stats-line">area: {circle.area.toFixed(2)} px²</p>
          <p className="board-stats-line">circle radius: {circle.radius.toFixed(2)} px</p>
        </div>
      }
    </div>
  )
}

export default Stats
