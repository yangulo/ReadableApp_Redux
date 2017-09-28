import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListPosts from './ListPosts';
import FilterByCategory from './FilterByCategory';
import Post from './Post';
import NewPost from './NewPost';

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={ListPosts} />
        <Route path="/category" component={FilterByCategory}/>
        <Route path="/post" component={Post}/>
        <Route path="/newpost" component={NewPost}/>
      </div>
    );
  }
}

export default App;