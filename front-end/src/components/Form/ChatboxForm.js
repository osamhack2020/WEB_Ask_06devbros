import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import CustomizedSnackbar from '../SnakeBar/CustomizedSnackbar';
import renderText from '../Render/renderText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';
import MessageList from '../Chat/MessageList';

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
}));

function ChatboxForm(props) {
  const { handleSubmit, onSubmit, errorMessage } = props;
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.content}>
        <Paper elevation={3}>
            <MessageList />
        </Paper>
    </Container>
  );
}

export default (ChatboxForm);