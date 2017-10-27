import React, { Component } from 'react'

import { Button } from 'react-bootstrap'

import './Board.css'

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

  render() {
    const { points, config } = this.state

    return (
      <div className="board">
        <div className="board-area" onClick={(e) => this.handlePoint(e)}>
          <svg width={config.width} height={config.height} viewBox={`0 0 ${config.width} ${config.height}`}>
            {
              points.map((point, key) => (
                <circle
                  key={key}
                  cx={point.x}
                  cy={point.y}
                  r="3"
                  stroke="black"
                  fill="red"
                />
              ))
            }
          </svg>
        </div>

        <Button className="board-button" bsStyle="primary" bsSize="small">About</Button>
        <Button className="board-button pull-right" bsSize="small">Reset</Button>
      </div>
    )
  }
}

export default Board
