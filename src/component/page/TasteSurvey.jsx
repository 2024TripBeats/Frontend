import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 15%;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #D3E8F7;
  box-sizing: border-box;
`;

const Question = styled.div`
  font-size: 20px;
  font-family: "Pretendard-ExtraBold";
  color: #252A2F;
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
  background-color: ${props => (props.selected ? '#83a5c6' : 'white')};
  color: ${props => (props.selected ? 'white' : '#252A2F')};
  border: none;
  border-radius: 10px;
  width: 35%;
  height: 35px;
  font-size: 16px;
  font-family: "Pretendard-ExtraBold";
`;

const LikertContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 7%;
  margin-top: 5%;
`;

const LikertButton = styled.button`
  background-color: ${props => (props.selected ? '#83a5c6' : 'white')};
  color: ${props => (props.selected ? 'white' : '#252A2F')};
  width: 20px;  /* 수정된 크기 */
  height: 20px;  /* 수정된 크기 */
  border-radius: 50%;  /* 원형을 유지 */
  border: 0.5px solid #252A2F;
  cursor: pointer;  /* 커서 변경 */
`;

const Divider = styled.hr`
  border: none;
  height: 0.5px;
  background-color: #252a2f;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin-top: 5%;
  display: flex;
  justify-content: right;
`;

const Button = styled.button`
  width: auto;
  height: 30px;
  margin: 10px;
  background-color: #ffffff;
  border-radius: 20px;
  font-family: "Pretendard-ExtraBold";
  border: none;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  font-size: 15px;
  color: #6d9bca;
`;

const TasteSurvey = () => {
  const navigate = useNavigate();
  const [selectedSurveyButtons, setSelectedSurveyButtons] = useState([null, null, null]);
  const [selectedLikert, setSelectedLikert] = useState(0);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  
  const handleSurveyClick = (groupIndex, buttonIndex) => {
    const newSelectedButtons = [...selectedSurveyButtons]; // 기존 상태 배열을 복사
    newSelectedButtons[groupIndex] = buttonIndex; // 해당 그룹 인덱스의 값을 클릭된 버튼 인덱스로 설정
    setSelectedSurveyButtons(newSelectedButtons); // 새로운 상태 배열로 상태 업데이트
  };
  
  const handleLikertClick = (index) => {
    setSelectedLikert(index); // 클릭된 Likert 버튼의 인덱스로 상태 업데이트
  };
  
  useEffect(() => {
    const allSurveysSelected = selectedSurveyButtons.every(selection => selection !== null); 
    // 모든 설문 그룹에서 버튼이 선택되었는지 확인 (배열의 모든 요소가 null이 아닌지 확인)
    setIsButtonVisible(allSurveysSelected && selectedLikert !== 0); 
    // 모든 설문 그룹이 선택되었고 Likert 척도에서 선택된 값이 있는 경우에만 '서비스 시작하기' 버튼을 보이게 설정
  }, [selectedSurveyButtons, selectedLikert]); 
  // selectedSurveyButtons와 selectedLikert 상태가 변경될 때마다 이 useEffect 훅이 실행됨
  
  const handleButtonClick = () => {
    navigate(`/home`); // '서비스 시작하기' 버튼 클릭 시 '/home' 경로로 이동
  };
  

  return (
    <Container>
      <Question>어떤 여행을 주로 다니셨나요?</Question>
      <SurveyContainer>
        <SurveyButton
          selected={selectedSurveyButtons[0] === 0}
          onClick={() => handleSurveyClick(0, 0)}
        >
          단거리
        </SurveyButton>
        <SurveyButton
          selected={selectedSurveyButtons[0] === 1}
          onClick={() => handleSurveyClick(0, 1)}
        >
          원거리
        </SurveyButton>
      </SurveyContainer>
      <SurveyContainer>
        <SurveyButton
          selected={selectedSurveyButtons[1] === 0}
          onClick={() => handleSurveyClick(1, 0)}
        >
          휴식
        </SurveyButton>
        <SurveyButton
          selected={selectedSurveyButtons[1] === 1}
          onClick={() => handleSurveyClick(1, 1)}
        >
          활동형
        </SurveyButton>
      </SurveyContainer>
      <SurveyContainer style={{marginBottom:"15%"}}>
        <SurveyButton
          selected={selectedSurveyButtons[2] === 0}
          onClick={() => handleSurveyClick(2, 0)}
        >
          자연
        </SurveyButton>
        <SurveyButton
          selected={selectedSurveyButtons[2] === 1}
          onClick={() => handleSurveyClick(2, 1)}
        >
          도심
        </SurveyButton>
      </SurveyContainer>
      <Question>취향과 거리가 있는</Question>
      <Question>새로운 여행지를 추천받고 싶으신가요?</Question>
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
      {isButtonVisible && (
        <ButtonContainer>
          <Button onClick={handleButtonClick}>
            서비스 시작하기
          </Button>
        </ButtonContainer>
      )}
    </Container>
  );
};

export default TasteSurvey;