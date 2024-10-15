import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import ImageUpload from '../ImageUpload/ImageUpload';
import SelectedFile from './SelectedFile';
import { uploadImage, sendQuestion, getChatHistory, createChat } from '../../services/api';

function ChatInterface() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const initializeChat = async () => {
      if (chatId) {
        await loadChatHistory(chatId);
      } else {
        const newChat = await createChat();
        navigate(`/chat/${newChat.id}`, { replace: true });
      }
    };

    initializeChat();
  }, [chatId, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadChatHistory = async (id) => {
    try {
      setIsLoading(true);
      const history = await getChatHistory(id);
      if (history && history.messages) {
        setMessages(history.messages.map(msg => ({
          type: msg.role === 'user' ? 'user' : 'bot',
          content: { text: msg.content }
        })));
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
      setError('채팅 기록을 불러오는 데 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (text) => {
    if ((!text.trim() && !imageData) || isLoading) return;

    let newMessage = { 
      type: 'user', 
      content: { 
        text,
        image: selectedFile ? URL.createObjectURL(selectedFile) : null
      } 
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setIsLoading(true);
    setError(null);
    
    setSelectedFile(null);
    setImageData(null);

    const sendMessageWithRetry = async (retries = 3) => {
      try {
        const data = await sendQuestion(text, imageData, chatId);
        setMessages(prevMessages => [...prevMessages, { type: 'bot', content: { text: data.response } }]);
      } catch (error) {
        console.error('Error sending message:', error);
        if (retries > 0) {
          setTimeout(() => sendMessageWithRetry(retries - 1), 1000);
        } else {
          setError('메시지 전송에 실패했습니다. 다시 시도해 주세요.');
          setMessages(prevMessages => prevMessages.slice(0, -1));
        }
      } finally {
        setIsLoading(false);
      }
    };

    sendMessageWithRetry();
  };

  const handleFileSelect = useCallback(async (file) => {
    setSelectedFile(file);
    try {
      const data = await uploadImage(file);
      setImageData(data.image_data);
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('이미지 업로드에 실패했습니다. 다시 시도해 주세요.');
      setSelectedFile(null);
      setImageData(null);
    }
  }, []);

  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
    setImageData(null);
  }, []);

  return (
    <div className="chat-page">
      <div className="chat-interface">
        <ChatHistory messages={messages} />
        <div ref={messagesEndRef} />
        {error && <div className="error-message">{error}</div>}
        <div className="input-area">
          {selectedFile && (
            <SelectedFile file={selectedFile} onRemove={handleRemoveFile} />
          )}
          <div className="input-container">
            <ImageUpload onFileSelect={handleFileSelect} />
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;
