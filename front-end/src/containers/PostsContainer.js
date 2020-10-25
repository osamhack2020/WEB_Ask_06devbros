import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { POSTS } from '../constants/entity';
import * as postsService from '../service/postsService';
import { getAllPostsSuccess, getAllPostsFailure, } from '../actions/postsAction';

// Import custom components
import PostsForm from '../components/Form/PostsForm';

class PostsContainer extends Component {
  constructor(props) {
    super(props);
    this.refreshBoard = this.refreshBoard.bind(this);
  }

  /**
   * refresh the board.
   *
   */
  refreshBoard() {
    this.props.actions.getAllPosts();
  }

  render() {
    this.refreshBoard();
    return <PostsForm  errorMessage={this.props.errorMessage} posts={this.props.posts}/>;
  }
}

/**
 * Map the state to props.
 */
const mapStateToProps = (state) => ({
  posts:state.posts.posts,
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, postsService), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);