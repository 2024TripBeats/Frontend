import React, { useContext, useState } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { TravelSurveyContext } from './TsContext';
import 'react-calendar/dist/Calendar.css';

const Airport = () => {
  const navigate = useNavigate();
  const { travelsurveyData, setTravelSurveyData } = useContext(TravelSurveyContext);

  // 상태 변수 정의
  const [startAirport, setStartAirport] = useState('');
  const [endAirport, setEndAirport] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  const airports = ['군산', '김포', '대구', '무안', '부산', '사천', '여수', '울산', '원주', '청주', '포항', '광주']
    .sort(); // 공항 리스트를 가나다 순 정렬

  // 출발 공항 선택 시 데이터 저장
  const handleAirportChange1 = (airport) => {
    setStartAirport(airport);
    setTravelSurveyData((prevData) => ({
      ...prevData,
      startAirport: airport,
    }));
  };

  // 도착 공항 선택 시 데이터 저장
  const handleAirportChange2 = (airport) => {
    setEndAirport(airport);
    setTravelSurveyData((prevData) => ({
      ...prevData,
      endAirport: airport,
    }));
  };

  // 출발 시간 선택 시 데이터 저장
  const handleDepartureTimeChange = (time) => {
    setDepartureTime(time);
    setTravelSurveyData((prevData) => ({
      ...prevData,
      departureTime: time,
    }));
  };

  // 돌아오는 시간 선택 시 데이터 저장
  const handleReturnTimeChange = (time) => {
    setReturnTime(time);
    setTravelSurveyData((prevData) => ({
      ...prevData,
      returnTime: time,
    }));
  };

  // 서버에 POST 요청 보내는 함수 (현재 주석 처리)
  // const sendSurveyDataToServer = async () => {
  //   setIsLoading(true); // 로딩 상태 시작
  //   try {
  //     const surveyData = {
  //       startAirport,
  //       endAirport,
  //       departureTime,
  //       returnTime
  //     };

  //     // 서버로 POST 요청 보내기
  //     const response = await fetch('http://localhost:8888/airport', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(surveyData),
  //     });

  //     if (!response.ok) {
  //       throw new Error('서버 응답에 실패했습니다.');
  //     }

  //     const data = await response.json(); // 서버에서 받은 응답 데이터

  //     // 서버에서 받은 데이터를 travelsurveyData에 저장
  //     setTravelSurveyData((prevData) => ({
  //       ...prevData,
  //       serverResponse: data, // 서버에서 받은 응답 데이터를 저장
  //     }));

  //     // 데이터를 성공적으로 받으면 다음 페이지로 이동
  //     navigate('/selectdate', {
  //       state: {
  //         startAirport,
  //         endAirport,
  //         departureTime,
  //         returnTime,
  //         serverData: data, // 서버에서 받은 데이터를 함께 전달
  //       },
  //     });
  //   } catch (error) {
  //     console.error('서버 요청 실패:', error);
  //   } finally {
  //     setIsLoading(false); // 로딩 상태 종료
  //   }
  // };

  // 버튼 활성화 조건 확인: 모든 값이 선택된 경우만 버튼 활성화
  const isButtonActive = startAirport && endAirport && departureTime && returnTime;

  // 다음 페이지로 데이터를 넘기기 위한 함수
  const handleNextPage = () => {
    if (isButtonActive) {
      // 서버로 데이터를 보내는 대신 바로 다음 페이지로 이동
      navigate('/selectdate', {
        state: {
          startAirport,
          endAirport,
          departureTime,
          returnTime,
        },
      });
    }
  };

  return (
    <Container>
      <LogoContainer>
        <img style={{ width: "30%" }} 
          src={process.env.PUBLIC_URL + `asset/logo/simplelogo.png`}
          alt='logo' />
      </LogoContainer>
      <ProgressContainer>
        <ProgressBarContainer>
          <Progress width={14.28} />
        </ProgressBarContainer>
        <StepText>1/7 단계</StepText>
      </ProgressContainer>
      <Question>항공편 조회를 위한</Question>
      <Question>정보를 입력해주세요</Question>

      <SelectBox>
        {/* 출발 공항 및 시간 선택 */}
        <SelectContainer style={{ paddingTop: "20px", marginBottom: "15px" }}>
          <Title>출발</Title>
          <img style={{width:"35px"}} src={process.env.PUBLIC_URL + `asset/icon/arrow.png`} alt="arrow" />
          <Title style={{color:"#D9D9D9"}}>도착</Title>
        </SelectContainer>
        <SelectContainer style={{ paddingBottom: "30px", borderBottom: "1px solid #e9e9e9" }}>
          <DayContainer>
            <Dropdown
              value={startAirport}
              onChange={(e) => handleAirportChange1(e.target.value)}
            >
              <option value="" disabled>출발 공항 선택</option>
              {airports.map((airport, index) => (
                <option key={index} value={airport}>
                  {airport}
                </option>
              ))}
            </Dropdown>
            <RadioContainer>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="departureTime"
                  value="오전"
                  checked={departureTime === "오전"}
                  onChange={() => handleDepartureTimeChange("오전")}
                />
                <CustomRadio selected={departureTime === "오전"} />
                오전
              </RadioLabel>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="departureTime"
                  value="오후"
                  checked={departureTime === "오후"}
                  onChange={() => handleDepartureTimeChange("오후")}
                />
                <CustomRadio selected={departureTime === "오후"} />
                오후
              </RadioLabel>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="departureTime"
                  value="저녁"
                  checked={departureTime === "저녁"}
                  onChange={() => handleDepartureTimeChange("저녁")}
                />
                <CustomRadio selected={departureTime === "저녁"} />
                저녁
              </RadioLabel>
            </RadioContainer>
          </DayContainer>
          <DayContainer>
            <Message style={{marginLeft: "25px"}}>제주(CJU)</Message>
          </DayContainer>
        </SelectContainer>

        {/* 돌아오는 시간 선택 */}
        <SelectContainer style={{ paddingTop: "30px", marginBottom: "15px" }}>
          <Title style={{color:"#D9D9D9"}}>출발</Title>
          <img style={{width:"35px"}} src={process.env.PUBLIC_URL + `asset/icon/arrow.png`} alt="arrow" />
          <Title>도착</Title>
        </SelectContainer>
        <SelectContainer>
          <DayContainer>
            <Message>제주(CJU)</Message>
            <RadioContainer>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="returnTime"
                  value="오전"
                  checked={returnTime === "오전"}
                  onChange={() => handleReturnTimeChange("오전")}
                />
                <CustomRadio selected={returnTime === "오전"} />
                오전
              </RadioLabel>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="returnTime"
                  value="오후"
                  checked={returnTime === "오후"}
                  onChange={() => handleReturnTimeChange("오후")}
                />
                <CustomRadio selected={returnTime === "오후"} />
                오후
              </RadioLabel>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="returnTime"
                  value="저녁"
                  checked={returnTime === "저녁"}
                  onChange={() => handleReturnTimeChange("저녁")}
                />
                <CustomRadio selected={returnTime === "저녁"} />
                저녁
              </RadioLabel>
            </RadioContainer>
          </DayContainer>
          <DayContainer>
            <Dropdown style={{marginLeft: "25px"}}
              value={endAirport}
              onChange={(e) => handleAirportChange2(e.target.value)}
            >
              <option value="" disabled>도착 공항 선택</option>
              {airports.map((airport, index) => (
                <option key={index} value={airport}>
                  {airport}
                </option>
              ))}
            </Dropdown>
          </DayContainer>
        </SelectContainer>
      </SelectBox>

      <ButtonContainer>
        <BeforeButton onClick={() => navigate('/destination')}>
          이전으로
        </BeforeButton>
        <Button 
          active={isButtonActive && !isLoading}
          onClick={handleNextPage} // 다음 페이지로 넘기는 로직
        >
          {isLoading ? '로딩 중...' : '다음으로'}
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default Airport;

// 스타일 정의
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

const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding-left: 30px;
  padding-right: 30px;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90%;
`;

const Title = styled.div`
  width: 50%;
  font-size: 17px;
  font-family: "Pretendard-ExtraBold";
  color: #252A2F;
  text-align: center;
`;

const Message = styled.div`
  font-size: 17px;
  font-family: "Pretendard-Bold";
  color: #D9D9D9;
`;

const Dropdown = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: "Pretendard-Regular";
  font-size: 14px;
  background-color: #FAFAFA;
  color: #252a2f;
`;

const RadioContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 13px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
  font-family: "Pretendard-SemiBold";
  color: #252a2f;
`;

const RadioInput = styled.input`
  display: none;
`;

const CustomRadio = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${(props) => (props.selected ? '#FF8A1D' : '#FAFAFA')};
  border: 1px solid #FF8A1D;
  display: inline-block;
  position: relative;
  
  ${RadioLabel}:hover & {
    background-color: #FF8A1D;
  }
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
  padding: 10px 25px;
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

const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  gap: 15px;
`;