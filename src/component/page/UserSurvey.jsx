import React, { useState } from 'react';
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

const Title = styled.div`
  font-size: 25px;
  font-family: "Pretendard-ExtraBold";
  color: #252A2F;
`;

const ImgPicker = styled.div`
  display: flex;
  position: relative;
  flex: 1;
  margin: 5px;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 5%;
  gap: 5%;
  width: 100%;
  flex-wrap: wrap;
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
  background-color: rgba(255, 255, 255, 0.7);
  color: black;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  margin-top: 5%;
  display: flex;
  justify-content: right;
`;

const Button = styled.button`
  width: 25%;
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

const UserSurvey = () => {
  const navigate = useNavigate();
  const [ranks, setRanks] = useState(Array(5).fill(null));

  const handleButtonClick = () => {
    navigate(`/tastesurvey`);
  };

  const handleClick = (index) => {
    const newRanks = ranks.slice();
    if (newRanks[index] !== null) {
      // 이미 클릭된 이미지를 다시 클릭하여 랭크를 제거하는 경우
      const removedRank = newRanks[index];
      newRanks[index] = null;
      // 모든 랭크를 조정하여 연속성을 유지
      for (let i = 0; i < newRanks.length; i++) {
        if (newRanks[i] > removedRank) {
          newRanks[i]--;
        }
      }
    } else {
      // 새로운 이미지를 클릭하여 랭크를 할당하는 경우
      const nextRank = newRanks.filter(rank => rank !== null).length + 1;
      newRanks[index] = nextRank;
    }
    setRanks(newRanks);
  };

  return (
    <Container>
      <Title>환영해요!👋🏻</Title>
      <Title style={{marginTop:"5%", fontSize:"20px"}}>가고 싶은 순으로</Title>
      <Title style={{fontSize:"20px"}}>여행지를 골라주세요</Title>
      <ImgContainer style={{marginTop:"10%"}}>
        <ImgPicker onClick={() => handleClick(0)}>
          <Img src={process.env.PUBLIC_URL + `/asset/survey/img1.png`} />
          {ranks[0] && <RankBadge>{ranks[0]}</RankBadge>}
        </ImgPicker>
        <ImgPicker onClick={() => handleClick(1)}>
          <Img src={process.env.PUBLIC_URL + `/asset/survey/img2.png`} />
          {ranks[1] && <RankBadge>{ranks[1]}</RankBadge>}
        </ImgPicker>
      </ImgContainer>
      <ImgContainer>
        <ImgPicker onClick={() => handleClick(2)}>
          <Img src={process.env.PUBLIC_URL + `/asset/survey/img3.png`} />
          {ranks[2] && <RankBadge>{ranks[2]}</RankBadge>}
        </ImgPicker>
        <ImgPicker onClick={() => handleClick(3)}>
          <Img src={process.env.PUBLIC_URL + `/asset/survey/img4.png`} />
          {ranks[3] && <RankBadge>{ranks[3]}</RankBadge>}
        </ImgPicker>
      </ImgContainer>
      <ImgContainer>
        <ImgPicker onClick={() => handleClick(4)}>
          <Img src={process.env.PUBLIC_URL + `/asset/survey/img5.png`} />
          {ranks[4] && <RankBadge>{ranks[4]}</RankBadge>}
        </ImgPicker>
        <ImgPicker style={{ visibility: "hidden" }}>
          <Img src={process.env.PUBLIC_URL + `/asset/survey/img1.png`} />
        </ImgPicker>
      </ImgContainer>
      {ranks.every(rank => rank !== null) && (
        <ButtonContainer>
          <Button onClick={handleButtonClick}>
            다음으로
          </Button>
        </ButtonContainer>
      )}
    </Container>
  );
};

export default UserSurvey;