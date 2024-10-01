import React, { useContext, useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { TravelSurveyContext } from './TsContext';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { addDays } from 'date-fns';

const SelectDate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { travelsurveyData, setTravelSurveyData } = useContext(TravelSurveyContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [ticketPrice, setTicketPrice] = useState(null);

  // location.state.prices에서 받은 가격 데이터를 사용
  const prices = location.state?.prices || {};

  const fetchTicketPrice = async (startDate, endDate) => {
    try {
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);
      const { startAirport, endAirport, departureTime, returnTime } = travelsurveyData;
      console.log("Formatted Start Date:", formattedStartDate);
      console.log("Formatted End Date:", formattedEndDate);
      console.log(JSON.stringify({ 
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        startAirport,
        endAirport,
        departureTime,
        returnTime
      }));

      const response = await fetch('http://localhost:8888/flights/round-trip-fare', { // 실제 API 엔드포인트로 대체
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          startAirport,
          endAirport,
          departureTime,
          returnTime
        }),
      });
      
      const data = await response.json();
      setTicketPrice(data);
      localStorage.setItem('flightprice', data);
      console.log(data)

    } catch (error) {
      console.error('Error fetching ticket price:', error);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchTicketPrice(startDate, endDate);
      const formattedStartDate = formatDate(startDate); 
      const formattedEndDate = formatDate(endDate); 
      setTravelSurveyData(prevData => ({ 
        ...prevData, 
        startDate: formattedStartDate,
        endDate: formattedEndDate
      }));
    }
  }, [startDate, endDate, setTravelSurveyData]);

  const handleDateChange = (selectedDate) => {
    if (!startDate) {
      setStartDate(selectedDate);
      setEndDate(null);
    } else if (!endDate) {
      const maxSelectableDate = addDays(startDate, 7);
      if (selectedDate > maxSelectableDate) {
        alert('여행 기간은 최대 7일까지만 선택 가능합니다.');
      } else if (selectedDate < startDate) {
        setStartDate(selectedDate);
        setEndDate(null);
      } else {
        setEndDate(selectedDate);
      }
    } else {
      setStartDate(selectedDate);
      setEndDate(null);
    }
  };

  const formatDate = (date) => {
    const adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000); 
    return adjustedDate.toISOString().split('T')[0];
  };

  const getTileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateString = formatDate(date);
      if (prices[dateString]) {
        const priceInManWon = (prices[dateString] / 10000).toFixed(1);
        return <PriceTag>{priceInManWon}만 원</PriceTag>;
      }
    }
    return null;
  };

  const resetSelection = () => {
    setStartDate(null);
    setEndDate(null);
    setTicketPrice(null);
  };

  const tileDisabled = ({ date }) => {
    const today = new Date();
    if (date < today.setHours(0, 0, 0, 0)) {
      return true;
    }
    if (startDate) {
      const maxSelectableDate = addDays(startDate, 7);
      return date > maxSelectableDate || date < startDate;
    }
    return false;
  };

  const isButtonActive = startDate && endDate;


  return (
    <Container isScrollable={isScrollable}>
      <LogoContainer>
        <img style={{ width: "30%" }} 
          src={process.env.PUBLIC_URL + `asset/logo/simplelogo.png`}
          alt='logo' />
      </LogoContainer>
      <ProgressContainer>
        <ProgressBarContainer>
          <Progress width={28.57} />
        </ProgressBarContainer>
        <StepText>2/7 단계</StepText>
      </ProgressContainer>
      <Question>여행 시작일과 종료일을 선택하세요</Question>
      <Message>여행은 최대 7일까지만 선택 가능합니다.</Message>
      <DatePickerContainer>
        <StyledCalendar
          onClickDay={handleDateChange}
          value={startDate ? [startDate, endDate] : null}
          tileContent={getTileContent}
          tileDisabled={tileDisabled}
          selectRange={false}
          minDate={new Date()}
          maxDate={startDate ? addDays(startDate, 6) : addDays(new Date(), 365)}
          locale="ko"
        />
      </DatePickerContainer>
      <ResetContainer>
        <ResetButton onClick={resetSelection}>
          날짜 초기화 🔄
        </ResetButton>
      </ResetContainer>

      {ticketPrice !== null && (
        <PriceMessage>
          예측 왕복 항공권의 가격은 <PriceHighlight>{ticketPrice.toLocaleString()}</PriceHighlight>원 입니다
        </PriceMessage>
      )}

      <ButtonContainer>
        <BeforeButton onClick={() => navigate('/airport')}>
          이전으로
        </BeforeButton>
        <Button 
          active={isButtonActive}
          onClick={() => isButtonActive && navigate('/intensity')}
        >
          다음으로
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default SelectDate;

// 스타일

const PriceMessage = styled.div`
  font-size: 16px;
  font-family: 'Pretendard-Bold';
  color: #252a2f;
  text-align: center;
  margin-top: 20px;
`;

const PriceTag = styled.div`
  font-size: 8px;
  color: #909193;
  text-align: center;
  font-family: 'Pretendard-Regular';
  margin-top: 4px;
`;

/* 나머지 스타일은 그대로 유지 */
const Container = styled.div.attrs(props => ({
  isScrollable: undefined // DOM에 전달되지 않도록 undefined로 설정
}))`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FAFAFA;
  box-sizing: border-box;
  margin-bottom: 70px;
  overflow-y: ${props => (props.isScrollable ? 'scroll' : 'hidden')}; /* isScrollable 사용 */
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
  background-color: ${props => (props.active ? '#FF8A1D' : '#848484')};
  border-radius: 20px;
  font-family: "Pretendard-ExtraBold";
  border: none;
  font-size: 13px;
  color: #FAFAFA;
  cursor: ${props => (props.active ? 'pointer' : 'not-allowed')};
  opacity: ${props => (props.active ? '1' : '0.5')};
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
  width: 85%;
  font-size: 13px;
  background-color: #fafafa;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  border: none;

  &.react-calendar {
    & .react-calendar__tile {
      color: #252a2f; /* 기본 텍스트 색상 */
      transition: background-color 0.2s ease, color 0.2s ease;
      font-family: "Pretendard-Medium";

      /* 타일에 마우스를 올렸을 때 */
      &:hover {
        background-color: #ff8a1d; /* 호버 시 배경색 */
        color: #fafafa; /* 호버 시 텍스트 색상 */
      }
    }

    /* 현재 날짜 (오늘) 타일 스타일 */
    & .react-calendar__tile--now {
      background-color: transparent; /* 배경색을 투명하게 설정 */
      color: inherit; /* 텍스트 색상을 기본 상속 값으로 설정 */
      box-shadow: none; /* 만약 그림자가 있다면 제거 */
    }
    /* 선택된 날짜 스타일 */
    & .react-calendar__tile--active {
      background-color: #ff8a1d; /* 선택된 날짜 배경색 */
      color: white; /* 선택된 날짜 텍스트 색상 */
    }

    /* 날짜 범위 스타일 (여러 날짜 선택 시) */
    & .react-calendar__tile--range {
      background-color: rgba(255, 138, 29, 0.3); /* 범위 내 날짜 배경색 */
      color: #252a2f;
    }

    /* 범위 시작 날짜 */
    & .react-calendar__tile--rangeStart {
      background-color: #ff8a1d; /* 범위 시작 날짜 배경 */
      color: #fafafa; /* 범위 시작 날짜 텍스트 색 */
    }

    /* 범위 끝 날짜 */
    & .react-calendar__tile--rangeEnd {
      background-color: #ff8a1d; /* 범위 끝 날짜 배경 */
      color: #fafafa; /* 범위 끝 날짜 텍스트 색 */
    }

    /* 주말 날짜 스타일 (토, 일) */
    & .react-calendar__month-view__days__day--weekend {
      color: #a45a15; /* 주말 텍스트 색상 */
    }

    & .react-calendar__navigation__label {
      font-size: 12px; /* 폰트 크기 조정 */
      font-family: "Pretendard-Bold"; /* 폰트 패밀리 조정 */
      color: #252a2f; /* 텍스트 색상 조정 */
    }

    & .react-calendar__navigation__arrow {
      color: #252a2f; /* 화살표 색상 조정 */
    }
    
  }
`;

const ResetContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
`;

const ResetButton = styled.button`
  background-color: #FAFAFA; /* 리셋 버튼 배경색 */
  border-radius: 20px;
  font-family: "Pretendard-Medium";
  border: none;
  font-size: 13px;
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
  color: #757575;
  cursor: pointer;
  padding: 7px 20px;
  
`;

const PriceHighlight = styled.span`
  text-decoration: underline; /* 밑줄 */
  color: #FF8A1D; /* 색상 변경 */
  font-weight: bold; /* 굵은 글씨로 변경 (선택 사항) */
`;