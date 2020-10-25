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
        console.log(response);
        dispatch(getAllPostsSuccess(response.data.posts));
      })
      .catch((error) => {
        dispatch(getAllPostsFailure(error.response.data));
      });
  };
};

export const addPost = ({ content, title }) => {
  return (dispatch) => {
    axios
      .post(API_URL + '/posts', { content, title })
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

export const getPost = ({ id, password }) => {
  return (dispatch) => {
    axios
      .get(API_URL + '/posts', { id, password })
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

export const editPost = ({ id, password }) => {
  return (dispatch) => {
    axios
      .get(API_URL + '/posts', { id, password })
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

export const deletePost = ({ id, password }) => {
  return (dispatch) => {
    axios
      .get(API_URL + '/posts', { id, password })
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
