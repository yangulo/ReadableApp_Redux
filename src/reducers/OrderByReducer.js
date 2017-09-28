import {UPDATE_ORDER} from '../constants/ActionTypes'

export default function(state = {}, action) {
    switch (action.type) {
      case UPDATE_ORDER:
        return [...action.newOrder];
      default:
        return state;
    }
  }