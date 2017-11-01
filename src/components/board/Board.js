import React, { Component } from 'react'

import { Button } from 'react-bootstrap'
import { isEmpty } from 'ramda'

import Calculate from '../../presenters/Calculate'
import Point from '../point/Point'
import Line from '../line/Line'
import Circle from '../circle/Circle'
import Stats from '../stats/Stats'

import './Board.css'

class Board extends Component {
  constructor() {
    super()

    this.state = {
      points: [],
      center: {},
      edges: {},
      circle: {},
      config: {},
      hide: null
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.getDimensions.bind(this))

    this.getDimensions()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getDimensions.bind(this))
  }

  componentDidUpdate() {
    this.generate()
  }

  getDimensions() {
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

  generate() {
    const { points, center } = this.state

    if (points.length === 3 && isEmpty(center)) {
      const edges = Calculate.edges(points)
      const center = Calculate.center(edges)
      const fourthPoint = Calculate.fourthPoint(center, edges.middle)
      const area = Calculate.area(edges)
      const radius = Calculate.radius(area)

      const circle = { area: area, radius: radius }
      const newPoints = [...points.slice(), fourthPoint]

      this.setState({ points: newPoints, center, edges, circle })
    }
  }

  checkPosition(points, x, y) {
    return points.every((o) => (o.x !== x) && (o.y !== y))
  }

  hideCircle(key) {
    this.setState({ hide: key })
  }

  shouldCircleHide(key) {
    const { hide } = this.state

    return hide === key ? 'board-hide' : ''
  }

  moveCircle(e, key) {
    const { points, config } = this.state
    let newPoints = points.slice()

    newPoints[key].x = e.clientX - config.left
    newPoints[key].y = e.clientY - config.top
    newPoints.pop()

    this.setState({ points: newPoints, hide: null })

    this.reset()
    this.generate()
  }

  handlePoint(e) {
    const { points, config } = this.state
    let newPoints = points.slice()

    const x = e.clientX - config.left
    const y = e.clientY - config.top

    if (points.length <= 2 && this.checkPosition(points, x, y)) {
      newPoints.push({ x: x, y: y})

      this.setState({ points: newPoints })
    }
  }

  reset() {
    this.setState({ center: {}, edges: {}, circle: {} })
  }

  resetAll() {
    this.setState({ points: [], center: {}, edges: {}, circle: {} })
  }

  render() {
    const { points, center, edges, circle, config } = this.state

    return (
      <div className="board">
        <div className="board-area">
          { config.width && config.height &&
            <svg viewBox={`0 0 ${config.width} ${config.height}`} onClick={(e) => this.handlePoint(e)}>
              <g>
                <Line
                  points={points}
                  edges={edges} />

                <Circle
                  center={center}
                  circle={circle} />

                <Point
                  points={points}
                  hideCircle={(key) => this.hideCircle(key)}
                  moveCircle={(e, key) => this.moveCircle(e, key)}
                  shouldCircleHide={() => this.shouldCircleHide()} />
              </g>
            </svg>
          }

          <Stats
            points={points}
            circle={circle} />

          <Button bsStyle="custom" bsSize="small" onClick={() => this.resetAll()}>Reset</Button>
        </div>
      </div>
    )
  }
}

export default Board
