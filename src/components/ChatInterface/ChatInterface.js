import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import ImageUpload from '../ImageUpload/ImageUpload';
import SelectedFiles from './SelectedFiles';
import { uploadImage, sendQuestion, getChatHistory, createChat } from '../../services/api';

function ChatInterface() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageDataArray, setImageDataArray] = useState([]);
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
    if ((!text.trim() && imageDataArray.length === 0) || isLoading) return;

    let newMessage = { 
      type: 'user', 
      content: { 
        text: text.trim(),
        images: selectedFiles ? selectedFiles.map(file => URL.createObjectURL(file)) : []
      } 
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setIsLoading(true);
    setError(null);
    
    const sendMessageWithRetry = async (retries = 3) => {
      try {
        const data = await sendQuestion(text.trim(), imageDataArray, chatId);
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
        setSelectedFiles([]);
        setImageDataArray([]);
      }
    };

    sendMessageWithRetry();
  };

  const handleFileSelect = useCallback(async (file) => {
    if (selectedFiles.length >= 5) { // 최대 5개 이미지로 제한
      alert('최대 5개의 이미지만 업로드할 수 있습니다.');
      return;
    }

    setSelectedFiles(prev => [...prev, file]);
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageDataArray(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing image:', error);
      setError('이미지 처리에 실패했습니다. 다시 시도해 주세요.');
    }
  }, [selectedFiles]);

  const handleRemoveFile = useCallback((index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setImageDataArray(prev => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div className="chat-page">
      <div className="chat-interface">
        <ChatHistory messages={messages} />
        <div ref={messagesEndRef} />
        {error && <div className="error-message">{error}</div>}
        <div className="input-area">
          {selectedFiles.length > 0 && (
            <SelectedFiles files={selectedFiles} onRemove={handleRemoveFile} />
          )}
          <div className="input-container">
            <ImageUpload onFileSelect={handleFileSelect} />
            <ChatInput 
              onSendMessage={handleSendMessage} 
              isLoading={isLoading} 
              hasImage={selectedFiles.length > 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;