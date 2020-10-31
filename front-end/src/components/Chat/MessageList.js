import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import io from 'socket.io-client';
import axios from 'axios';
import Toolbar from './Toolbar';
import ToolbarButton from './ToolbarButton';
import Message from './Message';
import moment from 'moment';

const MY_USER_ID = 'apple';

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
        marginLeft: theme.spacing(2),
    },
    compose: {
        paddingBottom: theme.spacing(1),
    }
}));

function createMessage(id, author, message, timestamp) {
    return { id, author, message, timestamp }
}

const tempMessages = [
    {
        id: 1,
        author: 'AI',
        message: '우리나라를 위해 힘쓰시는 장병분들 반갑습니다. 물어봐 AI 챗봇입니다. 어떤 고민이 있으신가요?',
        timestamp: new Date().getTime()
    }
]

function MessageList(props) {
    const classes = useStyles();
    const [messages, setMessages] = useState([])
    const [chat, setChat] = useState(null);
    const [content, setContent] = useState(null);
    let id = 2;
    const handleContentChange = (event) => {
      setContent(event.target.value);
    };

    useEffect(() => {
        getMessages();
    }, [])

    const onSubmitContent = async () => {
        const { 
            data: {
                chat
            }
        } = await axios.post('/room/5f917590c7c1ab0a96f4298c/chat',
          { chat: content} );

          setContent('');
          
          const obj = createMessage(id, MY_USER_ID, chat.chat, new Date().getTime());
          messages.push(obj);
          console.log(messages);
          setMessages([...messages]);
      };

      const socket = io.connect('/chat', { 
        path: '/socket.io',
      });
    
      socket.on('connect', () => {
        socket.emit('joinRoom', '5f917590c7c1ab0a96f4298c');
        }
      )
    
      socket.on('chat', (chat) => {
        const obj = createMessage(id, 'AI', chat.replyChat, new Date().getTime());
            if(messages.length != 0){
                if(messages[messages.length-1].author != obj.author){
                    messages.push(obj);
                    setMessages([...messages]);
                }
            }
      });

    socket.on('disconnect', () => {
        socket.emit('disconnect', '5f917590c7c1ab0a96f4298c');
    });

    const getMessages = () => {
        setMessages([...messages, ...tempMessages])
    }

    const renderMessages = () => {
        let i = 0;
        let messageCount = messages.length;
        let tempMessages = [];

        while (i < messageCount) {
            let previous = messages[i - 1];
            let current = messages[i];
            let next = messages[i + 1];
            let isMine = current.author === MY_USER_ID;
            let currentMoment = moment(current.timestamp);
            let prevBySameAuthor = false;
            let nextBySameAuthor = false;
            let startsSequence = true;
            let endsSequence = true;
            let showTimestamp = true;

            if (previous) {
                let previousMoment = moment(previous.timestamp);
                let previousDuration = moment.duration(currentMoment.diff(previousMoment));
                prevBySameAuthor = previous.author === current.author;

                if (prevBySameAuthor && previousDuration.as('hours') < 1) {
                    startsSequence = false;
                }

                if (previousDuration.as('hours') < 1) {
                    showTimestamp = false;
                }
            }

            if (next) {
                let nextMoment = moment(next.timestamp);
                let nextDuration = moment.duration(nextMoment.diff(currentMoment));
                nextBySameAuthor = next.author === current.author;

                if (nextBySameAuthor && nextDuration.as('hours') < 1) {
                    endsSequence = false;
                }
            }

            tempMessages.push(
                <Message
                    key={i}
                    isMine={isMine}
                    startsSequence={startsSequence}
                    endsSequence={endsSequence}
                    showTimestamp={showTimestamp}
                    data={current}
                />
            );

            // Proceed to the next message.
            i += 1;
        }

        return tempMessages;
    }

    return (
        <div className="message-list">
            <Toolbar
                title="AI 고민 상담 대화방"
                rightItems={[
                    <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
                    <ToolbarButton key="video" icon="ion-ios-videocam" />,
                    <ToolbarButton key="phone" icon="ion-ios-call" />
                ]}
            />

            <div className={classes.message_list_container}>{renderMessages()}</div>

            <div className={classes.compose}>
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
        </div>
    );
}

export default MessageList;