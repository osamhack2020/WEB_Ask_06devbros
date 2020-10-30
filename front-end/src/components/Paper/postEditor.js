import React, { useEffect } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Field, reduxForm } from 'redux-form';
import {  useLocation } from "react-router-dom";

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

const PostEditor = (props) => {
    const { editPost } = props;
    const [title, setTitle] = React.useState(null);
    const [content, setContent] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const classes = useStyles();

    let location = useLocation();
    const id = location.pathname.slice(7, location.pathname.length - 5);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = () => {
        console.log(id);
        axios.put(`/posts/${id}`, { title, content })
    }

    useEffect(() => {
        const getPostById = async () => {
          const { 
            data: { 
              post
            }
          } = await axios.get(`/posts/${id}`);
          setTitle(post.title);
          setContent(post.content);
          setIsLoading(false);
        }
  
        getPostById();
      }, []);

    return (
        <Paper className={classes.paper} elevation={3}>

            { isLoading ?
                (
                    <div>isLoading...</div>
                ) :
                (
                <form onSubmit={handleSubmit}>
                <TextField
                 name="title" 
                 value={title}
                 label="제목" 
                 onChange={handleTitleChange}
                 variant="outlined" 
                 margin="normal" 
                 required 
                 multiline 
                 fullWidth 
                />
                <TextField
                 name="content"
                 rows={10}
                 value={content}
                 label="내용"
                 onChange={handleContentChange}
                 variant="outlined"
                 margin="normal" 
                 required 
                 multiline 
                 fullWidth 
                />
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            endIcon={<Icon></Icon>}
                        >
                            글 수정
                        </Button>

                        <Button
                            variant="contained"
                            color="default"
                            className={classes.button}
                            endIcon={<Icon></Icon>}
                        >
                            글 삭제
                        </Button>
                    </Grid>
                </form>
                )
            }

        </Paper>
    )
}

export default reduxForm({
    form:'PostEditor'
})(PostEditor);