import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
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
  const [room, setRoom] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const getAllRooms = async() => {
        const {
          data: {
            room
          }
        } = await axios.get('/room/5f8a9cf4e1b24b1d5f27cb94');

        setRoom(room);
    }

    getAllRooms();
    console.log(room);
  }, []);

  return (
    <Container maxWidth="md" className={classes.content}>
        <Paper elevation={3}>
            <MessageList />
        </Paper>
    </Container>
  );
}

export default (ChatboxForm);