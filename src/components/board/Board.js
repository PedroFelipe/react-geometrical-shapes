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
        top: boardConfiguration.top,
        left: boardConfiguration.left,
      }
    })
  }

  handlePoint(e) {
    const { points, config } = this.state
    let newPoints = points.slice()

    if (points.length <= 2) {
      newPoints.push({ x: e.screenX - config.left, y: e.screenY - config.top })
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
          <svg viewBox={`0 0 ${config.width} ${config.height - 55}`} onClick={(e) => this.handlePoint(e)}>
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
