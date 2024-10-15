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
              <Link to={`/chat/${chat.id}`}>{chat.name || 'New Chat'}</Link>
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