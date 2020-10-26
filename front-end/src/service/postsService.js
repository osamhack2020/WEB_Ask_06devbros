import axios from 'axios';
import { push } from 'connected-react-router';

import { getAllPostsSuccess, getAllPostsFailure, addPostSuccess,
   addPostFailure, getPostSuccess, getPostFailure,
   editPostSuccess, editPostFailure, deletePostSuccess,
   deletePostFailure, } from '../actions/postsAction';
import { API_URL, JWT_TOKEN } from '../config/config';

export const getAllPosts = () => {
  return (dispatch) => {
    axios
      .get('/posts')
      .then((response) => {
        // dispatch(getAllPostsSuccess(response.data.posts));
      })
      .catch((error) => {
        dispatch(getAllPostsFailure(error.response.data));
      });
  };
};

export const addPost = ({ content, title }) => {
  return (dispatch) => {
    axios
      .post('/posts', { content, title })
      .then((response) => {
        dispatch(addPostSuccess(response.data.token));
        dispatch(push('/posts'));
        window.location.reload();
      })
      .catch((error) => {
        dispatch(addPostFailure(error.response.data));
      });
  };
};

export const getPost = ({ id }) => {
  return (dispatch) => {
    axios
      .get('/posts' + {id})
      .then((response) => {
        dispatch(getPostSuccess(response.data.token));
        dispatch(push('/posts'));
        window.location.reload();
      })
      .catch((error) => {
        dispatch(getPostFailure(error.response.data));
      });
  };
};

export const editPost = ({ id, title, content }) => {
  return (dispatch) => {
    axios
      .put('/posts' + { id }, { title, content })
      .then((response) => {
        dispatch(editPostSuccess(response.data.token));
        dispatch(push('/posts'));
        window.location.reload();
      })
      .catch((error) => {
        dispatch(editPostFailure(error.response.data));
      });
  };
};

export const deletePost = ({ id }) => {
  return (dispatch) => {
    axios
      .delete('/posts' + { id })
      .then((response) => {
        dispatch(deletePostSuccess(response.data.token));
        dispatch(push('/posts'));
        window.location.reload();
      })
      .catch((error) => {
        dispatch(deletePostFailure(error.response.data));
      });
  };
};
