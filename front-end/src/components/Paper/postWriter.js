import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
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
        margin: theme.spacing(1),
        width: '400px',
    },
  }));

const PostWriter = (props) => {
    const { handleSubmit } = props;
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <form onSubmit>
                <Field type="text" name="title" component={renderText} label="제목을 입력해주세요."/>
                <Field type="textArea" name="content" rows={20} component={renderTextArea} label="내용을 입력해주세요." />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Icon>send</Icon>}
                >
                    글 작성
                </Button>
            </form>
        </Paper>
    )
}

export default reduxForm({
    form:'PostWriter'
})(PostWriter);