import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import {  useLocation } from "react-router-dom";
import { Field, reduxForm } from 'redux-form';

import renderText from '../Render/renderText';
import renderTextArea from '../Render/renderTextArea';
import CommentTable from '../Table/CommentTable';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(10),
      marginTop: theme.spacing(10),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    button: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(1.5),
        marginRight: theme.spacing(1.5),
        width: '25em',
        [theme.breakpoints.down('md')]: {
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            width: 'auto',
        },
    },
  }));

function PostReader(props) {
    const { addPost, handleSubmit } = props;
    let location = useLocation();
    console.log(location);
    useEffect(() => {

    }, [location]);
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
              <form onSubmit>
                <TextField
                 name="title" 
                 value={location.state.title} 
                 variant="outlined" 
                 margin="normal" 
                 required 
                 multiline 
                 fullWidth 
                 InputProps={{
                    readOnly: true
                  }}
                />
                <TextField
                 name="content"
                 rows={10}
                 value={location.state.content}
                 variant="outlined"
                 margin="normal" 
                 required 
                 multiline 
                 fullWidth 
                 InputProps={{
                    readOnly: true 
                  }}
                />
                <Grid item xs={12}>
                  <CommentTable id={location.state.id} />
                </Grid>
                <Field name="content" rows={5} component={renderTextArea} label="댓글을 입력해주세요." />
                <Grid item xs={12}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Icon></Icon>}
                >
                    댓글 달기
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    className={classes.button}
                    endIcon={<Icon></Icon>}
                >
                    수정하기
                </Button>
                </Grid>
            </form>
        </Paper>
    )
}

export default reduxForm({
  form:'PostReader'
})(PostReader);