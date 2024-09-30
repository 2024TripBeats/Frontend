import React from 'react';
import styled from "styled-components";
import { useNavigate, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FAFAFA;
  box-sizing: border-box;
  align-items: center;
  width: 500px;
  box-sizing: border-box;
`;

const LogoContainer = styled.div`
  margin-top: 8%;
  margin-bottom: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 7%;
  width: 100%;
  box-sizing: border-box;
`;

const TravelItemContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
  box-sizing: border-box;
`;

const Day = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 16px;
  color: #252a2f;
  margin-right: 10px;
  background-color: #FF8A1D;
  text-align: center;
  border-radius: 5px;
  padding: 5px 20px;  
  margin-bottom: 15px;
`;

const DayContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 25px;
  flex-direction: column;
  width: 100%;
`;

const CircleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Circle = styled.div`
  min-width: 60px;
  min-height: 60px;
  border-radius: 50%;
  background-color: #e7e7e7;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => (props.isSelected ? '#FAFAFA' : '#252a2f')};
  border: none;
  font-family: "Pretendard-Bold";
  font-size: 13px;
  flex-shrink: 0;
  padding: 10px;
  box-sizing: border-box;
`;

const Line = styled.div`
  width: 5px;
  height: 40px;
  background-color: #e7e7e7;
`;

const MusicContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const MusicTitle = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 12px;
  color: #252a2f;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const MusicSinger = styled.div`
  font-family: "Pretendard-Medium";
  font-size: 12px;
  color: #252a2f;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const TravelDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
  gap: 5px;
  cursor: pointer;
`;

const DestName = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 18px;
  color: #252a2f;
`;

const PriceInfo = styled.div`
  font-family: "Pretendard-Medium";
  font-size: 11px;
  color: #757575;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const FloatingButton = styled.button.attrs({
  className: 'no-capture'
})`
  padding: 10px 20px;
  background-color: #252a2f;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-family: "Pretendard-ExtraBold";
  font-size: 13px;
`;

const HomeButton = styled.button.attrs({
  className: 'no-capture'
})`
  padding: 10px 20px;
  background-color: #252a2f;
  border: none;
  border-radius: 5px;
  color: #fafafa;
  cursor: pointer;
  font-family: "Pretendard-ExtraBold";
  font-size: 13px;
`;

const RouteFix = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { itinerary } = location.state || {};

  console.log(itinerary);

  const handleSaveImageClick = () => {
    html2canvas(document.querySelector("#route-fix-container"), {
      ignoreElements: (element) => element.classList.contains("no-capture")
    }).then(canvas => {
      const link = document.createElement("a");
      link.download = "route.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const convertDayKeyToKorean = (dayNumber) => {
    return `${dayNumber}일차`;
  };

  if (!itinerary || itinerary.length === 0) {
    return <div>일정 정보가 없습니다.</div>;
  }

  return (
    <Container id="route-fix-container">
      <LogoContainer>
        <img style={{ width: "30%" }} 
          src={process.env.PUBLIC_URL + '/asset/logo/logo.png'}
          alt='logo' />
      </LogoContainer>
      <ButtonContainer>
        <HomeButton onClick={() => navigate('/home')}>🏠 메인으로 돌아가기</HomeButton>
        <FloatingButton onClick={handleSaveImageClick}>💾 저장</FloatingButton>
      </ButtonContainer>
      <ContentContainer>
        {itinerary.map((day, dayIndex) => (
          <DayContainer key={dayIndex}>
            <Day>{convertDayKeyToKorean(day.dayNumber)}</Day>
            {day.places.map((destination, index) => (
              <React.Fragment key={destination.placeId}>
                <TravelItemContainer>
                  <CircleContainer>
                    <Circle>{destination.duration}분</Circle>
                  </CircleContainer>
                  <TravelDetails>
                    <DestName>{destination.placeName}</DestName>
                    {destination.price > 0 && (
                      <PriceInfo>예상 경비 | {destination.price.toLocaleString()}원</PriceInfo>
                    )}
                    {destination.music_bool && (
                      <MusicContainer>
                        <img style={{ width: "14px" }} src={process.env.PUBLIC_URL + '/asset/icon/musicplay.png'} alt="music-icon" />
                        <MusicTitle>{destination.song_title}</MusicTitle>
                        <MusicSinger>{destination.artist_name}</MusicSinger>
                      </MusicContainer>
                    )}
                  </TravelDetails>
                </TravelItemContainer>
                {index < day.places.length - 1 && (
                  <div style={{ display: 'flex', justifyContent: 'left', width: '100%', alignItems: 'center', marginLeft: '27px' }}>
                    <div style={{ height: '20px', width: '7px', backgroundColor: '#e7e7e7' }}></div>
                    <div style={{ marginLeft: '10px', fontFamily: 'Pretendard-Regular', fontSize: '10px', color: '#575757', justifyItems: 'center' }}>
                      {day.travelSegments[index]?.distance.toFixed(2)}km
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </DayContainer>
        ))}
      </ContentContainer>
    </Container>
  );
};

export default RouteFix;