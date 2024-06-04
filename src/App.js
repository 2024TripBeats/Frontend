import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { createGlobalStyle } from "styled-components";

import Home from './component/page/Home';
import MyPage from './component/page/MyPage';
import Footer from './component/ui/Footer';
import styled from "styled-components";
import InitialPage from './component/page/InitialPage';
import LoginHandeler from './component/page/LoginHandeler';
import UserSurvey from './component/page/UserSurvey';
import TasteSurvey from './component/page/TasteSurvey';
import RegionSelection from './component/page/RegionSelection';
import MapSelection from './component/page/MapSelection';

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
      <AppContainer>
        <Content>
          <Routes>
            <Route path="/" element={<InitialPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/usersurvey" element={<UserSurvey />} />
            <Route path="/tastesurvey" element={<TasteSurvey />} />
            <Route path="/regionselection" element={<RegionSelection />} />
            <Route
              path="/login/oauth2/callback/kakao"
              element={<LoginHandeler />}
            />
            <Route path="/mapselection" element={<MapSelection />} />
          </Routes>
        </Content>
        <FooterWithCondition />
      </AppContainer>
    </Router>
  );
};

const FooterWithCondition = () => {
  const location = useLocation();
  const noFooterPaths = ["/", "/usersurvey", "/tastesurvey", "/regionselection"]; // 여기에 Footer가 보이지 않을 경로를 추가하면 됨

  return !noFooterPaths.includes(location.pathname) ? <Footer /> : null;
};

export default App;