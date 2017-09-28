import {GET_CATEGORIES} from '../constants/ActionTypes'

export default function(state = {}, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return [...action.categories];
    default:
      return state;
  }
}