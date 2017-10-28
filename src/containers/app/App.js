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
                <h2 className="app-title">Geometric Shapes</h2>

                <p className="app-content">
                  Lorem ipsum dolor sit amet, in nam populo altera, eos no tibique adipisci evertitur. Has scripta gloriatur et. Sed in oblique legendos. Ius dolore gubergren ex. Eos quidam complectitur eu. Eu liber principes pertinacia per, nam movet graeco officiis ut. Id atqui oratio pri, no nec ullum molestiae dignissim.
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
