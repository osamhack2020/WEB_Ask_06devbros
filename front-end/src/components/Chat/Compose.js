import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
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
  const [chat, setChat] = useState(null);
  const [content, setContent] = useState(null);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const onSubmitContent = async () => {
    const chat = await axios.post('https://f6672ab4-60b5-4180-95f5-fc49d1c31243-3000.app.online.visualstudio.com/room/5f917590c7c1ab0a96f4298c/chat',
      { chat: content} );
      setChat(chat);
      setContent('');
      console.log(chat)
  };

  // useEffect( () => {
  //   const getChat = async () => {
  //     const chat = await axios.post('https://f6672ab4-60b5-4180-95f5-fc49d1c31243-3000.app.online.visualstudio.com/room/5f917590c7c1ab0a96f4298c/chat',
  //     { chat: content} );
  //     setChat('');
  //   }
  //   getChat();
  // })

  const socket = io.connect('https://f6672ab4-60b5-4180-95f5-fc49d1c31243-3000.app.online.visualstudio.com/#/chat', { 
    path: '/socket.io',
  });

  socket.on('connect', () => {
    socket.emit('joinRoom', '5f917590c7c1ab0a96f4298c');
    }
  )
  console.log(socket);
  socket.on('chat', (chat) => {
    console.log("connection success2222!");
    console.log(chat);  
  });


    return (
      <div className="compose">
       <TextField
          id="standard-textarea"
          placeholder="메세지를 입력해주세요"
          multiline
          className={classes.input}
          value={content}
          onChange={handleContentChange}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={onSubmitContent}
          className={classes.btn}
        >
          보내기
        </Button>
      </div>
    );
}

export default Compose;