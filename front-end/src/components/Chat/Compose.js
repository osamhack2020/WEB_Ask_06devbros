import React, { useState } from 'react';
import io from 'socket.io-client';
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


const Compose = (props) => {
  const classes = useStyles();
  const socket = io.connect('https://f6672ab4-60b5-4180-95f5-fc49d1c31243-3000.app.online.visualstudio.com/#/chat', { 
    path: '/socket.io',
  });

  socket.on('connect', () => {
    console.log("connection success1111!");
    socket.emit('joinRoom', '5f917590c7c1ab0a96f4298c');
    }
  )
  
  socket.on('chat', function (chat) {
    console.log("connection success2222!");
  
    //function example
    //이때 chat은 ai를 통해 답변된 String data
    console.log(chat);  
    // const li = document.createElement('li');
    // li.textContent = chat;
    // document.getElementById('chat_group').appendChild(li);
  });



  useState(() => {

  }, [])

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

export default Compose;