import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createChat } from '../../services/api';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  const handleStartChat = async () => {
    try {
      const newChat = await createChat();
      navigate(`/chat/${newChat.id}`);
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="welcome-message">
          <img src={process.env.PUBLIC_URL + '/hong-pt-profile.png'} alt="듣는 선생님 홍PT" className="mascot" />
          <h1>여행 & 예술 큐레이터</h1>
          <br></br>
          <p>
            당신만의 특별한 여행을 설계하고, 예술의 세계로 안내해드립니다! 🌍✈️🎨
            <br></br>
            <br></br>
            숨겨진 명소부터 맞춤형 일정까지, 여행의 모든 것을 도와드리고,
            현대미술과 동시대미술에 대한 심도 있는 이야기를 들려드립니다.
            <br></br>
            <br></br>
            24시간 여러분의 여행과 예술 파트너가 되어, 새로운 경험을 함께 탐구해보아요! 🧳🏖️🖼️
          </p>
        </div>
        <button className="start-chat-btn" onClick={handleStartChat}>
           여행 & 예술 탐험 시작하기
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
