import React, { useState, useEffect } from 'react';
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FAFAFA;
  box-sizing: border-box;
`;

const LogoContainer = styled.div`
  margin-top: 8%;
  margin-bottom: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Message = styled.div`
  font-size: 17px;
  font-family: "Pretendard-ExtraBold";
  color: #252a2f;
  text-align: center;
  margin-bottom: 10px;
`;

const fadeInOut = keyframes`
  0%, 20%, 80%, 100% { opacity: 0; }
  30%, 70% { opacity: 1; }
`;

const EmojiWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 90px;
  margin-bottom: 90px;
`;

const Emoji = styled.div`
  font-size: 80px;
  font-family: "Pretendard-ExtraBold";
  color: #252a2f;
  text-align: center;
  animation: ${fadeInOut} 4s linear infinite;
`;

const emojis = ['✈️', '🚞', '🗽', '🚙', '🚀', '⛳️', '⛰️', '⛴️', '🚏', '🏝️', '🏔️', '🛥️'];

const TsEnd = () => {
  const navigate = useNavigate();
  const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmojiIndex((prevIndex) => (prevIndex + 1) % emojis.length);
    }, 4000); // Change emoji every 4 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkSurveyResponse = () => {
        const responseReceived = localStorage.getItem('surveyResponseReceived');
        if (responseReceived === 'true') {
            // 설문 응답 완료, 데이터를 처리하고 /selectroute로 이동
            localStorage.removeItem('surveyResponseReceived'); // 플래그 삭제
            navigate('/selectroute');
        } else {
            // 아직 응답이 도착하지 않은 경우 1초 후 다시 확인
            setTimeout(checkSurveyResponse, 1000);
        }
    };

    checkSurveyResponse(); // 처음 호출
}, [navigate]);

  return (
    <Container>
      <LogoContainer>
        <img style={{ width: "30%" }} 
          src={process.env.PUBLIC_URL + `asset/logo/simplelogo.png`}
          alt='logo' />
      </LogoContainer>
      <Box>
        <EmojiWrapper>
          <Emoji key={currentEmojiIndex}>{emojis[currentEmojiIndex]}</Emoji>
        </EmojiWrapper>
        <Message>여행 루트를 짜고 있어요!</Message>
        <Message>잠시만 기다려주세요</Message>
        <Message>화면을 나가지 마세요</Message>
      </Box>
    </Container>
  );
};

export default TsEnd;