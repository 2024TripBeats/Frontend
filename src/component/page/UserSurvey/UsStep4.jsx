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

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10%;
  margin-top: 5%;
  margin-left: 7%;
  margin-right: 7%;
`;

const SurveyButton = styled.button`
  background-color: ${props => (props.selected ? '#3869E0' : '#FAFAFA')};
  color: ${props => (props.selected ? 'white' : '#252A2F')};
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 10px;
  width: 30%;
  height: 50px;
  font-size: 16px;
  font-family: "Pretendard-ExtraBold";
  cursor: pointer;
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

const UsStep4 = () => {
  const navigate = useNavigate();
  const { usersurveyData, setUserSurveyData } = useContext(UserSurveyContext);
  const [selectedMusicTastes, setSelectedMusicTastes] = useState(usersurveyData.musictaste || []);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const musicCategories = [
    '발라드', '힙합', '인디', '댄스', '뉴에이지', '알앤비', '재즈', '클래식', '록',
    '팝', 'OST', 'EDM', 'CCM', 'JPOP', '트로트', '월드뮤직', '블루스', '컨트리'
  ];

  useEffect(() => {
    setIsButtonActive(selectedMusicTastes.length > 0);
  }, [selectedMusicTastes]);

  const toggleMusicTaste = (taste) => {
    const updatedMusicTastes = selectedMusicTastes.includes(taste)
      ? selectedMusicTastes.filter(item => item !== taste)
      : [...selectedMusicTastes, taste];
    setSelectedMusicTastes(updatedMusicTastes);
    setUserSurveyData({ ...usersurveyData, musictaste: updatedMusicTastes });
  };

  const handleButtonClick = () => {
    if (isButtonActive) {
      navigate(`/home`);
    }
  };

  return (
    <Container>
      <LogoContainer>
        <img style={{ width: "30%" }} 
          src={process.env.PUBLIC_URL + `asset/logo/simplelogo.png`}
          alt='logo' />
      </LogoContainer>
      <Question style={{marginTop: "5%", marginBottom: "3%"}}>어떤 여행을 주로 다니셨나요?</Question>
      {musicCategories.reduce((rows, category, index) => {
        if (index % 3 === 0) rows.push([]);
        rows[rows.length - 1].push(category);
        return rows;
      }, []).map((row, rowIndex) => (
        <SurveyContainer key={rowIndex}>
          {row.map(taste => (
            <SurveyButton
              key={taste}
              selected={selectedMusicTastes.includes(taste)}
              onClick={() => toggleMusicTaste(taste)}
            >
              {taste}
            </SurveyButton>
          ))}
        </SurveyContainer>
      ))}
      <Button active={isButtonActive} onClick={handleButtonClick}>
        설문 완료
      </Button>
    </Container>
  );
};

export default UsStep4;