import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
  }));

function PostReader(props) {
    const { addPost } = props;
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>

        </Paper>
    )
}

export default PostReader;