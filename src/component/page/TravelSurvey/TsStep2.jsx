import React, { useContext, useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { TravelSurveyContext } from './TsContext';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, differenceInDays } from 'date-fns';
import ko from 'date-fns/locale/ko';

registerLocale('ko', ko);

const CustomDatePicker = styled(DatePicker)`
  && .react-datepicker__header {
    background-color: #ff8a1d;
    border-bottom: none;
  }

  && .react-datepicker__day {
    color: #252a2f;
  }

  && .react-datepicker__day:hover {
    background-color: #ff8a1d;
    color: #ffffff;
  }

  && .react-datepicker__day--selected {
    background-color: #252a2f;
    color: #ffffff;
  }

  && .react-datepicker__current-month {
    color: #ffffff;
    font-weight: bold;
  }

  && .react-datepicker__day--keyboard-selected {
    background-color: #252a2f;
    color: #ffffff;
  }
`;

const TsStep2 = () => {
  const navigate = useNavigate();
  const { travelsurveyData, setTravelSurveyData, updatePeriod } = useContext(TravelSurveyContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [intensity, setIntensity] = useState([]);
  const [isScrollable, setIsScrollable] = useState(false);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      const period = differenceInDays(end, start) + 1; // 여행 기간 계산
      updatePeriod(period);
      setIntensity(Array(period).fill('')); // 여행 강도 초기화
    }
  };

  const handleIntensityChange = (day, value) => {
    const newIntensity = [...intensity];
    newIntensity[day - 1] = value;
    setIntensity(newIntensity);
    setTravelSurveyData({ ...travelsurveyData, intensity: newIntensity });
  };

  const isButtonActive = startDate && endDate && intensity.length === differenceInDays(endDate, startDate) + 1 && intensity.every(val => val !== '');

  // useEffect로 스크롤 여부를 감지하여 상태 설정
  useEffect(() => {
    const handleResize = () => {
      setIsScrollable(window.innerHeight < document.documentElement.scrollHeight);
    };

    handleResize(); // 처음 렌더링 시에도 확인
    window.addEventListener('resize', handleResize); // 윈도우 리사이즈 시 감지

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
      <Question>여행 시작일과 종료일을 선택하세요</Question>
      <Message>여행은 최대 7일까지만 선택 가능합니다.</Message>
      <DatePickerContainer>
      <CustomDatePicker
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        minDate={new Date()}
        maxDate={startDate ? addDays(startDate, 6) : addDays(new Date(), 365)} 
        placeholderText="여행 날짜를 선택하세요"
        locale="ko"
        dateFormat="yyyy년 MM월 dd일"
      />
      </DatePickerContainer>
      {startDate && endDate && (
        <div>
          <Question style={{ marginTop: "5%" }}>여행 강도를 선택해주세요</Question>
          <LabelsContainer>
            <Message>여유로운</Message>
            <Divider />
            <Message>활동적인</Message>
          </LabelsContainer>
          {[...Array(differenceInDays(endDate, startDate) + 1)].map((_, i) => (
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
        </div>
      )}
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

export default TsStep2;

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

const DatePickerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5%;
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

  ${HiddenRadioButton}:checked + & {
    background-color: #252a2f;
  }
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