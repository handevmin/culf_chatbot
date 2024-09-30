import { useState } from 'react';

function useChatbot() {
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://math-chatbot-bbebf43b55ca.herokuapp.com/ask-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setIsLoading(false);
      return data.response;
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
      return '죄송합니다. 메시지를 처리하는 동안 오류가 발생했습니다.';
    }
  };

  return { sendMessage, isLoading };
}

export default useChatbot;