import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { TravelSurveyContext } from './TsContext';

const TsStep51 = () => {
  const navigate = useNavigate();
  const { travelsurveyData, setTravelSurveyData } = useContext(TravelSurveyContext);
  
  // Context에서 선택된 카테고리를 가져오고 초기 상태로 설정
  const [selectedCategories, setSelectedCategories] = useState(travelsurveyData.travelCategory || []);

  // 카테고리 선택/해제 로직
  const toggleCategory = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(cat => cat !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
    setTravelSurveyData({ ...travelsurveyData, travelCategory: updatedCategories });
  };

  // 다음 버튼 클릭 시 로직
  const handleNextClick = () => {
    if (selectedCategories.length > 0) {
      setTravelSurveyData({
        ...travelsurveyData,
        travelCategory: selectedCategories,
      });
      navigate('/travelsurvey5');  // 다음 페이지로 이동
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
          <Progress width={85.71} />
        </ProgressBarContainer>
        <StepText>6/7 단계</StepText>
      </ProgressContainer>
      <Question>선호하는 여행지 카테고리를</Question>
      <Question>선택해주세요</Question>
      <Message>*다중 선택 가능</Message>

      <Row>
        <OptionButton onClick={() => toggleCategory('자연관광지')} active={selectedCategories.includes('자연관광지')}>자연관광지</OptionButton>
        <OptionButton onClick={() => toggleCategory('레저스포츠')} active={selectedCategories.includes('레저스포츠')}>레저스포츠</OptionButton>
      </Row>
      <Row>
        <OptionButton style={{width: "200px"}} onClick={() => toggleCategory('전시회, 박물관 등 문화시설')} active={selectedCategories.includes('전시회, 박물관 등 문화시설')}>전시회, 박물관 등 문화시설</OptionButton>
      </Row>
      <Row>
        <OptionButton onClick={() => toggleCategory('테마파크')} active={selectedCategories.includes('테마파크')}>테마파크</OptionButton>
        <OptionButton onClick={() => toggleCategory('역사유적지')} active={selectedCategories.includes('역사유적지')}>역사유적지</OptionButton>
      </Row>

      <ButtonContainer>
        <BeforeButton onClick={() => navigate('/travelsurvey4')}>이전으로</BeforeButton>
        <Button
          active={selectedCategories.length > 0}
          onClick={handleNextClick}
        >
          다음으로
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default TsStep51;

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
  width: 120px;
  height: 40px;
  font-size: 13px;
  font-family: "Pretendard-Bold";
  cursor: pointer;
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