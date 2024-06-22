import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { UserSurveyProvider } from './component/page/UserSurvey/UsContext'; // 수정된 SurveyContext import

import Home from './component/page/Home';
import MyPage from './component/page/MyPage';
import Footer from './component/ui/Footer';
import InitialPage from './component/page/InitialPage';
import LoginHandeler from './component/page/LoginHandeler';
import RegionSelection from './component/page/RegionSelection';
import MapSelection from './component/page/MapSelection';

// 유저 설문 조사 페이지
import UsStep1 from './component/page/UserSurvey/UsStep1';
import UsStep2 from './component/page/UserSurvey/UsStep2';
import UsStep3 from './component/page/UserSurvey/UsStep3';
import UsEnd from './component/page/UserSurvey/UsEnd';
import SurveySummary from './component/page/UserSurvey/SurveySummary'; //임시 정보 확인 페이지

const AllGlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard-ExtraBold';
    src: url('/font/Pretendard-ExtraBold.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('/font/Pretendard-Regular.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Pretendard-Bold';
    src: url('/font/Pretendard-Bold.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Pretendard-Light';
    src: url('/font/Pretendard-Light.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Pretendard-SemiBold';
    src: url('/font/Pretendard-SemiBold.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Pretendard-Medium';
    src: url('/font/Pretendard-Medium.ttf') format('truetype');
  }
  @font-face {
    font-family: 'alagambe';
    src: url('/font/alagambe.otf') format('opentype');
  }
 `;

const WebContainer = styled.div`
  display: flex;
  background-color: #fafafa;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const App = () => {
  useEffect(() => {
    const setViewportHeight = () => {
      // window.innerHeight의 1%를 vh 단위로 계산하여, CSS 변수 --vh에 vh 값을 설정
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewportHeight();
    // 리사이즈 이벤트에 setViewportHeight 함수를 연결
    window.addEventListener('resize', setViewportHeight);

    // 클린업 함수: 컴포넌트가 언마운트될 때 리사이즈 이벤트 리스너를 제거
    return () => {
      window.removeEventListener('resize', setViewportHeight);
    };
  }, []);

  return (
    <Router>
      <AllGlobalStyle />
      <WebContainer>
        <AppContainer>
          <Content>
            <Routes>
              <Route path="/" element={<InitialPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/usersurvey1" element={
                <UserSurveyProvider>
                  <UsStep1 />
                </UserSurveyProvider>
              } />
              <Route path="/usersurvey2" element={
                <UserSurveyProvider>
                  <UsStep2 />
                </UserSurveyProvider>
              } />
              <Route path="/usersurvey3" element={
                <UserSurveyProvider>
                  <UsStep3 />
                </UserSurveyProvider>
              } />
              <Route path="/survey-summary" element={
                <UserSurveyProvider>
                  <SurveySummary />
                </UserSurveyProvider>
              } />
              <Route path="/usersurveyend" element={<UsEnd />} />
              <Route path="/regionselection" element={<RegionSelection />} />
              <Route path="/login/oauth2/callback/kakao" element={<LoginHandeler />} />
              <Route path="/mapselection" element={<MapSelection />} />
            </Routes>
          </Content>
          <FooterWithCondition />
        </AppContainer>
      </WebContainer>
    </Router>
  );
};

const FooterWithCondition = () => {
  const location = useLocation();
  const showFooterPaths = ["/home", "/mypage"]; // Footer가 보일 경로를 여기에 추가

  return showFooterPaths.includes(location.pathname) ? <Footer /> : null;
};

export default App;