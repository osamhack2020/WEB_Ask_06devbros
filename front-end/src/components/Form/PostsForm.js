import React, { useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import PostsTable from '../Table/PostsTable';
import PostsHeadBar from '../Header/PostHeadBar';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import { POSTS } from '../../constants/entity';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
    padding: 24,
    height: 'calc(100% - 56px)',
    marginTop: 28,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 32,
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

function isEmptyObject(param) {
  return Object.keys(param).length === 0 && param.constructor === Object;
}

function PostsForm(props) {
  const { errorMessage, onLoad } = props;
  const classes = useStyles();
  const [postss, setPostss] = React.useState({});

  useEffect(() => {
    async function getPosts(){
      const {
        data: {
          posts
        }
      } = await axios.get('/posts');
      setPostss(posts);
    }
    getPosts();
  }, []);

  const isLoading = (isEmptyObject(postss));

  return (
    <React.Fragment>
      { isLoading ?
        (
          <Container maxWidth="lg" className={classes.content}>
            isLoading...
          </Container>
        ) : 
        (<Container maxWidth="lg" className={classes.content}>
        <Grid item xs={12}>
          <PostsHeadBar />
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <PostsTable errorMessage={errorMessage} posts={postss}/>
          </Paper>
        </Grid>
      </Container>
        )
      };
    </React.Fragment>
  )
}

export default PostsForm;