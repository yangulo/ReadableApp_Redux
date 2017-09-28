import React from 'react';
import '../utils/App.css';
import { Card } from 'material-ui/Card';
import TableArray from './TableArray';
import AppBar from 'material-ui/AppBar';
import Chip from 'material-ui/Chip';
import {cyan100} from 'material-ui/styles/colors'; 
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { getPostByCategory } from '../actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
  
  class FilterByCategory extends React.Component {

    static propTypes = {
        getPostByCategory: PropTypes.func.isRequired,
    }

    componentDidMount() {
        let category = this.props.location.search;
        category = category.toLowerCase().split('=')[1];
        this.props.getPostByCategory(category); 
    }
    
    render() {
        const style = {marginRight: 20,};
        let category = this.props.location.search;
        category = category.toLowerCase().split('=')[1];
        const { posts } = this.props;  
          
        return(
            <div className="MainView">
                <div className="ReadableApp">
                    <AppBar title="Readable App" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
                </div>
                <div className="CategoriesBar">
                    <Card className="TextField">
                        <h3>Category</h3>
                        <Chip backgroundColor={cyan100}>
                            {category}
                        </Chip>
                        <hr/>
                        <TableArray posts={posts}/>
                    </Card>
                </div>
                <FloatingActionButton className="floating-menu"style={style} onClick={function(event) {window.location = '/newpost'}}>
                    <ContentAdd />
              </FloatingActionButton>
            </div>
          );
      }
  }

function mapStateToProps({posts}) {
    return {
        posts
    };
  }
  
export default connect(mapStateToProps, {getPostByCategory})(FilterByCategory);