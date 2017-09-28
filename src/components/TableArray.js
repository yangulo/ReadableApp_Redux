import React from 'react';
import '../utils/App.css';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  } from 'material-ui/Table';
  import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
  import Toggle from 'material-ui/Toggle';
  import FontIcon from 'material-ui/FontIcon';

  export const VOTE_ORDER = 'VOTE_ORDER';
  export const TIMESTAMP_ORDER = 'TIMESTAMP_ORDER';
  

  class TableArray extends React.Component{

    state = {
      time: false,
      voteScore: false,
    }

    newTime(time) {
      return new Date(time).toDateString();
    };  

    onCellClick (row, col, posts) {
      if (col===-1) {
        let filteredPosts = posts.filter((post) => post.deleted === false);
        window.location = '/post?id=' + filteredPosts[row].id;
      } 
    }

    handleToggleVoteScore = (event) => {
      this.setState({voteScore: true, time: false});
      //console.log(this.state.voteScore);
      this.props.onOrderByVoteScore();
    };

    handleToggleTime = (event) => {
      this.setState({time: true, voteScore: false});
      this.props.onOrderByTime();
    };

      render() {
        
        const {posts} = this.props
        
          return(
            <div>
              <Toolbar>
                <ToolbarGroup>
                  <ToolbarTitle text="Sort by: " />
                    <FontIcon className="muidocs-icon-custom-sort" />
                    <ToolbarGroup>
                      <Toggle
                        toggled={this.state.voteScore}
                        onToggle={this.handleToggleVoteScore}
                        labelPosition="right"
                        label="Vote Score"
                      />
                      <Toggle
                        toggled={this.state.time}
                        onToggle={this.handleToggleTime}
                        labelPosition="right"
                        label="Time"
                      />
                      </ToolbarGroup>
                  </ToolbarGroup>
              </Toolbar>
                <Table 
                onCellClick={(row, col) => this.onCellClick(row, col, posts)}>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderColumn tooltip="Category">Category</TableHeaderColumn>
                      <TableHeaderColumn tooltip="Score">Vote Score</TableHeaderColumn>
                      <TableHeaderColumn tooltip="Title">Title</TableHeaderColumn>
                      <TableHeaderColumn tooltip="Time">Time</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts && posts.length > 0 && posts.filter((post) => post.deleted === false).map((post)=>(
                      <TableRow key={post.id}>
                        <TableRowColumn>{post.category}</TableRowColumn>
                        <TableRowColumn>{post.voteScore}</TableRowColumn>
                        <TableRowColumn>{post.title}</TableRowColumn>
                        <TableRowColumn>{this.newTime(post.timestamp)}</TableRowColumn>
                      </TableRow>
                  ))}
                  </TableBody>
                </Table>
          </div>
          );
      }
  }

export default TableArray;