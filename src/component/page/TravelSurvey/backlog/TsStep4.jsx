import React, { useContext, useState } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { TravelSurveyContext } from './TsContext';

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

const Question = styled.div`
  font-size: 18px;
  font-family: "Pretendard-ExtraBold";
  color: #252a2f;
  text-align: center;
`;

const Message = styled.div`
  font-size: 11px;
  font-family: "Pretendard-Regular";
  color: #FF8A1D;
  text-align: center;
  margin-top: 1%;
  margin-bottom: 5%;
`;

const PickerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 7%;
  margin-top: 5%;
  gap: 5%;
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

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45%; /* 두 개씩 배치되도록 조정 */
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  background-color: ${props => (props.selected ? '#252a2f' : '#FAFAFA')};
  cursor: pointer;
  overflow: hidden; /* 이미지가 컨테이너를 벗어나지 않도록 함 */
`;

const ImgPicker = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 130px; /* 고정 높이 설정 */
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지 자르기 */
  border-radius: 15px 15px 0 0;
`;

const Category = styled.div`
  font-size: 15px;
  font-family: "Pretendard-ExtraBold";
  color: ${props => (props.selected ? '#FAFAFA' : '#252a2f')};
  text-align: center;
  padding: 10px;
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

const RestaurantOptions = [
  { id: 1, name: '한식', image: '/asset/sample/sample.png' },
  { id: 2, name: '중식', image: '/asset/sample/sample.png' },
  { id: 3, name: '일식', image: '/asset/sample/sample.png' },
  { id: 4, name: '이탈리안', image: '/asset/sample/sample.png' },
];

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const TsStep4 = () => {
  const navigate = useNavigate();
  const { travelsurveyData, setTravelSurveyData } = useContext(TravelSurveyContext);
  const [selectedRestaurants, setSelectedRestaurants] = useState(travelsurveyData.restaurant || []);

  const toggleRestaurant = (id) => {
    const updatedRestaurants = selectedRestaurants.includes(id)
      ? selectedRestaurants.filter(restId => restId !== id)
      : [...selectedRestaurants, id];
    setSelectedRestaurants(updatedRestaurants);
    setTravelSurveyData({ ...travelsurveyData, restaurant: updatedRestaurants });
  };

  const handleButtonClick = () => {
    if (selectedRestaurants.length > 0) {
      setTravelSurveyData(prevData => ({
        ...prevData,
        restaurant: selectedRestaurants,
      }));
      navigate('/travelsurvey5');
    }
  }

  return (
    <Container>
      <LogoContainer>
        <img style={{ width: "30%" }} 
          src={process.env.PUBLIC_URL + `asset/logo/simplelogo.png`}
          alt='logo' />
      </LogoContainer>
      <Question style={{ marginTop: "5%" }}>선호하는 식당 카테고리를</Question>
      <Question>선택해주세요</Question>
      <Message>*복수 응답 가능</Message>
      {chunkArray(RestaurantOptions, 2).map((row, rowIndex) => (
        <PickerContainer key={rowIndex}>
          {row.map(option => (
            <ImgContainer
              key={option.id}
              selected={selectedRestaurants.includes(option.id)}
              onClick={() => toggleRestaurant(option.id)}
            >
              <ImgPicker>
                <Img src={process.env.PUBLIC_URL + option.image} />
              </ImgPicker>
              <Category selected={selectedRestaurants.includes(option.id)}>
                {option.name}
              </Category>
            </ImgContainer>
          ))}
        </PickerContainer>
      ))}
      <ButtonContainer>
        <BeforeButton onClick={() => navigate('/travelsurvey3')}>
          이전으로
        </BeforeButton>
        <Button
          active={selectedRestaurants.length > 0}
          onClick={handleButtonClick}
        >
          다음으로
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default TsStep4;