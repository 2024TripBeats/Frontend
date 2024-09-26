import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { TravelSurveyContext } from './TsContext';

const RestCafe = () => {
  const navigate = useNavigate();
  const { travelsurveyData, setTravelSurveyData } = useContext(TravelSurveyContext);
  const [selectedRestaurants, setSelectedRestaurants] = useState(travelsurveyData.restaurant || []);
  const [requiredRestText, setRequiredRestText] = useState(travelsurveyData.requiredRestText || '');
  const [selectedCafes, setSelectedCafes] = useState(travelsurveyData.cafe || []);

  const toggleRestaurant = (id) => {
    const updatedRestaurants = selectedRestaurants.includes(id)
      ? selectedRestaurants.filter(restId => restId !== id)
      : [...selectedRestaurants, id];
    setSelectedRestaurants(updatedRestaurants);
    setTravelSurveyData({ ...travelsurveyData, restaurant: updatedRestaurants });
  };

  const toggleCafe = (id) => {
    const updatedCafes = selectedCafes.includes(id)
      ? selectedCafes.filter(cafeId => cafeId !== id)
      : [...selectedCafes, id];
    setSelectedCafes(updatedCafes);
    setTravelSurveyData({ ...travelsurveyData, cafe: updatedCafes });
  };

  const handleNextClick = () => {
    if (selectedRestaurants.length > 0 && selectedCafes.length > 0) {
      setTravelSurveyData({
        ...travelsurveyData,
        requiredRestText: requiredRestText || null,
        cafe: selectedCafes,
      });
      navigate('/preferlocation');
    }
  };

  return (
    <Container>
      <LogoContainer>
        <img
          style={{ width: '30%' }}
          src={process.env.PUBLIC_URL + `asset/logo/simplelogo.png`}
          alt="logo"
        />
      </LogoContainer>
      <ProgressContainer>
        <ProgressBarContainer>
          <Progress width={71.43} />
        </ProgressBarContainer>
        <StepText>5/7 단계</StepText>
      </ProgressContainer>
      <Question>필요한 식당 옵션을 선택해주세요</Question>
      <Message>*다중 선택 가능</Message>

      <Row>
        <OptionButton onClick={() => toggleRestaurant('가성비')} active={selectedRestaurants.includes('가성비')}>가성비</OptionButton>
        <OptionButton onClick={() => toggleRestaurant('로컬 맛집')} active={selectedRestaurants.includes('로컬 맛집')}>로컬 맛집</OptionButton>
        <OptionButton onClick={() => toggleRestaurant('주차시설')} active={selectedRestaurants.includes('주차시설')}>주차시설</OptionButton>
        <OptionButton onClick={() => toggleRestaurant('위생적인')} active={selectedRestaurants.includes('위생적인')}>위생적인</OptionButton>
      </Row>
      <Row>
        <OptionButton onClick={() => toggleRestaurant('오션뷰')} active={selectedRestaurants.includes('오션뷰')}>오션뷰</OptionButton>
        <OptionButton onClick={() => toggleRestaurant('뷰가 좋은')} active={selectedRestaurants.includes('뷰가 좋은')}>뷰가 좋은</OptionButton>
        <OptionButton onClick={() => toggleRestaurant('반려동물O')} active={selectedRestaurants.includes('반려동물O')}>반려동물O</OptionButton>
        <OptionButton onClick={() => toggleRestaurant('좋은 분위기')} active={selectedRestaurants.includes('좋은 분위기')}>좋은 분위기</OptionButton>
      </Row>

      <InputContainer>
        <Question style={{fontSize: "13px"}}>먹고 싶은 음식:</Question>
        <Input
          type="text"
          placeholder="떡볶이, 순대와 같이 음식 사이에 쉼표(,)를 써주세요."
          value={requiredRestText}
          onChange={(e) => setRequiredRestText(e.target.value)}
        />
      </InputContainer>

      <Question>필요한 카페 옵션을 선택해주세요</Question>
      <Message>*다중 선택 가능</Message>
      <Row>
        <OptionButton onClick={() => toggleCafe('가성비')} active={selectedCafes.includes('가성비')}>가성비</OptionButton>
        <OptionButton onClick={() => toggleCafe('로컬 맛집')} active={selectedCafes.includes('로컬 맛집')}>로컬 맛집</OptionButton>
        <OptionButton onClick={() => toggleCafe('주차시설')} active={selectedCafes.includes('주차시설')}>주차시설</OptionButton>
        <OptionButton onClick={() => toggleCafe('위생적인')} active={selectedCafes.includes('위생적인')}>위생적인</OptionButton>
      </Row>
      <Row>
        <OptionButton onClick={() => toggleCafe('오션뷰')} active={selectedCafes.includes('오션뷰')}>오션뷰</OptionButton>
        <OptionButton onClick={() => toggleCafe('뷰가 좋은')} active={selectedCafes.includes('뷰가 좋은')}>뷰가 좋은</OptionButton>
        <OptionButton onClick={() => toggleCafe('반려동물O')} active={selectedCafes.includes('반려동물O')}>반려동물O</OptionButton>
        <OptionButton onClick={() => toggleCafe('좋은 분위기')} active={selectedCafes.includes('좋은 분위기')}>좋은 분위기</OptionButton>
      </Row>

      <ButtonContainer>
        <BeforeButton onClick={() => navigate('/accomodation')}>이전으로</BeforeButton>
        <Button
          active={selectedRestaurants.length > 0 && selectedCafes.length > 0} 
          onClick={handleNextClick}
        >
          다음으로
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default RestCafe;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fafafa;
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
  font-family: 'Pretendard-ExtraBold';
  color: #252a2f;
  text-align: center;
`;

const Message = styled.div`
  font-size: 11px;
  font-family: 'Pretendard-Regular';
  color: #ff8a1d;
  text-align: center;
  margin-top: 1%;
  margin-bottom: 25px;
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
  width: ${(props) => props.width}%;
  height: 100%;
  background-color: #ff8a1d;
  border-radius: 10px;
  transition: width 0.3s ease-in-out;
`;

const StepText = styled.div`
  font-size: 12px;
  font-family: 'Pretendard-Regular';
  color: #252a2f;
  text-align: center;
  margin-bottom: 10px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const OptionButton = styled.button`
  background-color: ${props => (props.active ? '#252a2f' : '#FAFAFA')};
  color: ${props => (props.active ? '#FAFAFA' : '#252A2F')};
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 30px;
  padding: 5px 14px;
  height: 40px;
  font-size: 14px;
  font-family: "Pretendard-Bold";
  cursor: pointer;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
  margin-bottom: 30px;
  margin-left: 30px;
  margin-right: 30px;
`;

const Input = styled.input`
  background-color: #f3f3f3;
  padding: 10px;
  width: 60%;
  border: none;
  border-radius: 30px;
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.2);
  font-size: 12px;
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
  background-color: ${(props) => (props.active ? '#ff8a1d' : '#848484')};
  border-radius: 20px;
  font-family: 'Pretendard-ExtraBold';
  border: none;
  font-size: 13px;
  color: #fafafa;
  cursor: ${(props) => (props.active ? 'pointer' : 'not-allowed')};
`;

const BeforeButton = styled.button`
  padding: 10px 40px;
  background-color: #fafafa;
  border-radius: 20px;
  font-family: 'Pretendard-ExtraBold';
  border: none;
  font-size: 13px;
  color: #252a2f;
  cursor: pointer;
`;