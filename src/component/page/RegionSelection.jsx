import React from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

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

const Question = styled.div`
  font-size: 20px;
  font-family: "Pretendard-ExtraBold";
  color: #252A2F;
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

const RegionContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
`;

const Region = styled.div`
  width: 100%;
  height: 100px;
  margin: 10px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 10px;
  box-sizing: border-box;
  font-family: "Pretendard-ExtraBold";
  border: none;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  font-size: 15px;
`;

const SubText = styled.div`
  font-size: 15px;
  font-family: "Pretendard-SemiBold";
  color: #252A2F;
`;


const RegionSelection = () => {
  const navigate = useNavigate();

  const HandleTextClick = () => {
    navigate('/region');
  }

  return (
    <Container>
        <Question>여행을 떠나 볼까요?</Question>
        <Question>아래 지역은 어떠세요?</Question>
        <RegionContainer>
          <Region>추천 지역 1</Region>
          <Region>추천 지역 2</Region>
        </RegionContainer>
        <SubText>새로 고침</SubText>
        <SubText onClick={HandleTextClick}>여행지 직접 고르기</SubText>
        <Button>다음 질문</Button>
    </Container>
  );
};

export default RegionSelection;