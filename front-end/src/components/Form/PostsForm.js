import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import PostsTable from '../Table/PostsTable';
import PostsHeadBar from '../Header/PostHeadBar';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

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

function PostsForm(props) {
  const { errorMessage, posts, onLoad } = props;
  const classes = useStyles();
  
  useEffect(() => {
    onLoad();
  })

  return (
    <Container maxWidth="lg" className={classes.content}>
      <Grid item xs={12}>
        <PostsHeadBar />
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <PostsTable errorMessage={errorMessage} posts={posts}/>
        </Paper>
      </Grid>
    </Container>
  );
}

export default PostsForm;