import React, { useEffect, useRef } from 'react';

function ChatMessage({ message }) {
  const messageRef = useRef(null);

  useEffect(() => {
    if (messageRef.current) {
      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, messageRef.current]);
    }
  }, [message.content.text]);

  return (
    <div className={`chat-message ${message.type}`} ref={messageRef}>
      {message.content.image && (
        <img 
          src={message.content.image} 
          alt="Uploaded" 
          className="chat-image" 
        />
      )}
      {message.content.text && (
        <div dangerouslySetInnerHTML={{ __html: message.content.text }} />
      )}
    </div>
  );
}

export default ChatMessage;