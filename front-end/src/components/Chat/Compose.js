import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Compose.css';

const useStyles = makeStyles((theme) => ({
  message_list_container: {
      padding: '10px',
      paddingBottom: '70px',
      minHeight: '780px',
  },
  btn: {
      marginLeft: theme.spacing(2),
  },
  input: {
    width: '780px',
  }
}));

export default function Compose(props) {
  const classes = useStyles();
    return (
      <div className="compose">
       <TextField
          id="standard-textarea"
          placeholder="메세지를 입력해주세요"
          multiline
          className={classes.input}
        />

        <Button
          variant="contained"
          color="primary"

          className={classes.btn}
        >
          보내기
            </Button>
      </div>
    );
}