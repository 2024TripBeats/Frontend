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
    const [id, setId] = useState("");
  
    useEffect(() => {
        const storedId = localStorage.getItem("id");
    
        if (storedId) {
            setId(storedId);
        } else {
            // Handle case where data is not found in localStorage
            console.error("No user data found in localStorage");
        }
    }, []);
  
    // 임시 해시태그 데이터
    const hashtags = [
        "기분전환",
        "힐링",
        "드라이브",
        "사랑",
        "추억",
        "위로",
        "감성",
        "스트레스해소",
        "휴식",
        "운동",
        "이별",
        "공부",
        "몽환",
        "비오는날",
        "트렌디",
        "설렘",
        "여유",
        "기대감",
        "분노",
        "아픔",
        "웅장함"
    ];
  
    // 선택된 태그가 변경될 때마다 버튼 활성화 여부 업데이트
    useEffect(() => {
        setIsButtonActive(selectedTags.length > 0);
    }, [selectedTags]);
  
    // 선택된 태그 토글
    const toggleTag = (tag) => {
        const updatedTags = selectedTags.includes(tag)
            ? selectedTags.filter(item => item !== tag)
            : [...selectedTags, tag];
        setSelectedTags(updatedTags);
        setUserSurveyData({ ...usersurveyData, musicTags: updatedTags });
    };
  
    // 설문 완료 버튼 클릭 시 서버에 데이터 전송
    const handleButtonClick = async () => {
        const surveyDataWithId = {
            accountId: id,
            email: usersurveyData.email,
            phoneNumber: usersurveyData.phoneNumber,
            gender: usersurveyData.gender,
            age: usersurveyData.age,
            travelSpots: usersurveyData.travelSpots, // 여행지
            distance: usersurveyData.distance,
            activityLevel: usersurveyData.activityLevel,
            scene: usersurveyData.Scene,
            openness: usersurveyData.openness,
            musicGenres: usersurveyData.musicGenre,
            genreOpenness: usersurveyData.genreOpenness,
            musicTags: selectedTags,
            tagOpenness: tagOpenness,
        };

        setUserSurveyData(surveyDataWithId);

        if (isButtonActive) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/surveys`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(surveyDataWithId)
                });

                if (response.ok) {
                    navigate(`/usersurveyend`);
                } else {
                    console.error('Failed to submit survey data:', response.statusText);
                }
            } catch (error) {
                console.error('Error submitting survey data:', error);
            }
        }
    };

    // 더보기 버튼 클릭 시 해시태그 목록 더보기
    const handleShowMore = () => {
        setShowMore(!showMore);
    };
  
    return (
        <Container>
            <LogoContainer>
                <img 
                    style={{ width: "30%" }} 
                    src={process.env.PUBLIC_URL + '/asset/logo/logo.png'}
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
                      # {tag}
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
                        onChange={(e) => setTagOpenness(Number(e.target.value))} 
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
  max-height: ${props => (props.showMore ? 'none' : '100px')};
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
    }`;