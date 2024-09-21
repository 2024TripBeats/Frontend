import React, { useContext, useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { TravelSurveyContext } from './TsContext';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { addDays, differenceInDays } from 'date-fns';

const TsStep21 = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [intensity, setIntensity] = useState([]);
  const [isScrollable, setIsScrollable] = useState(false);

  const prices = {
    '2024-09-01': 100000,
    '2024-09-02': 75000,
    '2024-09-03': 32000,
    // 필요한 날짜별 데이터 추가
  };

  const isButtonActive = startDate && endDate && intensity.length === differenceInDays(endDate, startDate) + 1 && intensity.every(val => val !== '');

  useEffect(() => {
    const handleResize = () => {
      setIsScrollable(window.innerHeight < document.documentElement.scrollHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container isScrollable={isScrollable}>
      <LogoContainer>
        <img style={{ width: "30%" }} 
          src={process.env.PUBLIC_URL + `asset/logo/simplelogo.png`}
          alt='logo' />
      </LogoContainer>
      <ProgressContainer>
        <ProgressBarContainer>
          <Progress width={50} />
        </ProgressBarContainer>
        <StepText>1/2 단계</StepText>
      </ProgressContainer>
      <Question>항공편 조회를 위한</Question>
      <Question>정보를 입력해주세요</Question>
      <ButtonContainer>
        <BeforeButton onClick={() => navigate('/travelsurvey1')}>
          이전으로
        </BeforeButton>
        <Button 
          active={isButtonActive}
          onClick={() => isButtonActive && navigate('/travelsurvey5')}
        >
          다음으로
        </Button>
      </ButtonContainer>
    </Container>
  );
};

// 추가적인 스타일 정의
const PriceTag = styled.div`
  font-size: 8px;
  color: #909193;
  text-align: center;
  font-family: 'Pretendard-Regular';
  margin-top: 4px;
`;

export default TsStep21;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FAFAFA;
  box-sizing: border-box;
  margin-bottom: 70px;
`;

const LogoContainer = styled.div`
  margin-top: 8%;
  margin-bottom: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Question = styled.div`
  font-size: 18px;
  font-family: "Pretendard-ExtraBold";
  color: #252a2f;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  gap: 10%;
`;

const Button = styled.button`
  padding: 10px 40px;
  background-color: ${props => (props.active ? '#FF8A1D' : props.left ? '#FAFAFA' : '#848484')};
  border-radius: 20px;
  font-family: "Pretendard-ExtraBold";
  border: none;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  font-size: 13px;
  color: ${props => (props.left ? '#252a2f' : '#FAFAFA')};
  cursor: ${props => (props.active ? 'pointer' : 'not-allowed')};
  opacity: ${props => (props.active ? '1' : '0.5')};
`;

const BeforeButton = styled.button`
  padding: 10px 40px;
  background-color: #FAFAFA;
  border-radius: 20px;
  font-family: "Pretendard-ExtraBold";
  border: none;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  font-size: 13px;
  color: #252a2f;
  cursor: pointer;
`;

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  gap: 10px;
`;

const ProgressBarContainer = styled.div`
  width: 80%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
`;

const Progress = styled.div`
  width: ${props => props.width}%;
  height: 100%;
  background-color: #ff8a1d;
  border-radius: 10px;
  transition: width 0.3s ease-in-out;
`;

const StepText = styled.div`
font-size: 12px;
font-family: "Pretendard-Regular";
color: #252A2F;
text-align: center;
margin-bottom: 10px;
`;