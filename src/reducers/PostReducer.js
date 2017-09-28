import {GET_UNIQUE_POST, CREATE_POST, UP_VOTE_POST, DOWN_VOTE_POST, EDIT_POST} from '../constants/ActionTypes'

export default function(state = {}, action) {
  switch (action.type) {
    case GET_UNIQUE_POST:
      return action.post;
    case CREATE_POST:
      return action.post;
    case UP_VOTE_POST:
      return action.post;
    case DOWN_VOTE_POST:
      return action.post;
    case EDIT_POST:
    return action.post;
    default:
      return state;
  }
}