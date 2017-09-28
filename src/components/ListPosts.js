import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Card} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import { fetchCategories, fetchPosts, orderByTime, orderByVoteScore} from '../actions';
import '../utils/App.css';
import {cyan100} from 'material-ui/styles/colors';
import TableArray from './TableArray';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AppBar from 'material-ui/AppBar';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

class ListPosts extends Component {

  static propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    orderByTime: PropTypes.func.isRequired,
    orderByVoteScore: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  };

  render() {

    const style = {marginRight: 20,};
    const { categories, posts } = this.props;   

    return (
      <div className="App">
        <Route exact path="/" render={() =>(
          <div className="MainView">
            <div className="ReadableApp">
              <AppBar title="Readable App" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
            </div>
            <div className="CategoriesBar">
            <Card className="TextField">
              <h3>Categories</h3>
              <hr/>
              <div style={styles.wrapper}>
                {categories && categories.length > 0 && categories.map((category) => (
                  <Chip key={category.path} style={styles.chip} backgroundColor={cyan100}
                        onClick={function(event) {window.location = '/category?id=' + category.path}}>
                        {category.name}
                  </Chip>
                ))}
              </div>
              <TableArray posts={posts} onOrderByTime={this.props.orderByTime} onOrderByVoteScore={this.props.orderByVoteScore}/>
            </Card>
            <div>
              <FloatingActionButton className="floating-menu"style={style} onClick={function(event) {window.location = '/newpost'}}>
                <ContentAdd />
              </FloatingActionButton>
            </div>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

function mapStateToProps({categories, posts}) {
  return {
    categories, 
    posts
  };
}

export default connect(mapStateToProps, {
  fetchCategories, 
  fetchPosts, 
  orderByTime,
  orderByVoteScore
})(ListPosts)
