import React from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding-top: 15%;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #D3E8F7;
    box-sizing: border-box;
`;

const Title = styled.div`
  font-size: 25px;
  font-family: "Pretendard-ExtraBold";
  color: #252A2F;
  text-align: center;
`;

const AdContainer = styled.div`
  margin-top: 20%;
  display: flex;
  background-color: white;
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 85%;
  height: 200px;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: auto;
  height: 30px;
  margin: 10px;
  background-color: #ffffff;
  border-radius: 20px;
  font-family: "Pretendard-ExtraBold";
  border: none;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  font-size: 15px;
  color: #6d9bca;
`;

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/regionselection");
  }

  return (
    <Container>
        <Title>TRIPBEATS</Title>
        <AdContainer>ad</AdContainer>
        <Button onClick={handleButtonClick}>여행 루트 추천받기</Button>
    </Container>
  );
};

export default Home;