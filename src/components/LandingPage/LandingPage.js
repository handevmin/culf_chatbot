import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="welcome-message">
          <img src={process.env.PUBLIC_URL + '/hong-pt-profile.png'} alt="듣는 선생님 홍PT" className="mascot" />
          <h1>여행 큐레이터</h1>
          <br></br>
          <p>
            당신만의 특별한 여행을 설계해드립니다! 🌍✈️
            <br></br>
            <br></br>
            숨겨진 명소부터 맞춤형 일정까지, 여행의 모든 것을 도와드릴게요.
            <br></br>
            <br></br>
            24시간 여러분의 여행 파트너가 되어드릴게요! 🧳🏖️
          </p>
        </div>
        <button className="start-chat-btn" onClick={() => navigate('/chat')}>
          여행 계획 시작하기
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
