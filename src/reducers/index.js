import { combineReducers } from 'redux'

import PointsReducer from './PointsReducer'

export default combineReducers({
  points: PointsReducer
})
