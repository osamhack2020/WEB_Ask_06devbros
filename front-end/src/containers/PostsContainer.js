import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as postsService from '../service/postsService';
import { POSTS } from '../constants/entity';
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
    return <PostsForm onLoad={this.refreshBoard} errorMessage={this.props.errorMessage} posts={this.props.posts}/>;
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