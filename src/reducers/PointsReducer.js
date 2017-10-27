import {
  ADD_POINTS_START,
  ADD_POINTS_SUCCESS,
  ADD_POINTS_FAILURE
} from '../constants'

const initialState = {
  points: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_POINTS_START:
      return {
        ...state,
        isLoading: true
      }
    case ADD_POINTS_SUCCESS:
      return {
        ...state,
        points: [
          ...state.points,
          ...action.points,
        ]
      }
    case ADD_POINTS_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
