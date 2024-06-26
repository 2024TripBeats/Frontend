import React, { useState, useEffect, useContext } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserSurveyContext } from './UsContext';

const UsStep5 = () => {
    const navigate = useNavigate();
    const { usersurveyData, setUserSurveyData } = useContext(UserSurveyContext);
    const [selectedTags, setSelectedTags] = useState(usersurveyData.musicTags || []);
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [tagOpenness, setTagOpenness] = useState(usersurveyData.tagOpenness || 1);
  
    const [name, setName] = useState("");

    useEffect(() => {
      const storedName = localStorage.getItem("name");
  
      if (storedName && storedId) {
        setName(storedName);
      } else {
        // Handle case where data is not found in localStorage
        console.error("No user data found in localStorage");
      }
    }, []);

    const hashtags = [
        '#젊음의기억', '#미래와희망', '#성장과변화', '#나를찾아가는여정', '#순수한감성', '#따뜻함',
        '#잔잔한위로', '#평온한시간', '#감성적인', '#희망찬', '#아련한추억', '#감동적인', 
        '#언제나함께', '#포근한기억', '#내면의여행'
    ];
  
    useEffect(() => {
      setIsButtonActive(selectedTags.length > 0);
    }, [selectedTags]);
  
    const toggleTag = (tag) => {
      const updatedTags = selectedTags.includes(tag)
        ? selectedTags.filter(item => item !== tag)
        : [...selectedTags, tag];
      setSelectedTags(updatedTags);
      setUserSurveyData({ ...usersurveyData, musicTags: updatedTags });
    };
  
    const handleButtonClick = () => {
      setUserSurveyData({ ...usersurveyData, tagOpenness });
      if (isButtonActive) {
        navigate(`/usersurveyend`);
      }
    };
  
    const handleShowMore = () => {
      setShowMore(!showMore);
    };
  
    return (
      <Container>
        <LogoContainer>
          <img 
            style={{ width: "30%" }} 
            src={process.env.PUBLIC_URL + '/asset/logo/simplelogo.png'}
            alt='logo' 
          />
        </LogoContainer>
        <ProgressContainer>
          <ProgressBarContainer>
            <Progress width={100} />
          </ProgressBarContainer>
          <StepText>5/5 단계</StepText>
        </ProgressContainer>
        <Question style={{ marginBottom: "3%" }}>어떤 해시태그의 음악을 주로 들으시나요?</Question>
        <SurveyContainer showMore={showMore}>
          {hashtags.map(tag => (
            <SurveyButton
              key={tag}
              selected={selectedTags.includes(tag)}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </SurveyButton>
          ))}
        </SurveyContainer>
        <ShowMoreButton onClick={handleShowMore}>
          {showMore ? '▲ 접기' : '▼ 더보기'}
        </ShowMoreButton>
        <SliderContainer>
          <Question>해시태그 취향과 거리가 있는 음악을 듣고싶으신가요?</Question>
          <SliderWrapper>
            <SliderLabel>아니오</SliderLabel>
            <Slider 
              type="range" 
              min="1" 
              max="5" 
              value={tagOpenness} 
              onChange={(e) => setTagOpenness(e.target.value)} 
            />
            <SliderLabel>네</SliderLabel>
          </SliderWrapper>
        </SliderContainer>
        <Button active={isButtonActive} onClick={handleButtonClick}>
          설문 완료
        </Button>
      </Container>
    );
};

export default UsStep5;

// Styled Components
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
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 5%;
  margin-left: 7%;
  margin-right: 7%;
  overflow: hidden;
  max-height: ${props => (props.showMore ? 'none' : '200px')};
`;

const SurveyButton = styled.button`
  background-color: ${props => (props.selected ? '#252a2f' : '#FAFAFA')};
  color: ${props => (props.selected ? '#FAFAFA' : '#252A2F')};
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 10px;
  padding: 4px 9px;
  font-size: 13px;
  font-family: "Pretendard-SemiBold";
  cursor: pointer;
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

const ShowMoreButton = styled.button`
  background-color: #FaFAFA;
  color: #c4c4c4;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 10px;
  font-family: "Pretendard-Medium";
  cursor: pointer;
  margin-top: 10px;
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 100px;
`;

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin-top: 4%;
`;

const SliderLabel = styled.div`
  font-size: 14px;
  font-family: "Pretendard-Medium";
  color: #252a2f;
`;

const Slider = styled.input`
  -webkit-appearance: none;
  width: 70%; 
  height: 7px; 
  background: #d5d5d5;
  transition: background .2s;
  border-radius: 4px;

  &:hover {
    background: #d5d5d5;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    background: #252a2f;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    margin-top: -2.5px;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #ff8a1d;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  }

  &::-ms-thumb {
    width: 20px;
    height: 20px;
    background: #ff8a1d;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    margin-top: 0;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 7px;
    cursor: pointer;
    background: #dedede;
    border-radius: 4px;
  }

  &::-moz-range-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    background: #ffd1a6;
    border-radius: 4px;
  }

  &::-ms-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    background: #ffd1a6;
    border-radius: 4px;
    border-color: transparent;
    color: transparent;
  }
`;