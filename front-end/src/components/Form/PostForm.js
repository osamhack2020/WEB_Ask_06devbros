import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import PostWriter from '../Paper/postWriter';
import PostReader from '../Paper/postReader';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    width: '912px',
    [theme.breakpoints.down('md')]: {
      marginLeft: theme.spacing(),
      width: 'auto',
    },
  },
}));

const identifyForm = (props) => {
  const { path, id, addPost, editPost, deletePost } = props;

  if(path === "/posts/write"){
    return (
      <PostWriter addPost={addPost}/>
    );
  }else if(path === "/posts/:id/edit"){
    return (
      <PostWriter editPost={editPost} deletePost={deletePost}/>
    );
  }else if(path === "/posts/:id"){
    return (
      <PostReader/>
    );
  }
}

function PostForm(props) {
  const { path, id, errorMessage, addPost, editPost, deletePost } = props;
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.content}>
      <Grid container>
        <Grid item xs={12}>
          {identifyForm({path, id, addPost, editPost, deletePost})}
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.button}
            endIcon={<Icon></Icon>}
          >
            <Link to="/" style={{textDecoration:"none", color:"white"}}>     
              뒤로 가기
            </Link>
      </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PostForm;