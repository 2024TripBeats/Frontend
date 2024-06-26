import React, { useState, useEffect, useContext } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserSurveyContext } from './UsContext';

const UsStep3 = () => {
  const navigate = useNavigate();
  const { usersurveyData, setUserSurveyData } = useContext(UserSurveyContext);
  const [selectedSurveyButtons, setSelectedSurveyButtons] = useState({
    distance: usersurveyData.distance || null,
    activityLevel: usersurveyData.activityLevel || null,
    Scene: usersurveyData.Scene || null,
  });
  const [selectedLikert, setSelectedLikert] = useState(usersurveyData.openness);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleSurveyClick = (key, value) => {
    setSelectedSurveyButtons(prev => ({ ...prev, [key]: value }));
  };

  const handleLikertClick = (value) => {
    setSelectedLikert(value);
  };

  useEffect(() => {
    const allSurveysSelected = Object.values(selectedSurveyButtons).every(selection => selection !== null); 
    const likertSelected = selectedLikert !== null;
    setIsButtonActive(allSurveysSelected && likertSelected);
  }, [selectedSurveyButtons, selectedLikert]);

  const handleButtonClick = () => {
    setUserSurveyData(prevData => ({
      ...prevData,
      distance: selectedSurveyButtons.distance,
      activityLevel: selectedSurveyButtons.activityLevel,
      Scene: selectedSurveyButtons.Scene,
      openness: selectedLikert,
    }));
    navigate(`/usersurvey4`);
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
          <Progress width={60} />
        </ProgressBarContainer>
        <StepText>3/5 단계</StepText>
      </ProgressContainer>
      <Question style={{marginBottom: "3%"}}>어떤 여행을 주로 선호하셨나요?</Question>
      <SurveyContainer>
        <SurveyButton
          selected={selectedSurveyButtons.distance === 1}
          onClick={() => handleSurveyClick('distance', 1)}
        >
          단거리
        </SurveyButton>
        <SurveyButton
          selected={selectedSurveyButtons.distance === 2}
          onClick={() => handleSurveyClick('distance', 2)}
        >
          원거리
        </SurveyButton>
        <SurveyButton
          selected={selectedSurveyButtons.distance === 3}
          onClick={() => handleSurveyClick('distance', 3)}
        >
          상관없음
        </SurveyButton>
      </SurveyContainer>
      <SurveyContainer>
        <SurveyButton
          selected={selectedSurveyButtons.activityLevel === 1}
          onClick={() => handleSurveyClick('activityLevel', 1)}
        >
          휴식
        </SurveyButton>
        <SurveyButton
          selected={selectedSurveyButtons.activityLevel === 2}
          onClick={() => handleSurveyClick('activityLevel', 2)}
        >
          활동형
        </SurveyButton>
        <SurveyButton
          selected={selectedSurveyButtons.activityLevel === 3}
          onClick={() => handleSurveyClick('activityLevel', 3)}
        >
          상관없음
        </SurveyButton>
      </SurveyContainer>
      <SurveyContainer style={{marginBottom:"5%"}}>
        <SurveyButton
          selected={selectedSurveyButtons.Scene === 1}
          onClick={() => handleSurveyClick('Scene', 1)}
        >
          자연
        </SurveyButton>
        <SurveyButton
          selected={selectedSurveyButtons.Scene === 2}
          onClick={() => handleSurveyClick('Scene', 2)}
        >
          도심
        </SurveyButton>
        <SurveyButton
          selected={selectedSurveyButtons.Scene === 3}
          onClick={() => handleSurveyClick('Scene', 3)}
        >
          상관없음
        </SurveyButton>
      </SurveyContainer>
      <Question>취향과 거리가 있는</Question>
      <Question style={{ marginBottom: "3%" }}>새로운 여행지를 추천받고 싶으신가요?</Question>
      <LikertContainer>
        <Message>늘 가던곳만 가고 싶어</Message>
        <Divider />
        <Message>취향과 상관이 전혀 없는 새로운 곳을 가고 싶어</Message>
      </LikertContainer>
      <LikertContainer style={{justifyContent:'space-between'}}>
        {[1, 2, 3, 4, 5].map((value) => (
          <LikertButton
            key={value}
            selected={selectedLikert === value}
            onClick={() => handleLikertClick(value)}
          />
        ))}
      </LikertContainer>
      <Button active={isButtonActive} onClick={handleButtonClick}>
        다음으로
      </Button>
    </Container>
  );
};

export default UsStep3;

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
  font-size: 13px;
  font-family: "Pretendard-Medium";
  color: #252A2F;
`;

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5%;
  margin-top: 4%;
  margin-left: 7%;
  margin-right: 7%;
`;

const SurveyButton = styled.button`
  background-color: ${props => (props.selected ? '#252a2f' : '#FAFAFA')};
  color: ${props => (props.selected ? '#FAFAFA' : '#252A2F')};
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 10px;
  width: 35%;
  height: 50px;
  font-size: 16px;
  font-family: "Pretendard-ExtraBold";
`;

const LikertContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 5%;
  gap: 7%;
  padding: 0 7%;
`;

const LikertButton = styled.button`
  background-color: ${props => (props.selected ? '#252a2f' : '#FAFAFA')};
  width: 15px;  
  height: 15px;  
  border-radius: 50%;  
  box-shadow: 0 0 1.5px rgba(0, 0, 0, 0.6);
  border: none;
  cursor: pointer;
`;

const Divider = styled.hr`
  border: none;
  height: 0.5px;
  background-color: #252a2f;
  width: 100%;
`;

const Button = styled.button`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 60px;
  background-color: ${props => (props.active ? '#ff8a1d' : '#848484')};
  border-radius: 20px;
  font-family: "Pretendard-ExtraBold";
  border: none;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
  font-size: 13px;
  color: #FAFAFA;
  cursor: ${props => (props.active ? 'pointer' : 'not-allowed')};
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