import React from 'react';
import Avatar from '@material-ui/core/Avatar';
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
import Copyright from './Copyright';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://lh3.googleusercontent.com/proxy/3uA1zR1WKV-JhzX1vzxEhvLhM8R6WYTpRybdhHTnCz9mZlaahQll0hZqRa5A2EFlmpYTIxwUh8xQCT9FM5I5E0sZ8gNorCkB8UlhUxeqhVaB51BInjv1VHFf79S_WuRD8Gx9e28EcaRrPsG4mlfaRn1TKnsKXHy8y7J4AJy4VxIxEhSdxyr7wm86N3D4m5qi5uYO9G5OSjXVhfcooZJI_lDE2gXuYicXglooXei4Jw9bKMI3M7PDIR6ySsNfUynY9ScXi8tJ3OFHO6KAuT0vD2fFqNfciIhCYefXKs_BHYInfMKn0zG2QnihUkNkMg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginForm(props) {
  const { handleSubmit, onSubmit, errorMessage } = props;
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          {errorMessage && (
            <CustomizedSnackbar variant="error" className={classes.margin} message={errorMessage} />
          )}
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Field type="text" name="username" component={renderText} label="아이디" />
            <Field type="password" name="password" component={renderText} label="비밀번호" />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="계정 기억하기"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              로그인
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  비밀번호를 잊으셨나요?
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

const validateLogin = (values) => {
  const errors = {};

  const requiredFields = ['username', 'password'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = '(The ' + field + ' field is required.)';
    }
  });

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = '(Invalid email address.)';
  }
  return errors;
};

export default reduxForm({
  form: 'LoginForm', // a unique identifier for this form
  validate: validateLogin, // ←Callback function for client-side validation
})(LoginForm);