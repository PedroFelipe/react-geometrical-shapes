import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

import Board from '../../components/board/Board'

import './App.css'

class App extends Component {

  renderAbout() {
    return (
      <div className="app-side">
        <h3 className="app-title">Parallelogram Autocomplete</h3>

        <blockquote className="app-blockquote">
          A parallelogram is a simple quadrilateral with two pairs of parallel sides. The opposite or facing sides of a parallelogram are of equal length and the opposite angles of a parallelogram are of equal measure.
          <footer>Wikipedia</footer>
        </blockquote>

        <p className="app-content">
          <b>Parallelogram Autocomplete</b> is a webapp written with JavaScript and React that calculates the 4th missing point of a parallelogram and draws a circle of same area and center of mass. On the whiteboard, click on 3 different points, they'll be the vertices and the 4th point will be automatically calculated and the circle will be drawn.
        </p>

        <p className="app-content">
          You can also reset or drag and freely move your points. Try it!
        </p>

        <p className="app-content">
          Created by <a href="https://pedrofelipe.com.br">Pedro Felipe</a>
        </p>
      </div>
    )
  }
  render() {
    return (
      <div className="app">
        <Grid fluid={true}>
          <Row>
            <Col xsHidden smHidden md={4} className="app-column">
              { this.renderAbout() }
            </Col>

            <Col xs={12} md={8} className="app-column">
              <Board />
            </Col>

            <Col xs={12} mdHidden lgHidden className="app-column">
              { this.renderAbout() }
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default App;
