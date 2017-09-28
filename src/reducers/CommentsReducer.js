import {GET_COMMENTS, UP_VOTE_COMMENT, DOWN_VOTE_COMMENT, CREATE_COMMENT, DELETE_COMMENT, EDIT_COMMENT} from '../constants/ActionTypes'

export default function(state = {}, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return [...action.comments];
    case UP_VOTE_COMMENT:
      let index = 0;
      for (let comment of state) {
        if (comment.id === action.comment.id) {
          break;
        }
        index++;
      }
      return [...state.slice(0, index), action.comment, ...state.slice(index + 1)];
    case DOWN_VOTE_COMMENT:
      let indexx = 0;
      for (let comment of state) {
        if (comment.id === action.comment.id) {
          break;
        }
        indexx++;
      }
      return [...state.slice(0, indexx), action.comment, ...state.slice(indexx + 1)];
    case CREATE_COMMENT:
      return [...state, action.comment];
    case DELETE_COMMENT:
      let indexxx = 0;
      for (let comment of state) {
        if (comment.id === action.id) {
          break;
        }
      indexxx++;
      }
      let oldComment = state[indexxx]
      let comment = {
         id: oldComment.id, 
         parentId: oldComment.parentId,
         timestamp: oldComment.timestamp, 
         body: oldComment.body, 
         author: oldComment.author, 
         voteScore: oldComment.voteScore,
         parentDeleted: oldComment.parentDeleted,
         deleted: true
         }
      return [...state.slice(0, indexxx), comment, ...state.slice(indexxx + 1)];
    case EDIT_COMMENT:
      let index4 = 0;
      for (let comment of state) {
        if (comment.id === action.comment.id) {
          break;
        }
      index4++;
      }
      return [...state.slice(0, index4), action.comment, ...state.slice(index4 + 1)];
    default:
      return state;
  }
}