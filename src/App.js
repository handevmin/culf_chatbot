import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import ChatInterface from './components/ChatInterface/ChatInterface';
import Sidebar from './components/Sidebar/Sidebar';
import 'katex/dist/katex.min.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="App">
        <Sidebar 
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route 
              path="/chat/:chatId?" 
              element={<ChatInterface />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;