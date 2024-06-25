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

const PickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 7%;
`;

const Question = styled.div`
  font-size: 18px;
  font-family: "Pretendard-ExtraBold";
  color: #252a2f;
  text-align: center;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5%;
  width: 90%;
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

const DestinationName = styled.div`
  font-size: 15px;
  font-family: "Pretendard-ExtraBold";
  color: ${props => (props.selected ? '#FAFAFA' : '#252a2f')};
  text-align: center;
  padding: 10px;
`;

const Message = styled.div`
  font-size: 12px;
  font-family: "Pretendard-Regular";
  color: #252a2f;
  text-align: center;
  margin-top: 5%;
`;

const Button = styled.button`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 60px;
  background-color: ${props => (props.active ? '#FF8A1D' : '#848484')};
  border-radius: 20px;
  font-family: "Pretendard-ExtraBold";
  border: none;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  font-size: 13px;
  color: #FAFAFA;
  cursor: ${props => (props.active ? 'pointer' : 'not-allowed')};
`;

const TsStep1 = () => {
  const navigate = useNavigate();
  const { travelsurveyData, setTravelSurveyData } = useContext(TravelSurveyContext);
  const [selectedDestination, setSelectedDestination] = useState('');

  const handleSelectDestination = (destination) => {
    setSelectedDestination(destination);
    setTravelSurveyData({ ...travelsurveyData, destination });
  };

  const isButtonActive = !!selectedDestination;

  return (
    <Container>
      <LogoContainer>
        <img style={{ width: "30%" }} 
          src={process.env.PUBLIC_URL + `asset/logo/simplelogo.png`}
          alt='logo' />
      </LogoContainer>
      <Question style={{ marginTop: "5%" }}>아래 여행지는 어떠세요?</Question>
      <PickerContainer>
        <ImgContainer 
          onClick={() => handleSelectDestination('서울')} 
          selected={selectedDestination === '서울'}
        >
          <ImgPicker>
            <Img src={process.env.PUBLIC_URL + `/asset/sample/seoul.jpg`} />
          </ImgPicker>
          <DestinationName selected={selectedDestination === '서울'}>서울</DestinationName>
        </ImgContainer>
        <ImgContainer 
          onClick={() => handleSelectDestination('제주')} 
          selected={selectedDestination === '제주'}
        >
          <ImgPicker>
            <Img src={process.env.PUBLIC_URL + `/asset/sample/jeju.jpg`} />
          </ImgPicker>
          <DestinationName selected={selectedDestination === '제주'}>제주</DestinationName>
        </ImgContainer>
      </PickerContainer>
      <Message>여행지 직접 고르기</Message>
      <Button 
        active={isButtonActive}
        onClick={() => isButtonActive && navigate('/travelsurvey2')}
      >
        다음으로
      </Button>
    </Container>
  );
};

export default TsStep1;