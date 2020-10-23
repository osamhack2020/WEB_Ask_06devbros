import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { POSTS } from '../constants/entity';
import * as crudAction from '../actions/crudAction';

// Import custom components
import PostsForm from '../components/Form/PostsForm';

class PostsContainer extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * refresh the board.
   *
   */
  refreshBoard() {
    this.props.actions.fetchAll(POSTS);
  }

  render() {
    this.refreshBoard();
    return <PostsForm errorMessage={this.props.errorMessage} products={this.props.products}/>;
  }
}

/**
 * Map the state to props.
 */
const mapStateToProps = (state) => ({
  products: state.crud.products,
  selectedItem: state.crud.selectedItem,
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, crudAction), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);