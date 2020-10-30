import React, { Component } from 'react';

// Import custom components
import ChatboxForm from '../components/Form/ChatboxForm';

class ChatboxContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ChatboxForm />;
  }
}

export default ChatboxContainer;