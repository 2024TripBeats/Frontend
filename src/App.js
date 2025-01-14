import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { UserSurveyProvider } from './component/page/UserSurvey/UsContext';
import { TravelSurveyProvider } from './component/page/TravelSurvey/TsContext';


// 초기 화면 및 로그인 핸들러 페이지
import InitialPage from './component/page/InitialPage';
import LoginHandeler from './component/page/LoginHandeler';

// 메인 페이지 및 마이페이지
import Home from './component/page/Home';
import MyPage from './component/page/MyPage';
import Footer from './component/ui/Footer';

// 커뮤니티
import Community from './component/page/Community/Community';
import CommunityWrite from './component/page/Community/CommunityWrite';
import CommunityPost from './component/page/Community/CommunityPost';

// 유저 설문 조사 페이지
import UsStep1 from './component/page/UserSurvey/UsStep1';
import UsStep2 from './component/page/UserSurvey/UsStep2';
import UsStep3 from './component/page/UserSurvey/UsStep3';
import UsStep4 from './component/page/UserSurvey/UsStep4';
import UsStep5 from './component/page/UserSurvey/UsStep5';
import UsEnd from './component/page/UserSurvey/UsEnd';
import UsSummary from './component/page/UserSurvey/UsSummary'; //임시 정보 확인 페이지

// 여행 설문 조사 페이지
import Destination from './component/page/TravelSurvey/Destination';
import Airport from './component/page/TravelSurvey/Airport';
import SelectDate from './component/page/TravelSurvey/SelectDate';
import Intensity from './component/page/TravelSurvey/Intensity';
import Accomodation from './component/page/TravelSurvey/Accomodation';
import RestCafe from './component/page/TravelSurvey/RestCafe';
import PreferLocation from './component/page/TravelSurvey/PreferLocation';
import StopRequire from './component/page/TravelSurvey/StopRequire';
import TsEnd from './component/page/TravelSurvey/TsEnd';

// 추천 페이지
import RouteRecommend from './component/page/RouteRecommend';
import DetailPage from './component/page/DetailPage';
import RouteFix from './component/page/RouteFix';
import SelectRoute from './component/page/SelectRoute';

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
  background-color: #FAFAFA;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-color: #fafafa;
  min-height: 100vh;
  width: 100%;
  max-width: 550px;
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
      <UserSurveyProvider>
        <TravelSurveyProvider>
          <WebContainer>
            <AppContainer>
              <Content>
                <Routes>
                  <Route path="/" element={<InitialPage />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/mypage" element={<MyPage />} />
                  <Route path="/usersurvey1" element={<UsStep1 />} />
                  <Route path="/usersurvey2" element={<UsStep2 />} />
                  <Route path="/usersurvey3" element={<UsStep3 />} />
                  <Route path="/usersurvey4" element={<UsStep4 />} />
                  <Route path="/usersurvey5" element={<UsStep5 />} />
                  <Route path="/us-summary" element={<UsSummary />} />
                  <Route path="/usersurveyend" element={<UsEnd />} />

                  <Route path="/destination" element={<Destination />} />
                  <Route path="/airport" element={<Airport />} />
                  <Route path="/selectdate" element={<SelectDate />} />
                  <Route path="/intensity" element={<Intensity />} />
                  <Route path="/accomodation" element={<Accomodation />} />
                  <Route path="/restcafe" element={<RestCafe />} />
                  <Route path="/stoprequire" element={<StopRequire />} />
                  <Route path="/preferlocation" element={<PreferLocation />} />
                  <Route path="/travelsurveyend" element={<TsEnd />} />
                  <Route path="/recommend" element={<RouteRecommend />} />
                  <Route path="/routefix" element={<RouteFix />} />
                  <Route path="/detail/:placeId" element={<DetailPage />} />
                  <Route path="/login/oauth2/callback/kakao" element={<LoginHandeler />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/write" element={<CommunityWrite />} />
                  <Route path="/post/:postId" element={<CommunityPost />} />
                  <Route path="/selectroute" element={<SelectRoute />} />
                </Routes>
              </Content>
              <FooterWithCondition />
            </AppContainer>
          </WebContainer>
        </TravelSurveyProvider>
      </UserSurveyProvider>
    </Router>
  );
};

const FooterWithCondition = () => {
  const location = useLocation();
  const showFooterPaths = ["/home", "/mypage", "/community"]; // Footer가 보일 경로를 여기에 추가

  return showFooterPaths.includes(location.pathname) ? <Footer /> : null;
};

export default App;