import React, { useState, useContext, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { TravelSurveyContext } from './TsContext';

const TsStep5 = () => {
  const navigate = useNavigate();
  const { travelsurveyData, setTravelSurveyData } = useContext(TravelSurveyContext);
  const [mandatoryText, setMandatoryText] = useState('');
  const [stopwordsText, setStopwordsText] = useState('');
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
      const storedName = localStorage.getItem("name");
      const storedId = localStorage.getItem("id");
  
      if (storedName && storedId) {
          setName(storedName);
          setId(storedId);
      } else {
          // Handle case where data is not found in localStorage
          console.error("No user data found in localStorage");
      }
  }, []);

  const handleMandatoryChange = (e) => {
    if (e.target.value.length <= 500) {
      setMandatoryText(e.target.value);
    }
  };

  const handleStopwordsChange = (e) => {
    if (e.target.value.length <= 500) {
      setStopwordsText(e.target.value);
    }
  };

  const handleSubmit = async () => {
    const surveyDataWithId = {
      accountId: id,
      destination: travelsurveyData.destination,
      period: travelsurveyData.period,
      intensity: travelsurveyData.intensity,
      stopwords: stopwordsText,
      requirewords: mandatoryText,
    };

    setTravelSurveyData(surveyDataWithId);
    console.log(surveyDataWithId);

    try {
      const response = await fetch('http://localhost:8888/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyDataWithId),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);

      localStorage.setItem('surveyResponseReceived', 'true');

      navigate('/travelsurveyend');
    } catch (error) {
      console.error('Error:', error);
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
          <Progress width={100} />
        </ProgressBarContainer>
        <StepText>2/2 단계</StepText>
      </ProgressContainer>
      <Question>이번 여행에서</Question>
      <Question style={{color:'#FF8A1D'}}>이것만큼은 꼭 지켜야 한다고</Question>
      <Question>생각되는 희망사항을</Question>
      <Question>자유롭게 작성해주세요</Question>
      <SurveyContainer>
        <Message>반드시 포함될 요소</Message>
        <TextArea 
            name="mandatory"
            placeholder="예) 롯데월드는 꼭 갈래요"
            value={mandatoryText}
            onChange={handleMandatoryChange}
        />
        <WordCount>{mandatoryText.length}/500</WordCount>
      </SurveyContainer>
      <SurveyContainer style={{marginBottom:"20px"}}>
        <Message>포함되지 말아야 할 요소</Message>
        <TextArea 
            name="stopwords"
            placeholder="예) 클럽같은 시끄러운 곳은 싫어요"
            value={stopwordsText}
            onChange={handleStopwordsChange}
        />
        <WordCount>{stopwordsText.length}/500</WordCount>
      </SurveyContainer>
      <ButtonContainer>
        <BeforeButton onClick={() => navigate('/travelsurvey3')}>
          이전으로
        </BeforeButton>
        <Button onClick={handleSubmit}>
          여행루트 추천받기
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default TsStep5;

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
  font-size: 16px;
  font-family: "Pretendard-ExtraBold";
  color: #252a2f;
  text-align: left;
`;

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 7%;
  padding: 0 7%;
`;

const WordCount = styled.div`
  font-size: 9px;
  font-family: "Pretendard-Regular";
  color: #848484;
  text-align: right;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  font-size: 12px;
  font-family: "Pretendard-Regular";
  color: #252A2F;
  background-color: #FAFAFA;
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  margin-bottom: 7px;
  margin-top: 12px;
  padding: 10px;
  text-align: left;
  resize: none;
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
  background-color: #FF8A1D;
  border-radius: 20px;
  font-family: "Pretendard-ExtraBold";
  border: none;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  font-size: 13px;
  color: #FAFAFA;
  cursor: pointer;
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