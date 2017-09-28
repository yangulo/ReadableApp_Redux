import React from 'react';
import TextField from 'material-ui/TextField';
import {Card, CardActions} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import '../utils/App.css';

class CreateComment extends React.Component{
    
    state = {
        name: '',
        body: '',
    }

    generateUUID () {        
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxxxxxx4xxxyxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    handleChangeName = (event, newValue) => {
        this.setState({name: newValue});
    }

    handleChangeBody = (event, newValue) => {
        this.setState({body: newValue});
    }

    createNewComment = (event) => {
        let comment = { 
            id: this.generateUUID(), 
            timestamp: new Date().getTime(), 
            body: this.state.body, 
            author: this.state.name, 
            parentId: this.props.postId
        };
        this.props.createComment(comment);
        //window.location = '/post?id=' + comment.parentId; 
        console.log(comment);
    }

    render() {
        const style = {
            margin: 12,
        }

        return(
            <div className="TextField">
                <Card>
                    <TextField className="TextField" hintText="Your Name" floatingLabelText="Name:" onChange={this.handleChangeName}/>
                        <br />
                    <TextField className="TextField" hintText="Post Body" floatingLabelText="Post Body:"  multiLine={true} onChange={this.handleChangeBody}/>
                        <br />
                    <CardActions>
                        <RaisedButton label="Post" primary={true} style={style} onClick={this.createNewComment} />
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default CreateComment;