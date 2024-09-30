import React from 'react';
import ChatMessage from './ChatMessage';

function ChatHistory({ messages }) {
  return (
    <div className="chat-history">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </div>
  );
}

export default ChatHistory;