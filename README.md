# 수학 도우미 챗봇

## 프로젝트 소개
수학 도우미 챗봇은 학생들이 수학 문제를 해결하고 개념을 이해하는 데 도움을 주는 대화형 애플리케이션입니다. React를 기반으로 개발되었으며, 사용자 친화적인 인터페이스를 제공합니다.

## 주요 기능
- 수학 관련 질문에 대한 실시간 답변
- 이미지 업로드 기능을 통한 문제 제출
- 수학 공식을 위한 LaTeX 렌더링
- 반응형 디자인으로 다양한 디바이스 지원

## 시작하기

### 사전 요구사항
- Node.js (v14 이상)
- npm (v6 이상)

### 설치
1. 저장소를 클론합니다:
   ```
   git clone https://github.com/handevmin/math-chatbot.git
   ```
2. 프로젝트 디렉토리로 이동합니다:
   ```
   cd math-chatbot
   ```
3. 의존성을 설치합니다:
   ```
   npm install
   ```

### 실행
개발 서버를 실행합니다:
```
npm start
```
브라우저에서 `http://localhost:3000`으로 접속하여 애플리케이션을 확인할 수 있습니다.

## 프로젝트 구조
- `/public`: 정적 파일
- `/src`: 소스 코드
  - `/components`: React 컴포넌트
  - `/services`: API 통신 관련 서비스
  - `/styles`: CSS 스타일
  - `/utils`: 유틸리티 함수

## 기술 스택
- React
- React Router
- MathJax (수학 공식 렌더링)
- CSS (스타일링)

## 기여하기
프로젝트에 기여하고 싶으시다면 다음 단계를 따라주세요:
1. 프로젝트를 포크합니다.
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/AmazingFeature`).
3. 변경사항을 커밋합니다 (`git commit -m 'Add some AmazingFeature'`).
4. 브랜치에 푸시합니다 (`git push origin feature/AmazingFeature`).
5. Pull Request를 생성합니다.