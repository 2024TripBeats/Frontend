import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { TravelSurveyContext } from './TsContext';

const Accomodation = () => {
  const navigate = useNavigate();
  const { travelsurveyData, setTravelSurveyData } = useContext(TravelSurveyContext);
  const [selectedAccommodations, setSelectedAccommodations] = useState(travelsurveyData.accomodation || []);
  const [requiredAccomText, setRequiredAccomText] = useState(travelsurveyData.requiredAccomText || '');
  const [accomPriority, setAccomPriority] = useState(travelsurveyData.accompriority || '');

  const toggleAccommodation = (id) => {
    const updatedAccommodations = selectedAccommodations.includes(id)
      ? selectedAccommodations.filter(accomId => accomId !== id)
      : [...selectedAccommodations, id];
    setSelectedAccommodations(updatedAccommodations);
    setTravelSurveyData({ ...travelsurveyData, accomodation: updatedAccommodations });
  };

  const handleNextClick = () => {
    if (selectedAccommodations.length > 0 && accomPriority) {
      setTravelSurveyData({
        ...travelsurveyData,
        requiredAccomText: requiredAccomText || "",
        accompriority: accomPriority,
      });
      navigate('/restcafe');
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
          <Progress width={57.14} />
        </ProgressBarContainer>
        <StepText>4/7 단계</StepText>
      </ProgressContainer>
      <Question>필요한 숙박 옵션을 선택해주세요</Question>
      <Message>*다중 선택 가능</Message>

      <Row>
  <OptionButton onClick={() => toggleAccommodation('주차시설')} active={selectedAccommodations.includes('주차시설')}>주차시설</OptionButton>
  <OptionButton onClick={() => toggleAccommodation('사우나')} active={selectedAccommodations.includes('사우나')}>사우나</OptionButton>
  <OptionButton onClick={() => toggleAccommodation('수영장')} active={selectedAccommodations.includes('수영장')}>수영장</OptionButton>
</Row>
<Row>
  <OptionButton onClick={() => toggleAccommodation('20평 이상')} active={selectedAccommodations.includes('20평 이상')}>20평 이상</OptionButton>
  <OptionButton onClick={() => toggleAccommodation('20평 ~ 10평')} active={selectedAccommodations.includes('20평 ~ 10평')}>20평 ~ 10평</OptionButton>
  <OptionButton onClick={() => toggleAccommodation('10평 이하')} active={selectedAccommodations.includes('10평 이하')}>10평 이하</OptionButton>
</Row>
<Row>
  <OptionButton onClick={() => toggleAccommodation('조식')} active={selectedAccommodations.includes('조식')}>조식</OptionButton>
  <OptionButton onClick={() => toggleAccommodation('조리 가능')} active={selectedAccommodations.includes('조리 가능')}>조리 가능</OptionButton>
  <OptionButton onClick={() => toggleAccommodation('바베큐장')} active={selectedAccommodations.includes('바베큐장')}>바베큐장</OptionButton>
</Row>

      <InputContainer>
        <Question style={{fontSize: "13px"}}>필요 설비:</Question>
        <Input
          type="text"
          placeholder="드라이기, tv와 같이 설비 사이에 쉼표(,)를 써주세요."
          value={requiredAccomText}
          onChange={(e) => setRequiredAccomText(e.target.value)}
        />
      </InputContainer>

      <Question>숙박 시설을 고르는 기준 중</Question>
      <Question style={{marginBottom: '25px'}}>더 중요한 것을 골라주세요.</Question>

      <Row>
        <OptionButton onClick={() => setAccomPriority('좋은 품질')} active={accomPriority === '좋은 품질'}>좋은 품질</OptionButton>
        <OptionButton onClick={() => setAccomPriority('가성비')} active={accomPriority === '가성비'}>가성비</OptionButton>
      </Row>

      <ButtonContainer>
        <BeforeButton onClick={() => navigate('/intensity')}>이전으로</BeforeButton>
        <Button
          active={selectedAccommodations.length > 0 && accomPriority} 
          onClick={handleNextClick}
        >
          다음으로
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default Accomodation;

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
  font-size: 10px;
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