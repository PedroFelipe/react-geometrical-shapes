import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

import Board from '../../components/board/Board'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Grid fluid={true}>
          <Row>
            <Col xs={12} sm={5} md={3} className="app-column">
              <div className="app-side">
                <h3 className="app-title">Parallelogram Autocomplete</h3>

                <blockquote className="app-blockquote">
                  A parallelogram is a simple quadrilateral with two pairs of parallel sides. The opposite or facing sides of a parallelogram are of equal length and the opposite angles of a parallelogram are of equal measure.
                  <footer>Wikipedia</footer>
                </blockquote>

                <p className="app-content">
                  <b>Parallelogram Autocomplete</b> is a smart webapp written with ES6 and React that calculates the 4th missing point of a parallelogram. All you have to do on the whiteboard is click on 3 different points, they'll be edges of your parallelogram and this app will automatically calculate and draw the 4th point.
                </p>

                <p className="app-content">
                  You can also reset or drag and freely move your points. Try it!
                </p>
              </div>
            </Col>

            <Col xs={12} sm={7} md={9} className="app-column">
              <Board />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default App;
