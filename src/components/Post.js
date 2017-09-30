import React from 'react';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import '../utils/App.css';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goToPost, fetchComments, upVoteComment, downVoteComment, createComment, deletePost, deleteComment, 
         upVotePost, downVotePost, updatePost, updateComment} from '../actions';
import Comment from './Comments';
import CreateComment from './CreateComment';

class Post extends React.Component{

    state = {
        open: false,
        title: "" ,
        body: ""
    }

    static propTypes = {
        goToPost: PropTypes.func.isRequired,
        fetchComments: PropTypes.func.isRequired,
        upVoteComment: PropTypes.func.isRequired,
        downVoteComment: PropTypes.func.isRequired,
        createComment: PropTypes.func.isRequired,
        deletePost: PropTypes.func.isRequired,
        upVotePost: PropTypes.func.isRequired,
        downVotePost: PropTypes.func.isRequired,
        updatePost: PropTypes.func.isRequired,
        updateComment: PropTypes.func.isRequired,
    };

    componentDidMount() {
        let id = this.getPostId();
        this.props.goToPost(id);
        this.props.fetchComments(id);
    };

    getPostId() {
        let id = this.props.location.search;
        return id.split('=')[1];
    };

    removePost = (event) => {
        let id = this.getPostId();
        this.props.deletePost(id);
        window.location = '/';
    };

    handleOpen = () => {
        this.setState({open: true});
    };
    
    handleClose = () => {
        this.setState({open: false});
    };

    handleChangeTitle = (event, newValue) => {
        this.setState({title: newValue});
    };

    handleChangeBody = (event, newValue) => {
        this.setState({body: newValue});
    };

    modifyPost = (event) => {
        let id = this.getPostId();
        let title = this.state.title;
        let body = this.state.body;
        this.props.updatePost(id, title, body);
        this.handleClose();
        //window.location = '/';
    };
   
    render() {
        
        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onClick={() => this.modifyPost()}
            />,
        ];

        const { post, comments } = this.props;  
        
        return(
            <div className="Post">   
                <AppBar title="Post" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
                <div className="TextField">
                    <h3>{post.title}</h3>
                    <hr/>
                </div >                       
                <div className="TextField">
                    <Card expanded={true}>
                        <CardHeader 
                            title={post.author}
                            subtitle={post.category}
                            actAsExpander={true}
                        />
                        <CardText expandable={true}>
                            {post.body}                            
                            <br/>
                            <br/>
                            {post.voteScore}
                        </CardText>
                        <CardActions>
                            <FlatButton label="+1"  secondary={true} onClick={() => this.props.upVotePost(post.id)}/>
                            <FlatButton label="-1"  secondary={true} onClick={() => this.props.downVotePost(post.id)}/>
                            <FlatButton label="Update" primary={true} onClick={this.handleOpen}/>
                            <Dialog title="Update your Post!" actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose}>
                                <TextField floatingLabelText="Title:" defaultValue={post.title} onChange={this.handleChangeTitle}/>
                                <br/>
                                <TextField floatingLabelText="Body:" defaultValue={post.body} onChange={this.handleChangeBody}/>
                            </Dialog>
                            <FlatButton label="Delete" primary={true} onClick={this.removePost} />
                        </CardActions>
                    </Card>
                </div>
                <Comment comments={comments} onUpVote={this.props.upVoteComment} onDownVote={this.props.downVoteComment} onRemoveComment={this.props.deleteComment}
                         onUpdateComment={this.props.updateComment}/>
                     <div className="TextField">
                        <h3>New Comment</h3>
                        <hr/>
                        <CreateComment postId={this.getPostId()} createComment={this.props.createComment}/>
                    </div>
            </div>
        );
    }
}

function mapStateToProps({ post, comments }) {
    return {
      post,
      comments
    };
  }
  
  export default connect(mapStateToProps, {
    goToPost,
    fetchComments,
    upVoteComment,
    downVoteComment,
    createComment,
    deletePost,
    deleteComment,
    upVotePost, 
    downVotePost,
    updatePost,
    updateComment,
  })(Post);