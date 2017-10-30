import React, { Component } from 'react'

import { Button } from 'react-bootstrap'

import './Board.css'

const RED = '#E75058'
const BLUE = '#233D7F'
const YELLOW = '#FBD855'

class Board extends Component {
  constructor(props) {
    super(props)

    this.state = {
      points: [],
      config: {},
    }
  }

  componentDidMount() {
    const board = document.querySelector('.board-area')
    const boardConfiguration = board.getBoundingClientRect()

    this.setState({
      config: {
        width: boardConfiguration.width,
        height: boardConfiguration.height,
        top: boardConfiguration.top + 95,
        left: boardConfiguration.left + 47,
      }
    })
  }

  checkPosition(points, x, y) {
    return points.every((o) => (o.x !== x) && (o.y !== y))
  }

  handlePoint(e) {
    const { points, config } = this.state
    let newPoints = points.slice()

    const x = e.screenX - config.left
    const y = e.screenY - config.top

    if (points.length <= 2 && this.checkPosition(points, x, y)) {
      newPoints.push({ x: x, y: y})

      this.setState({
        points: newPoints,
      })
    }
  }

  drawLines() {
    const { points } = this.state

    if (points.length === 2) {
      const startPoint = points[0]
      const finalPoint = points[1]

      return (
        <line x1={startPoint.x} y1={startPoint.y} x2={finalPoint.x} y2={finalPoint.y} stroke={BLUE} />
      )
    }

    if (points.length === 3) {
      return (
        <g>
          <line x1={points[0].x} y1={points[0].y} x2={points[1].x} y2={points[1].y} stroke={BLUE} />
          <line x1={points[1].x} y1={points[1].y} x2={points[2].x} y2={points[2].y} stroke={BLUE} />
          <line x1={points[2].x} y1={points[2].y} x2={points[0].x} y2={points[0].y} stroke={BLUE} />
        </g>
      )
    }
  }

  reset() {
    this.setState({ points: [] })
  }

  render() {
    const { points, config } = this.state

    return (
      <div className="board">
        <div className="board-area">
          <svg viewBox={`0 0 ${config.width} ${config.height}`} onClick={(e) => this.handlePoint(e)}>
            <g>
              {
                points.map((point, key) => (
                  <circle
                    key={key}
                    cx={point.x}
                    cy={point.y}
                    r="11"
                    stroke="transparent"
                    fill={RED}
                  />
                ))
              }

              { this.drawLines() }
            </g>
          </svg>

          <Button bsStyle="custom" bsSize="small" onClick={() => this.reset()}>Reset</Button>
        </div>
      </div>
    )
  }
}

export default Board
