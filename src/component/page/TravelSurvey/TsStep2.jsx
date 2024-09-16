import React, { useContext, useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { TravelSurveyContext } from './TsContext';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { addDays, differenceInDays } from 'date-fns';

const TsStep2 = () => {
  const navigate = useNavigate();
  const { travelsurveyData, setTravelSurveyData, updatePeriod } = useContext(TravelSurveyContext);
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

  const handleDateChange = (selectedDate) => {
    if (!startDate) {
        // 첫 번째 날짜 선택 시
        setStartDate(selectedDate);
        setEndDate(null);
        setIntensity([]); // 초기화
    } else if (!endDate) {
        // 첫 번째 날짜 선택 후 두 번째 날짜 선택 시
        const maxSelectableDate = addDays(startDate, 7);
        if (selectedDate < startDate) {
            // startDate 이전 날짜가 선택된 경우, 이를 startDate로 설정
            setStartDate(selectedDate);
            setEndDate(null); // endDate 초기화
            setIntensity([]); // 초기화
        } else if (selectedDate > maxSelectableDate) {
            // 선택된 날짜가 startDate로부터 7일을 넘는 경우
            alert('여행 기간은 최대 7일까지만 선택 가능합니다.');
        } else {
            // 7일 이내의 날짜가 선택된 경우
            setEndDate(selectedDate);
            const period = differenceInDays(selectedDate, startDate) + 1;
            updatePeriod(period);
            setIntensity(Array(period).fill('')); // 여행 강도 초기화
        }
    } else {
        // 날짜가 이미 선택된 상태에서 첫 번째 날짜를 다시 클릭한 경우 (초기화)
        setStartDate(null);
        setEndDate(null);
        setIntensity([]); // 초기화
        updatePeriod(0); // 여행 기간 초기화
    }
};

  const getTileContent = ({ date, view }) => {
    if (view === 'month') { // 월간 보기일 때만 텍스트 표시
      const dateString = date.toISOString().split('T')[0]; // 날짜를 YYYY-MM-DD 형식으로 변환
      if (prices[dateString]) {
        // 가격을 10,000으로 나누어 "만 원" 단위로 변환하여 표시
        const priceInManWon = (prices[dateString] / 10000).toFixed(1);
        return <PriceTag>{priceInManWon}만 원</PriceTag>;
      }
    }
    return null;
};

  const handleIntensityChange = (day, value) => {
    const newIntensity = [...intensity];
    newIntensity[day - 1] = value;
    setIntensity(newIntensity);
    setTravelSurveyData({ ...travelsurveyData, intensity: newIntensity });
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
      <Question>여행 시작일과 종료일을 선택하세요</Question>
      <Message>여행은 최대 7일까지만 선택 가능합니다.</Message>
      <DatePickerContainer>
        <StyledCalendar
          onClickDay={handleDateChange}
          value={startDate ? [startDate, endDate] : null}
          tileContent={getTileContent} // 각 날짜 타일에 텍스트 추가
          selectRange={false}
          minDate={new Date()}
          maxDate={startDate ? addDays(startDate, 6) : addDays(new Date(), 365)}
          locale="ko"
        />
      </DatePickerContainer>
      {startDate && endDate && (
        <>
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
        </>
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

// 추가적인 스타일 정의
const PriceTag = styled.div`
  font-size: 8px;
  color: #909193;
  text-align: center;
  font-family: 'Pretendard-Regular';
  margin-top: 4px;
`;

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

const StyledCalendar = styled(Calendar)`
  /* 전체 캘린더 컨테이너 */
  &.react-calendar {
    background-color: #fafafa;
    border-radius: 8px;
    width: 80%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: #252a2f;
    font-family: 'Pretendard-Regular';
    border: none;
    font-size: 14px;
  }

  /* 탐색 버튼 영역 */
  .react-calendar__navigation {
    margin-bottom: 10px;

    .react-calendar__navigation__label {
      font-weight: bold;
      color: #252a2f;
    }

    .react-calendar__navigation__arrow,
    .react-calendar__navigation__prev-button,
    .react-calendar__navigation__next-button {
      color: #252a2f;
      transition: color 0.2s ease;
      &:hover {
        color: #ff8a1d;
      }
    }
  }

  /* 요일 이름 */
  .react-calendar__month-view__weekdays__weekday {
    color: #252a2f;
    font-weight: bold;
  }

  /* 날짜 셀 스타일 */
  .react-calendar__tile {
    background-color: #fafafa;
    color: #252a2f;
    border-radius: 4px;
    padding: 10px;
    transition: background-color 0.2s ease, color 0.2s ease;

    /* 기본 포커스 및 호버 스타일 초기화 */
    &:focus, &:hover {
      background-color: #ff8a1d;
      color: #fafafa;
      outline: none; /* 포커스 테두리 제거 */
    }
  }

  /* 선택된 날짜 스타일 */
  .react-calendar__tile--active {
    border: 2px solid #252a2f;
    background-color: #252a2f;
    color: #fafafa;
    border: none;
  }

  /* 범위 선택 시 스타일 */
  .react-calendar__tile--range {
    background-color: rgba(255, 138, 29, 0.3);
    color: #252a2f;
  }

  .react-calendar__tile--rangeStart,
  .react-calendar__tile--rangeEnd {
    background-color: #ff8a1d;
    color: #fafafa;
  }

  /* 주말 날짜 색상 */
  .react-calendar__month-view__days__day--weekend {
    color: #ff8a1d;
  }

`;
