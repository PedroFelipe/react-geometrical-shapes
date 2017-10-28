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

  reset() {
    this.setState({ points: [] })
  }

  render() {
    const { points, config } = this.state

    return (
      <div className="board">
        <div className="board-area">
          <svg viewBox={`0 0 ${config.width} ${config.height}`} onClick={(e) => this.handlePoint(e)}>
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
          </svg>

          <Button bsStyle="custom" bsSize="small" onClick={() => this.reset()}>Reset</Button>
        </div>
      </div>
    )
  }
}

export default Board
