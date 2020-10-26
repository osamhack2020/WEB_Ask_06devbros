import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as postsService from '../service/postsService';

// Import custom components
import PostForm from '../components/Form/PostForm';

class PostContainer extends Component {
  constructor(props) {
    super(props);
    this.addPost = this.addPost.bind(this);
    this.editPost = this.editPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

 /**
   * Add the post.
   *
   * @param {object} postProps
   */
  addPost(postProps) {
    this.props.actions.addPost(postProps);
  }

 /**
   * edit the post.
   *
   * @param {object} postProps
   */
  editPost(postProps) {
    this.props.actions.editPost(postProps);
  }

 /**
   * delete the post.
   *
   * @param {object} postProps
   */
  deletePost(postProps) {
    this.props.actions.deletePost(postProps);
  }

  render() {
    console.log("RENDERING!!!!");
    return <PostForm
            path={this.props.match.path} 
            id={this.props.match.params} 
            errorMessage={this.props.errorMessage}
            addPost={this.addPost}
            editPost={this.editPost}
            deletePost={this.deletePost}
            />;
  }
}

/**
 * Map the state to props.
 */
const mapStateToProps = (state) => ({
  title:state.posts.title,
  content:state.posts.content,
  createdAt:state.posts.createdAt,
  editedAt:state.posts.editedAt,
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, postsService), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);