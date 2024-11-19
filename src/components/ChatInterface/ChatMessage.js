import React, { useEffect, useRef } from 'react';
import { markdownToHtml } from '../../utils/helpers';

function ChatMessage({ message }) {
  const messageRef = useRef(null);

  useEffect(() => {
    if (messageRef.current && window.MathJax) {
      if (window.MathJax.Hub) {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, messageRef.current]);
      } else if (window.MathJax.typeset) {
        window.MathJax.typeset([messageRef.current]);
      }
    }
  }, [message.content.text]);

  return (
    <div className={`chat-message ${message.type}`} ref={messageRef}>
      {message.content.images && message.content.images.length > 0 && (
        <div className="chat-images">
          {message.content.images.map((image, index) => (
            <img 
              key={index}
              src={image} 
              alt={`Uploaded ${index + 1}`} 
              className="chat-image" 
            />
          ))}
        </div>
      )}
      {message.content.text && (
        <div dangerouslySetInnerHTML={{ __html: markdownToHtml(message.content.text) }} />
      )}
    </div>
  );
}

export default ChatMessage;