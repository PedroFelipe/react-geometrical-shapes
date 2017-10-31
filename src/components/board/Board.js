import React, { Component } from 'react'

import { Button } from 'react-bootstrap'
import { isEmpty, difference } from 'ramda'

import Calculate from '../../presenters/Calculate'

import './Board.css'

const RED = '#E75058'
const BLUE = '#233D7F'
const YELLOW = '#FBD855'

class Board extends Component {
  constructor(props) {
    super(props)

    this.state = {
      points: [],
      center: {},
      edges: {},
      radius: 0,
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
        top: boardConfiguration.top,
        left: boardConfiguration.left,
      }
    })
  }

  componentDidUpdate() {
    const { points, center, edges } = this.state

    if (points.length === 3 && isEmpty(center)) {
      const edges = Calculate.edges(points)
      const center = Calculate.center(edges)
      const fourthPoint = Calculate.fourthPoint(points, center, edges.middle)
      const area = Calculate.area(edges)
      const radius = Calculate.radius(area)

      this.setState({ points: fourthPoint, center, edges, radius })
    }
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

  reset() {
    this.setState({ points: [], center: {}, edges: {} })
  }

  drawCircles() {
    const { points } = this.state

    return (
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
    )
  }

  drawLines() {
    const { points, edges } = this.state

    if (points.length >= 3 && !isEmpty(edges)) {
      return (
        <g>
          <line x1={edges.nearest.x} y1={edges.nearest.y} x2={edges.middle.x} y2={edges.middle.y} stroke={BLUE} strokeWidth="2" />
          <line x1={edges.middle.x} y1={edges.middle.y} x2={edges.farest.x} y2={edges.farest.y} stroke={BLUE} strokeWidth="2" />
          <line x1={edges.farest.x} y1={edges.farest.y} x2={points[3].x} y2={points[3].y} stroke={BLUE} strokeWidth="2" />
          <line x1={points[3].x} y1={points[3].y} x2={edges.nearest.x} y2={edges.nearest.y} stroke={BLUE} strokeWidth="2" />
        </g>
      )
    }
  }

  drawBigCircle() {
    const { center, radius } = this.state

    console.log(radius)

    if (radius > 0) {
      return (
        <circle
          cx={center.x}
          cy={center.y}
          r={radius}
          stroke={YELLOW}
          strokeWidth="2"
          fill="transparent"
        />
      )
    }
  }

  render() {
    const { config } = this.state

    return (
      <div className="board">
        <div className="board-area">
          <svg viewBox={`0 0 ${config.width} ${config.height}`} onClick={(e) => this.handlePoint(e)}>
            <g>
              { this.drawLines() }

              { this.drawCircles() }

              { this.drawBigCircle() }
            </g>
          </svg>

          <Button bsStyle="custom" bsSize="small" onClick={() => this.reset()}>Reset</Button>
        </div>
      </div>
    )
  }
}

export default Board
