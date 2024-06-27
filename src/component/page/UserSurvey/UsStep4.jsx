import React, { useState, useEffect, useContext } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserSurveyContext } from './UsContext';

const UsStep4 = () => {
  const navigate = useNavigate();
  const { usersurveyData, setUserSurveyData } = useContext(UserSurveyContext);
  const [selectedMusicGenres, setSelectedMusicGenres] = useState(usersurveyData.musicGenre || []);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [genreOpenness, setGenreOpenness] = useState(usersurveyData.genreOpenness || 1);

  const musicCategories = [
    'POP', 
    '댄스',
    '랩/힙합',
    '일렉트로니카',
    '발라드',
    'R&B/Soul',
    '록/메탈',
    '인디음악',
    '성인가요/트로트',
    '포크/블루스',
    '재즈',
    '국내드라마',
    'J-POP',
    '애니메이션/웹툰',
    '국외영화',
    '보컬재즈',
    '애시드/퓨전/팝',
    '뉴에이지',
    '컨트리',
    '-'
  ];

  useEffect(() => {
    setIsButtonActive(selectedMusicGenres.length > 0);
  }, [selectedMusicGenres]);

  const toggleMusicGenre = (genre) => {
    const updatedMusicGenres = selectedMusicGenres.includes(genre)
      ? selectedMusicGenres.filter(item => item !== genre)
      : [...selectedMusicGenres, genre];
    setSelectedMusicGenres(updatedMusicGenres);
    setUserSurveyData({ ...usersurveyData, musicGenre: updatedMusicGenres });
  };

  const handleButtonClick = () => {
    setUserSurveyData({ ...usersurveyData, genreOpenness });
    if (isButtonActive) {
      navigate(`/usersurvey5`);
    }
  };

  const handleShowMore = () => {
    setShowMore(!showMore);
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
          <Progress width={80} />
        </ProgressBarContainer>
        <StepText>4/5 단계</StepText>
      </ProgressContainer>
      <Question style={{marginBottom: "3%"}}>어떤 음악을 주로 들으시나요?</Question>
      {musicCategories.reduce((rows, category, index) => {
        if (index % 4 === 0) rows.push([]);
        rows[rows.length - 1].push(category);
        return rows;
      }, []).map((row, rowIndex) => (
        <SurveyContainer key={rowIndex} style={{ display: showMore || rowIndex < 2 ? 'flex' : 'none' }}>
          {row.map(genre => (
            <SurveyButton
              key={genre}
              selected={selectedMusicGenres.includes(genre)}
              onClick={() => toggleMusicGenre(genre)}
            >
              {genre === '-' ? '그 외' : genre}
            </SurveyButton>
          ))}
        </SurveyContainer>
      ))}
      <ShowMoreButton onClick={handleShowMore}>
        {showMore ? '▲ 접기' : '▼ 더보기'}
      </ShowMoreButton>
      <SliderContainer>
        <Question>장르 취향과 거리가 있는 음악을 듣고싶으신가요?</Question>
        <SliderWrapper>
          <SliderLabel>아니오</SliderLabel>
          <Slider 
            type="range" 
            min="1" 
            max="5" 
            value={genreOpenness} 
            onChange={(e) => setGenreOpenness(e.target.value)} 
          />
          <SliderLabel>네</SliderLabel>
        </SliderWrapper>
      </SliderContainer>
      <Button active={isButtonActive} onClick={handleButtonClick}>
        다음으로
      </Button>
    </Container>
  );
};

export default UsStep4;

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
  gap: 5%;
  margin-top: 5%;
  margin-left: 7%;
  margin-right: 7%;
`;

const SurveyButton = styled.button`
  background-color: ${props => (props.selected ? '#252a2f' : '#FAFAFA')};
  color: ${props => (props.selected ? '#FAFAFA' : '#252A2F')};
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 10px;
  width: 30%;
  height: 50px;
  font-size: 13px;
  font-family: "Pretendard-ExtraBold";
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
  /* appearance: none; */
  width: 70%; /* Full-width */
  height: 7px; /* Specified height */
  background: #d5d5d5;
  /* outline: none; */
  transition: background .2s; /* Transition for the background */
  border-radius: 4px; /* Rounded corners */

  &:hover {
    background: #d5d5d5; /* Slightly darker orange when hovered */
  }

  /* Chrome, Safari, and Opera */
  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 14px; /* Specified thumb width */
    height: 14px; /* Specified thumb height */
    background: #252a2f; /* Orange background for the thumb */
    cursor: pointer; /* Cursor on hover */
    border-radius: 50%; /* Rounded corners */
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5); /* Add a subtle shadow */
    margin-top: -2.5px; /* Center the thumb */
  }

  /* Firefox */
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #ff8a1d;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  }

  /* IE */
  &::-ms-thumb {
    width: 20px;
    height: 20px;
    background: #ff8a1d;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    margin-top: 0; /* Reset any margin */
  }

  /* Slider track styling for WebKit */
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 7px;
    cursor: pointer;
    background: #dedede; /* Light orange background for the track */
    border-radius: 4px;
  }

  /* Slider track styling for Firefox */
  &::-moz-range-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    background: #ffd1a6;
    border-radius: 4px;
  }

  /* Slider track styling for IE */
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