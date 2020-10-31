import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Compose from './Compose';
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
    }
}));

const tempMessages = [
    {
        id: 1,
        author: 'orange',
        message: '우리나라를 위해 힘쓰시는 장병분들 반갑습니다. 물어봐 AI 챗봇입니다. 어떤 고민이 있으신가요?',
        timestamp: new Date().getTime()
    },
    {
        id: 2,
        author: 'apple',
        message: '요즘 선임 분중에 한 분이 저를 계속 괴롭히고 있어요...',
        timestamp: new Date().getTime()
    },
    {
        id: 3,
        author: 'orange',
        message: '어떻게 괴롭힘 당하고 있나요?',
        timestamp: new Date().getTime()
    },
]

function MessageList(props) {
    const classes = useStyles();
    const [messages, setMessages] = useState([])

    useEffect(() => {
        getMessages();
    }, [])

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

            <Compose />
        </div>
    );
}

export default MessageList;