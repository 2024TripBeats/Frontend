import React, { useState, useEffect, useContext } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserSurveyContext } from './UsContext';

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
  gap: 10%;
  margin-top: 5%;
`;

const SurveyButton = styled.button`
  background-color: ${props => (props.selected ? '#3869E0' : '#FAFAFA')};
  color: ${props => (props.selected ? 'white' : '#252A2F')};
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
  background-color: ${props => (props.selected ? '#3869E0' : '#FAFAFA')};
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
  background-color: ${props => (props.active ? '#3869E0' : '#848484')};
  border-radius: 20px;
  font-family: "Pretendard-ExtraBold";
  border: none;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
  font-size: 13px;
  color: #FAFAFA;
  cursor: ${props => (props.active ? 'pointer' : 'not-allowed')};
`;

const UsStep3 = () => {
  const navigate = useNavigate();
  const { usersurveyData, setUserSurveyData } = useContext(UserSurveyContext);
  const [selectedSurveyButtons, setSelectedSurveyButtons] = useState(usersurveyData.prevtrips);
  const [selectedLikert, setSelectedLikert] = useState(usersurveyData.openness);
  const [isButtonActive, setIsButtonActive] = useState(false);
  
  const handleSurveyClick = (groupIndex, buttonIndex) => {
    const newSelectedButtons = [...selectedSurveyButtons]; 
    newSelectedButtons[groupIndex] = buttonIndex + 1; // 1 또는 2로 저장
    setSelectedSurveyButtons(newSelectedButtons);
  };
  
  const handleLikertClick = (index) => {
    setSelectedLikert(index); 
  };
  
  useEffect(() => {
    const allSurveysSelected = selectedSurveyButtons.every(selection => selection !== null); 
    setIsButtonActive(allSurveysSelected && selectedLikert !== 0); 
  }, [selectedSurveyButtons, selectedLikert]);


  {/* 임시 코드 */}
  const handleButtonClick = () => {
    setUserSurveyData(prevData => ({
      ...prevData,
      prevtrips: selectedSurveyButtons,
      openness: selectedLikert,
    }));
    navigate(`/usersurveyend`);
  }
  

  {/* 서버로 데이터 전송 */}
  // const handleButtonClick = async () => {
  //   if (isButtonActive) {
  //     setUserSurveyData(prevData => ({
  //       ...prevData,
  //       prevtrips: selectedSurveyButtons,
  //       openness: selectedLikert,
  //     }));

  //     try {
  //       const response = await fetch('http://localhost:8000/UserInfoSurvey', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           ...usersurveyData,
  //           prevtrips: selectedSurveyButtons,
  //           openness: selectedLikert,
  //         }),
  //       });

  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }

  //       const result = await response.json();
  //       console.log('Success:', result);

  //       navigate(`/usersurveyend`);
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   }
  // };
  
  return (
    <Container>
      <LogoContainer>
        <img style={{ width: "30%" }} 
          src={process.env.PUBLIC_URL + `asset/logo/simplelogo.png`}
          alt='logo' />
      </LogoContainer>
      <Question style={{marginTop: "5%", marginBottom: "3%"}}>어떤 여행을 주로 다니셨나요?</Question>
      <SurveyContainer>
        <SurveyButton
          selected={selectedSurveyButtons[0] === 1}
          onClick={() => handleSurveyClick(0, 0)}
        >
          단거리
        </SurveyButton>
        <SurveyButton
          selected={selectedSurveyButtons[0] === 2}
          onClick={() => handleSurveyClick(0, 1)}
        >
          원거리
        </SurveyButton>
      </SurveyContainer>
      <SurveyContainer>
        <SurveyButton
          selected={selectedSurveyButtons[1] === 1}
          onClick={() => handleSurveyClick(1, 0)}
        >
          휴식
        </SurveyButton>
        <SurveyButton
          selected={selectedSurveyButtons[1] === 2}
          onClick={() => handleSurveyClick(1, 1)}
        >
          활동형
        </SurveyButton>
      </SurveyContainer>
      <SurveyContainer style={{marginBottom:"15%"}}>
        <SurveyButton
          selected={selectedSurveyButtons[2] === 1}
          onClick={() => handleSurveyClick(2, 0)}
        >
          자연
        </SurveyButton>
        <SurveyButton
          selected={selectedSurveyButtons[2] === 2}
          onClick={() => handleSurveyClick(2, 1)}
        >
          도심
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
        설문 완료
      </Button>
    </Container>
  );
};

export default UsStep3;