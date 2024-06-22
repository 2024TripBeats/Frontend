import React, { useState, useContext, useEffect } from 'react';
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

const PickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 7%;
`;

const Question = styled.div`
  font-size: 18px;
  font-family: "Pretendard-ExtraBold";
  color: #252a2f;
  text-align: center;
`;

const ImgPicker = styled.div`
  display: flex;
  position: relative;
  flex: 1;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 5%;
  width: 100%;
  flex-wrap: wrap;
  gap: 5%;
`;

const Img = styled.img`
  width: 100%;
  border-radius: 5%;
  position: relative;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
`;

const RankBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #3869E0;
  color: #FAFAFA;
  border-radius: 4px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-family: "Pretendard-ExtraBold";
  font-size: 12px;
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
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  font-size: 13px;
  color: #FAFAFA;
  cursor: ${props => (props.active ? 'pointer' : 'not-allowed')};
`;

const UsStep2 = () => {
  const navigate = useNavigate();
  const { usersurveyData, setUserSurveyData } = useContext(UserSurveyContext);
  const [desranks, setDesranks] = useState(usersurveyData.desranks);

  useEffect(() => {
    setUserSurveyData(prevData => ({ ...prevData, desranks }));
  }, [desranks, setUserSurveyData]);

  const handleButtonClick = () => {
    if (desranks.every(rank => rank !== null)) {
      navigate('/usersurvey3');
    }
  };

  const handleClick = (index) => {
    setDesranks((prevRanks) => {
      const newRanks = [...prevRanks];
      const currentRank = newRanks[index];

      if (currentRank !== null) {
        // Remove rank and adjust others
        newRanks[index] = null;
        for (let i = 0; i < newRanks.length; i++) {
          if (newRanks[i] !== null && newRanks[i] > currentRank) {
            newRanks[i]--;
          }
        }
      } else {
        // Assign next available rank
        const nextRank = newRanks.filter(rank => rank !== null).length + 1;
        newRanks[index] = nextRank;
      }
      
      return newRanks;
    });
  };

  const allSelected = desranks.every(rank => rank !== null);

  return (
    <Container>
      <LogoContainer>
        <img style={{ width: "30%" }} 
          src={process.env.PUBLIC_URL + `asset/logo/simplelogo.png`}
          alt='logo' />
      </LogoContainer>
      <Question style={{ marginTop: "5%" }}>가고 싶은 순으로</Question>
      <Question style={{ marginBottom: "3%" }}>여행지를 골라주세요</Question>
      <PickerContainer>
        <ImgContainer>
          <ImgPicker onClick={() => handleClick(0)}>
            <Img src={process.env.PUBLIC_URL + `/asset/survey/img1.png`} />
            {desranks[0] && <RankBadge>{desranks[0]}</RankBadge>}
          </ImgPicker>
          <ImgPicker onClick={() => handleClick(1)}>
            <Img src={process.env.PUBLIC_URL + `/asset/survey/img2.png`} />
            {desranks[1] && <RankBadge>{desranks[1]}</RankBadge>}
          </ImgPicker>
        </ImgContainer>
        <ImgContainer>
          <ImgPicker onClick={() => handleClick(2)}>
            <Img src={process.env.PUBLIC_URL + `/asset/survey/img3.png`} />
            {desranks[2] && <RankBadge>{desranks[2]}</RankBadge>}
          </ImgPicker>
          <ImgPicker onClick={() => handleClick(3)}>
            <Img src={process.env.PUBLIC_URL + `/asset/survey/img4.png`} />
            {desranks[3] && <RankBadge>{desranks[3]}</RankBadge>}
          </ImgPicker>
        </ImgContainer>
        <ImgContainer>
          <ImgPicker onClick={() => handleClick(4)}>
            <Img src={process.env.PUBLIC_URL + `/asset/survey/img5.png`} />
            {desranks[4] && <RankBadge>{desranks[4]}</RankBadge>}
          </ImgPicker>
          <ImgPicker style={{ visibility: "hidden" }}>
            <Img src={process.env.PUBLIC_URL + `/asset/survey/img1.png`} />
          </ImgPicker>
        </ImgContainer>
      </PickerContainer>
      <Button active={allSelected} onClick={handleButtonClick}>
        다음으로
      </Button>
    </Container>
  );
};

export default UsStep2;