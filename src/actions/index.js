import * as types from '../constants/ActionTypes'
import * as CategoryAPI from '../utils/CategoryAPI';
import * as CommentAPI from '../utils/CommentAPI';
import * as PostAPI from '../utils/PostAPI';

export const fetchPosts = () => dispatch => 
    PostAPI.getAll().then(posts => dispatch({type: types.GET_POSTS, posts: posts}));

export const fetchCategories = () => dispatch =>
    CategoryAPI.getAll().then(categories => dispatch({type: types.GET_CATEGORIES, categories: categories}));

export const fetchComments = (parentId) => dispatch => 
    CommentAPI.getComments(parentId).then(comments => dispatch({type: types.GET_COMMENTS, comments: comments}));

export const getPostByCategory = (category) => dispatch =>
    CategoryAPI.getPost(category).then(posts => dispatch({type: types.GET_POST_BY_CATEGORY, posts: posts}));

export const goToPost = (postId) => dispatch =>
    PostAPI.getUniquePost(postId).then(post => dispatch({type: types.GET_UNIQUE_POST, post: post}));

export const createPost = (post) => dispatch =>
    PostAPI.save(post).then(post => dispatch({type: types.CREATE_POST, post: post}));

export const createComment = (comment) => dispatch =>
    CommentAPI.save(comment).then(comment => dispatch({type: types.CREATE_COMMENT, comment: comment}));

export const upVoteComment = (id) => dispatch =>
    CommentAPI.upVote(id).then((comment) => dispatch({type: types.UP_VOTE_COMMENT, comment: comment}));

export const downVoteComment = (id) => dispatch =>
    CommentAPI.downVote(id).then((comment) => dispatch({type: types.DOWN_VOTE_COMMENT, comment: comment}));

export const upVotePost = (id) => dispatch =>
    PostAPI.upVote(id).then((post) => dispatch({type: types.UP_VOTE_POST, post: post}));

export const downVotePost = (id) => dispatch =>
    PostAPI.downVote(id).then((post) => dispatch({type: types.DOWN_VOTE_POST, post: post}));

export const deletePost = (id) => dispatch =>
    PostAPI.removePost(id).then(() => dispatch({type: types.DELETE_POST, id: id}));

export const deleteComment = (id) => dispatch =>
    CommentAPI.removeComment(id).then(() => dispatch({type: types.DELETE_COMMENT, id: id}));

export const updatePost = (id, title, body) => dispatch =>
    PostAPI.update(id, title, body).then((post) => dispatch({type: types.EDIT_POST, post: post}));

export const updateComment = (id, timestamp, body) => dispatch =>
    CommentAPI.update(id, timestamp, body).then((comment) => dispatch({type: types.EDIT_COMMENT, comment: comment}));


export const orderByTime = () => dispatch => 
    dispatch({type: types.UPDATE_ORDER_TIME});

export const orderByVoteScore = () => dispatch => 
    dispatch({type: types.UPDATE_ORDER_VOTE_SCORE});


