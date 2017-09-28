import { combineReducers } from 'redux';
import categoryReducer from './CategoryReducer';
import postsReducer from './PostsReducer';
import postReducer from './PostReducer';
import commentsReducer from './CommentsReducer';

const rootReducer = combineReducers({
  categories: categoryReducer,
  posts: postsReducer,
  post: postReducer,
  comments: commentsReducer
})

export default rootReducer
