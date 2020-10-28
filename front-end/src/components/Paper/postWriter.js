import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { Field, reduxForm } from 'redux-form';

import renderText from '../Render/renderText';
import renderTextArea from '../Render/renderTextArea';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(10),
      marginTop: theme.spacing(10),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    button: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: '54em',
        [theme.breakpoints.down('md')]: {
            marginLeft: theme.spacing(),
            width: 'auto',
        },
    },
  }));

const PostWriter = (props) => {
    const { handleSubmit, addPost } = props;
    const classes = useStyles();
    return (
        <Paper className={classes.paper} elevation={3}>

            <form onSubmit={handleSubmit(addPost)}>
                <Field type="text" name="title" component={renderText} label="제목을 입력해주세요."/>
                <Field name="content" rows={20} component={renderTextArea} label="내용을 입력해주세요." />
                <Grid item xs={12}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Icon></Icon>}
                >
                    글 작성
                </Button>
                </Grid>
            </form>
        </Paper>
    )
}

export default reduxForm({
    form:'PostWriter'
})(PostWriter);