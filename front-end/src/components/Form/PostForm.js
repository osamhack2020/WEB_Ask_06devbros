import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  button: {
    margin: theme.spacing(1),
    width: '100px',
  },
}));

function PostsForm(props) {
  const { handleClick, onClick, errorMessage, products } = props;
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.content}>
        <Paper className={classes.paper}>
          
        </Paper>
        <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
        >
        글 올리기
      </Button>
    </Container>
  );
}

export default PostsForm;