import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import '../utils/App.css';

class Comment extends Component {

    state = {
        open: false,
        body: "",
        timestamp:""
    }

    handleOpen(id) {
        this.setState({open: true, commentId: id});
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChangeBody = (event, newValue) => {
        this.setState({body: newValue});
    }

    modifyComment = () => {
        let id = this.state.commentId
        let timestamp = new Date().getTime();
        let body = this.state.body;
        this.props.onUpdateComment(id,timestamp, body);
        this.handleClose();
    };

    render() {

        const { comments } = this.props;
        let renderComments = comments == null;
        console.log(renderComments)

        return (
            <div className="TextField">
                {renderComments ? (<div></div>) : (
                    comments && comments.length > 0 && comments.filter((comment) => comment.deleted === false).map((comment) => (
                        <div className="TextField">
                            <Card key={comment.id} expanded={true}>
                                <CardHeader
                                    title={comment.author}
                                    actAsExpander={true} />
                                <CardText expandable={true}>
                                    {comment.body}
                                    <br />
                                    <br />
                                    {comment.voteScore}
                                </CardText>
                                <CardActions>
                                    <FlatButton label="+1" secondary={true} onClick={() => this.props.onUpVote(comment.id)} />
                                    <FlatButton label="-1" secondary={true} onClick={() => this.props.onDownVote(comment.id)} />
                                    <FlatButton label="Update" primary={true} onClick={() => this.handleOpen(comment.id)} />
                                    <Dialog title="Update your Comment!" modal={false} open={this.state.open} onRequestClose={this.handleClose}>
                                        <TextField floatingLabelText="Body:" onChange={this.handleChangeBody}/>
                                        <br />
                                        <FlatButton label="Ok" primary={true} keyboardFocused={true} onClick={() => this.modifyComment()}/>
                                    </Dialog>
                                    <FlatButton label="Delete" primary={true} onClick={() => this.props.onRemoveComment(comment.id)}/>
                                </CardActions>
                            </Card>
                        </div>
                    )))
                }
            </div>
        );
    }
}

export default Comment;