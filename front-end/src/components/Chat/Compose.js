import React from 'react';
import './Compose.css';

export default function Compose(props) {
    return (
      <div className="compose">
        <input
          type="text"
          className="compose-input"
          placeholder="메세지를 입력해주세요"
        />

        {
          props.rightItems
        }
      </div>
    );
}