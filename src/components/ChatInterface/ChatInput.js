import React, { useState, useEffect, useRef } from 'react';

function ChatInput({ onSendMessage, isLoading, hasImage }) {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current && inputRef.current.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((input.trim() || hasImage) && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input">
      <input
        type="text"
        ref={inputRef}
        value={input}
        onChange={handleInputChange}
        placeholder="메시지를 입력하세요..."
      />
      <button type="submit" disabled={isLoading || (!input.trim() && !hasImage)} className="send-button">
        전송
      </button>
    </form>
  );
}

export default ChatInput;