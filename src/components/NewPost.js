import React from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import {Card, CardActions} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import '../utils/App.css';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class NewPost extends React.Component{
    
    state = {
        name: '',
        title: '',
        body: '',
        category:''
    }

    static propTypes = {
        createPost: PropTypes.func.isRequired,
        post: PropTypes.object.isRequired
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

    handleChangeCategory = (event, index, newValue) => {
        this.setState({category: newValue});
    };

    handleChangeTitle = (event, newValue) => {
        this.setState({title: newValue});
    }

    handleChangeBody = (event, newValue) => {
        this.setState({body: newValue});
    }

    createNewPost = (event) => {
        let post = { 
            id: this.generateUUID(), 
            title: this.state.title, 
            author: this.state.name, 
            timestamp: new Date().getTime(), 
            body: this.state.body, 
            category: this.state.category 
        };
        this.props.createPost(post);
        window.location = '/';
        console.log(post);
    }

    render(){
        const style = {
            margin: 12,
          };
        
        return(
            <div className="NewPost">
                <AppBar title="New Post" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
                <div className="ReadablePost">
                    <h3>Write a New Post!</h3> 
                    <hr/>
                    <Card>
                        <TextField className="TextField" hintText="Your Name" floatingLabelText="Name:" onChange={this.handleChangeName}/>
                        <br />
                        <TextField className="TextField" hintText="Post Title" floatingLabelText="Title:" onChange={this.handleChangeTitle}/>
                        <br />
                        <SelectField className="TextField" floatingLabelText="Category" value={this.state.category} onChange={this.handleChangeCategory}>
                            <MenuItem value={"react"} primaryText="React" />
                            <MenuItem value={"redux"} primaryText="Redux" />
                            <MenuItem value={"udacity"} primaryText="Udacity" />
                        </SelectField>
                        <br />
                        <TextField className="TextField" hintText="Post Body" floatingLabelText="Post Body:" multiLine={true} onChange={this.handleChangeBody}/>
                        <br />
                        <CardActions>
                            <RaisedButton label="Post" primary={true} style={style} onClick={this.createNewPost}/>
                        </CardActions>
                    </Card>
                    <br/>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ post }) {
    return {
      post
    };
  }
  
  export default connect(mapStateToProps, {
    createPost
  })(NewPost);