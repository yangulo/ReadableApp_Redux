import {GET_POSTS, GET_POST_BY_CATEGORY, DELETE_POST, UP_VOTE_POST, DOWN_VOTE_POST, UPDATE_ORDER_TIME, UPDATE_ORDER_VOTE_SCORE} from '../constants/ActionTypes'

export default function(state = {}, action) {
  switch (action.type) {
    case GET_POSTS:
      return [...action.posts];
    case GET_POST_BY_CATEGORY:
      return [...action.posts];
    case DELETE_POST:
      let index = 0;
      for (let post of state) {
        if (post.id === action.id) {
          break;
        }
      index++;
      }
      let oldPost = state[index]
      let post = {
         id: oldPost.id, 
         timestamp: oldPost.timestamp, 
         title: oldPost.title, 
         body: oldPost.body, 
         author: oldPost.author, 
         category: oldPost.category, 
         voteScore: oldPost.voteScore,
         deleted: true
         }
      return [...state.slice(0, index), post, ...state.slice(index + 1)];
    case UP_VOTE_POST:
      let indexx = 0;
      for (let post of state) {
        if (post.id === action.post.id) {
          break;
        }
        indexx++;
      }
      return [...state.slice(0, indexx), action.post, ...state.slice(indexx + 1)];
    case DOWN_VOTE_POST:
      let indexxx = 0;
      for (let post of state) {
        if (post.id === action.post.id) {
          break;
        }
        indexxx++;
      }
      return [...state.slice(0, indexxx), action.post, ...state.slice(indexxx + 1)];
    case UPDATE_ORDER_TIME:
      let sortByTime = state.slice(0);
      sortByTime.sort(function(a,b) {
        return a.timestamp - b.timestamp;
        });
      return sortByTime;
    case UPDATE_ORDER_VOTE_SCORE:
        let sortByVoteScore = state.slice(0);
        sortByVoteScore.sort(function(a,b){
          return b.voteScore - a.voteScore;
        });
      return sortByVoteScore;
    default:
      return state;
  }
}