import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getChats, createChat, deleteChat } from '../../services/api';

function Sidebar({ isOpen, toggleSidebar }) {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const { chatId } = useParams();

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      const chatList = await getChats();
      // API에서 lastUpdated가 포함된 채팅 목록을 받아옴
      setChats(chatList);
    } catch (error) {
      console.error('Error loading chats:', error);
    }
  };

  const addChat = async () => {
    try {
      const newChat = await createChat();
      setChats([...chats, newChat]);
      navigate(`/chat/${newChat.id}`);
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  const handleDeleteChat = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('이 채팅을 정말 삭제하시겠습니까?')) {
      try {
        await deleteChat(id);
        setChats(chats.filter(chat => chat.id !== id));
        if (id === chatId) {
          navigate('/');
        }
      } catch (error) {
        console.error('Error deleting chat:', error);
      }
    }
  };

  const formatChatDate = (dateString) => {
    if (!dateString) return '';  // 날짜 정보가 없는 경우 처리
    
    const date = new Date(dateString);
    // 잘못된 날짜인 경우 처리
    if (isNaN(date.getTime())) return '';
    
    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    // 현지 시간으로 변환
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    
    if (diffInDays === 0) {
      return `오늘 ${localDate.getHours().toString().padStart(2, '0')}:${localDate.getMinutes().toString().padStart(2, '0')}`;
    } else if (diffInDays === 1) {
      return '어제';
    } else if (diffInDays < 7) {
      return `${diffInDays}일 전`;
    } else {
      return `${localDate.getMonth() + 1}월 ${localDate.getDate()}일`;
    }
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="toggle-sidebar" onClick={toggleSidebar}>
        {isOpen ? '←' : '→'}
      </button>
      <h2>Chats</h2>
      <div className="sidebar-content">
        <ul className="chat-list">
          {chats.map(chat => (
            <li 
              key={chat.id} 
              className={`chat-item ${chat.id === chatId ? 'active' : ''}`}
            >
              <Link to={`/chat/${chat.id}`}>
                <div className="chat-info">
                  <span className="chat-name">{chat.name || 'New Chat'}</span>
                  <span className="chat-date">{formatChatDate(chat.lastUpdated)}</span>
                </div>
              </Link>
              <button 
                className="delete-chat-btn"
                onClick={(e) => handleDeleteChat(chat.id, e)}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button className="new-chat-btn" onClick={addChat}>새로운 채팅</button>
    </div>
  );
}

export default Sidebar;