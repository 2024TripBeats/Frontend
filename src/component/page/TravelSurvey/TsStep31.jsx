import React, { useContext, useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { TravelSurveyContext } from './TsContext';
import { differenceInDays } from 'date-fns';

const TravelSurvey31 = () => {
  const navigate = useNavigate();
  const { travelsurveyData, setTravelSurveyData } = useContext(TravelSurveyContext);
  const [intensity, setIntensity] = useState([]);
  const { startDate, endDate } = travelsurveyData;

  useEffect(() => {
    if (startDate && endDate) {
      const period = differenceInDays(new Date(endDate), new Date(startDate)) + 1;
      setIntensity(Array(period).fill('')); // 초기 여행 강도를 설정
    }
  }, [startDate, endDate]);

  // 여행 강도 설정
  const handleIntensityChange = (day, value) => {
    const newIntensity = [...intensity];
    newIntensity[day - 1] = value;
    setIntensity(newIntensity);
    setTravelSurveyData(prevData => ({
      ...prevData,
      intensity: newIntensity
    }));
  };

  const isButtonActive = intensity.length > 0 && intensity.every(val => val !== '');

  console.log(intensity);

  return (
    <Container>
      <LogoContainer>
        <img style={{ width: "30%" }} 
          src={process.env.PUBLIC_URL + `asset/logo/simplelogo.png`}
          alt='logo' />
      </LogoContainer>
      <ProgressContainer>
        <ProgressBarContainer>
          <Progress width={42.86} />
        </ProgressBarContainer>
        <StepText>3/7 단계</StepText>
      </ProgressContainer>
      <Question>여행 강도를 설정해주세요</Question>
      <LabelsContainer>
        <Message>여유로운</Message>
        <Divider />
        <Message>활동적인</Message>
      </LabelsContainer>
      {intensity.map((_, i) => (
        <DayContainer key={i}>
          <DayLabel>{i + 1}일차</DayLabel>
          <RadioGroup>
            {[...Array(5)].map((_, j) => (
              <React.Fragment key={j}>
                <HiddenRadioButton
                  id={`day${i + 1}_intensity${j + 1}`}
                  name={`day${i + 1}`}
                  value={j + 1}
                  checked={intensity[i] === j + 1}
                  onChange={() => handleIntensityChange(i + 1, j + 1)}
                />
                <CustomRadioButton
                  htmlFor={`day${i + 1}_intensity${j + 1}`}
                  checked={intensity[i] === j + 1}
                />
              </React.Fragment>
            ))}
          </RadioGroup>
        </DayContainer>
      ))}
      <ButtonContainer>
        <BeforeButton onClick={() => navigate('/travelsurvey2')}>
          이전으로
        </BeforeButton>
        <Button 
            isActive={isButtonActive} // 수정된 prop 이름 사용
            onClick={() => isButtonActive && navigate('/travelsurvey3')} // 다음 페이지로 이동
            >
            다음으로
            </Button>
      </ButtonContainer>
    </Container>
  );
};

export default TravelSurvey31;

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

const Message = styled.div`
  font-size: 14px;
  font-family: "Pretendard-Regular";
  color: #252a2f;
  text-align: center;
  margin-top: 10px;
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
  background-color: ${props => (props.isActive ? '#FF8A1D' : '#848484')};
  border-radius: 20px;
  font-family: "Pretendard-ExtraBold";
  border: none;
  font-size: 13px;
  color: #FAFAFA;
  cursor: ${props => (props.isActive ? 'pointer' : 'not-allowed')};
  opacity: ${props => (props.isActive ? '1' : '0.5')};
`;

const BeforeButton = styled.button`
  padding: 10px 40px;
  background-color: #FAFAFA;
  border-radius: 20px;
  font-family: "Pretendard-ExtraBold";
  border: none;
  font-size: 13px;
  color: #252a2f;
  cursor: pointer;
`;

const DayContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;

const DayLabel = styled.div`
  font-size: 16px;
  font-family: "Pretendard-ExtraBold";
  color: #252a2f;
  margin-bottom: 5px;
`;

const RadioGroup = styled.div`
  display: flex;
  justify-content: space-around;
  width: 70%;
`;

const LabelsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5%;
  margin-bottom: 5%;
  margin-left: 20%;
  margin-right: 11%;
`;

const Divider = styled.hr`
  border: none;
  height: 0.5px;
  background-color: #252a2f;
  width: 50%;
`;

const HiddenRadioButton = styled.input.attrs({ type: 'radio' })`
  display: none;
`;

const CustomRadioButton = styled.label`
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: none;
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
  background-color: ${props => (props.checked ? '#252a2f' : 'transparent')};
  cursor: pointer;
  transition: background-color 0.2s;
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