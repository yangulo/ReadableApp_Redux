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

  class TableArray extends React.Component{

    newTime(time) {
      return new Date(time).toDateString();
    };  

    onCellClick (row, col, posts) {
      if (col===-1) {
        let filteredPosts = posts.filter((post) => post.deleted === false);
        window.location = '/post?id=' + filteredPosts[row].id;
      } 
    }

      render() {
        
        const {posts} = this.props
        
          return(
            <div>
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