import React, { useContext, useState, useRef } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserSurveyContext } from './UsContext';

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
  font-size: 15px;
  font-family: "Pretendard-ExtraBold";
  color: #252a2f;
  text-align: center;
  margin-bottom: 10px;
`;

const Emoji = styled.div`
  font-size: 80px;
  font-family: "Pretendard-ExtraBold";
  color: #252a2f;
  text-align: center;
  margin-top: 80px;
  margin-bottom: 40px;
`;


const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 25px 60px;
  background-color: #3869E0;
  border-radius: 20px;
  font-family: "Pretendard-ExtraBold";
  border: none;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  font-size: 13px;
  color: #FAFAFA;
  margin-top: 100px;
`;

const UsEnd = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
      navigate('/home');
  };

  return (
    <Container>
      <LogoContainer>
        <img style={{ width: "30%" }} 
          src={process.env.PUBLIC_URL + `asset/logo/simplelogo.png`}
          alt='logo' />
      </LogoContainer>
      <Box>
        <Emoji>👏</Emoji>
        <Message>설문이 마무리 되었어요</Message>
        <Message>참여해주셔서 감사합니다!</Message>
        <Button 
            onClick={handleNavigate}
        >
            서비스 시작하기
        </Button>
      </Box>
    </Container>
  );
};

export default UsEnd;