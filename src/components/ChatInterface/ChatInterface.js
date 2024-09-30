import React, { useState, useEffect, useCallback } from 'react';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import ImageUpload from '../ImageUpload/ImageUpload';
import SelectedFile from './SelectedFile';
import { useLocation } from 'react-router-dom';
import { uploadImage, sendQuestion } from '../../services/api';

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const { initialQuestion } = location.state || {};

  useEffect(() => {
    if (initialQuestion) {
      handleSendMessage(initialQuestion);
    }
  }, []);

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
    
    // 즉시 이미지 미리보기 제거
    setSelectedFile(null);
    setImageData(null);

    try {
      const data = await sendQuestion(text, imageData);
      setMessages(prevMessages => [...prevMessages, { type: 'bot', content: { text: data.response } }]);
    } catch (error) {
      console.error('Error sending message:', error);
      let errorMessage = 'Error processing your request.';
      if (error.response) {
        errorMessage = `Server error: ${error.response.data.detail}`;
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your internet connection.';
      }
      setMessages(prevMessages => [...prevMessages, { type: 'bot', content: { text: errorMessage } }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = useCallback(async (file) => {
    setSelectedFile(file);
    try {
      const data = await uploadImage(file);
      setImageData(data.image_data);
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessages(prevMessages => [...prevMessages, { type: 'bot', content: { text: 'Failed to upload image. Please try again.' } }]);
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