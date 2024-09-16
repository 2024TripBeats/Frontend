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
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  overflow: hidden;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  position: relative;
`;

const ImgPicker = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 130px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px 15px 0 0;
  filter: ${props => (props.disabled ? 'grayscale(100%)' : 'none')};
`;

const ComingSoonText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  font-family: "Pretendard-ExtraBold";
  color: #FAFaFA;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 5px 10px;
  border-radius: 10px;
  display: ${props => (props.disabled ? 'block' : 'none')};
`;

const DestinationName = styled.div`
  font-size: 15px;
  font-family: "Pretendard-ExtraBold";
  color: ${props => (props.selected ? '#FAFAFA' : '#252a2f')};
  text-align: center;
  padding: 10px;
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

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background-color: white;
  width: 400px;
  padding: 20px;
  border-radius: 15px;
  box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.2);
  z-index: 2;
  text-align: center;
  position: relative;
`;

const ModalText = styled.div`
  font-size: 18px;
  font-family: "Pretendard-Bold";
  color: #252A2F;
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  font-size: 13px;
  border: none;
  border-radius: 10px;
  margin-top: 30px;
  margin-bottom: 30px;
  box-sizing: border-box;
  box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.15);
  font-family: "Pretendard-Regular";
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ModalButton = styled.button`
  padding: 10px 60px;
  background-color: #FF8A1D;
  border-radius: 20px;
  font-family: "Pretendard-ExtraBold";
  border: none;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  font-size: 13px;
  color: #FAFAFA;
  cursor: pointer;
`;

const TsStep1 = () => {
  const navigate = useNavigate();
  const { travelsurveyData, setTravelSurveyData } = useContext(TravelSurveyContext);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [tripName, setTripName] = useState('');
  const [destinationLocation, setDestinationLocation] = useState(''); // location을 destinationLocation으로 변경

  const handleSelectDestination = (destination) => {
    if (destination !== '서울') { // 서울은 선택 불가능하게
      setSelectedDestination(destination);
      setDestinationLocation(destination); // setLocation을 setDestinationLocation으로 변경
      setTravelSurveyData({ ...travelsurveyData, destination });
    }
  };

  const handleNextClick = () => {
    if (selectedDestination) {
      setModalOpen(true);
    }
  };

  const handleModalClose = () => {
    const finalTripName = tripName.trim() || `나의 ${destinationLocation} 여행`; // location을 destinationLocation으로 변경
    setTravelSurveyData({ ...travelsurveyData, tripName: finalTripName });
    setModalOpen(false);
    navigate('/travelsurvey2');
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
          disabled
        >
          <ImgPicker>
            <Img src={process.env.PUBLIC_URL + `/asset/sample/seoul.jpg`} disabled />
            <ComingSoonText disabled>11월 오픈 예정</ComingSoonText>
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
      <Button 
        active={isButtonActive}
        onClick={handleNextClick}
      >
        다음으로
      </Button>

      {isModalOpen && (
        <Overlay>
          <Modal>
            <ModalText>여행 이름을 지정하실래요?</ModalText>
            <Input
              type="text"
              value={tripName}
              onChange={(e) => setTripName(e.target.value.slice(0, 15))} // 15자 제한
              placeholder="최대 15자, 미입력 시 '나의 제주 여행'으로 저장"
            />
            <ButtonContainer>
              <ModalButton onClick={handleModalClose}>확인</ModalButton>
            </ButtonContainer>
          </Modal>
        </Overlay>
      )}
    </Container>
  );
};

export default TsStep1;