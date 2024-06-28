import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate, useLocation } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FAFAFA;
  box-sizing: border-box;
  align-items: center;
  max-width: 500px;
`;

const Message = styled.div`
  font-size: 18px;
  font-family: "Pretendard-ExtraBold";
  color: #252a2f;
  text-align: center;
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
  box-sizing: border-box;
`;

const ImageContainer = styled.div`
  margin-top: 5%;
  display: flex;
  background-color: #FAFAFA;
  box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 220px;
  border-radius: 10px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
`;

const Image = styled.img`
  flex-shrink: 0;
  width: 50%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px 0 0 10px;
`;

const DetailsContainer = styled.div`
  flex-shrink: 0;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  padding: 0 10px;
  box-sizing: border-box;
  gap: 10px;
`;

const DestName = styled.div`
  font-family: "Pretendard-ExtraBold";
  font-size: 18px;
  color: #252a2f;
`;

const DestDetails = styled.div`
  font-family: "Pretendard-Medium";
  font-size: 12px;
  color: #252a2f;
`;

const DetailButton = styled.button`
  font-family: "Pretendard-SemiBold";
  font-size: 9px;
  margin-top: 10px;
  color: #252a2f;
  border: none;
  border-radius: 20px;
  background-color: #e7e7e7;
  width: 40%;
  height: 20px;
  cursor: pointer;
`;

const RouteBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
`;

const RouteContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  max-width: 375px;
  gap: 2px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 50px;
`;

const FixButton = styled.button`
  padding: 10px 60px;
  background-color: #FF8A1D;
  border-radius: 20px;
  font-family: "Pretendard-ExtraBold";
  border: none;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  font-size: 13px;
  color: #FAFAFA;
  cursor: pointer;
`;

const EditButton = styled.button`
  padding: 10px 40px;
  background-color: #FAFAFA;
  border-radius: 20px;
  font-family: "Pretendard-ExtraBold";
  border: none;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  font-size: 13px;
  color: #252a2f;
  cursor: pointer;
`;

const TravelPathContainer = styled.div`
  display: flex;
  overflow-x: auto;
  width: 100%;
  height: 95px;
  max-width: 375px;
  margin: 9px 0;
  white-space: nowrap;
  background-color: #FAFAFA;
  border-radius: 20px;
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
`;

const PathLine = styled.div`
  display: inline-flex;
  align-items: center;
  width: max-content;
`;

const Day = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 12px;
  color: #252a2f;
  margin-right: 10px;
  white-space: nowrap;
`;

const MusicContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  gap: 5%;
`;

const MusicBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const MusicTitle = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 12px;
  color: #252a2f;
`;

const MusicSinger = styled.div`
  font-family: "Pretendard-Medium";
  font-size: 12px;
  color: #252a2f;
`;

const Circle = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 60px;
  min-height: 60px;
  border-radius: 50%;
  background-color: ${props => (props.isSelected ? '#252a2f' : '#e7e7e7')};
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
  cursor: pointer;
  text-align: center;
`;

const VisitTime = styled.div`
  font-family: "Pretendard-SemiBold";
  font-size: 10px;
  color: ${props => (props.isSelected ? '#FF8A1D' : '#252a2f')};
  margin-bottom: 3px;
`;

const Line = styled.div`
  min-width: 20px;
  height: 8px;
  background-color: #e7e7e7;
  font-family: "Pretendard-Regular";
  font-size: 9px;
  align-items: center;
  display: flex;
  justify-content: center;
  color: #575757;
  padding: 2px 9px;
`;


const RouteRecommend = () => {
  const [travelDestinations, setTravelDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedId = localStorage.getItem("id");

    if (storedName && storedId) {
      setName(storedName);
      setId(storedId);
    } else {
      console.error("No user data found in localStorage");
    }
  }, []);

  useEffect(() => {
    const storedRecommendations = localStorage.getItem('travelRecommendations');

    if (storedRecommendations) {
      const parsedRecommendations = JSON.parse(storedRecommendations);
      if (Array.isArray(parsedRecommendations.recommendations)) {
        setTravelDestinations(parsedRecommendations.recommendations);

        if (parsedRecommendations.recommendations.length > 0 && parsedRecommendations.recommendations[0].candidates.length > 0) {
          setSelectedDestination(parsedRecommendations.recommendations[0].candidates[0].itinerary[0]);
        }
      }
    } else {
      console.error("No travel recommendations found in localStorage");
    }
  }, []);

  useEffect(() => {
    if (selectedDestination) {
      fetch(`http://localhost:8888/spots/${selectedDestination.placeName}/image`)
        .then((response) => response.text())
        .then((data) => {
          setImageUrl(data);
        })
        .catch((error) => console.error('Error fetching destination image:', error));
    }
  }, [selectedDestination]);

  const convertDayKeyToKorean = (dayNumber) => {
    return `${dayNumber}일차`;
  };

  const handleCircleClick = (destination) => {
    setSelectedDestination(destination);
  };

  const handleDetailClick = () => {
    if (selectedDestination) {
      fetch(`http://localhost:8888/spots/${selectedDestination.placeName}`)
        .then((response) => response.text())
        .then((data) => {
          const parsedData = JSON.parse(data);
          navigate(`/detail/${selectedDestination.placeName}`, { state: { destination: parsedData } });
        })
        .catch((error) => console.error('Error fetching destination:', error));
    }
  };

  const handleFixRouteClick = () => {
    const selectedRoute = travelDestinations.map(day => {
      return {
        dayNumber: day.dayNumber,
        ...day.candidates[currentCandidateIndex]
      };
    });
    navigate('/routefix', { state: { selectedRoute } });
  };

  const handleEditClick = () => {
    const nextCandidateIndex = (currentCandidateIndex + 1) % travelDestinations[0].candidates.length;
    setCurrentCandidateIndex(nextCandidateIndex);
    setSelectedDestination(travelDestinations[0].candidates[nextCandidateIndex].itinerary[0]);
  };

  const handleImageError = (e) => {
    e.target.src = `${process.env.PUBLIC_URL}/asset/noimage.png`;
  };

  return (
    <Container>
      <LogoContainer>
        <img style={{ width: "30%" }} 
          src={process.env.PUBLIC_URL + '/asset/logo/logo.png'}
          alt='logo' />
      </LogoContainer>
      <ContentContainer>
        <Message>{name}님의 취향을 바탕으로</Message>
        <Message style={{marginBottom:"10px"}}>여행 루트와 음악을 추천해봤어요!</Message>
        <ImageContainer>
          {selectedDestination && (
            <>
              <Image src={imageUrl} alt={selectedDestination.placeName} onError={handleImageError} />
              <DetailsContainer>
                <DestName>{selectedDestination.placeName}</DestName>
                <DetailButton onClick={handleDetailClick}>자세히 보기</DetailButton>
                <MusicContainer>
                  <img style={{ width: "20px" }}
                    src={process.env.PUBLIC_URL + '/asset/musicplay.png'} alt='music play icon'/>
                  <MusicBox>
                    <MusicTitle>{selectedDestination.musicName}</MusicTitle>
                    <MusicSinger>{selectedDestination.musicArtist}</MusicSinger>
                  </MusicBox>
                </MusicContainer>
              </DetailsContainer>
            </>
          )}
        </ImageContainer>
        <RouteBox>
          {travelDestinations.map((day) => (
            <React.Fragment key={day.dayNumber}>
              <RouteContainer>
                <Day>{convertDayKeyToKorean(day.dayNumber)}</Day>
                <TravelPathContainer>
                  <PathLine>
                    {day.candidates[currentCandidateIndex].itinerary.map((destination, index) => (
                      <React.Fragment key={destination.placeId}>
                        <Circle 
                          onClick={() => handleCircleClick(destination)}
                          isSelected={selectedDestination && selectedDestination.placeId === destination.placeId}
                        >
                          <VisitTime
                            onClick={() => handleCircleClick(destination)}
                            isSelected={selectedDestination && selectedDestination.placeId === destination.placeId}
                          >
                            {destination.duration}분
                          </VisitTime>
                          <div>{destination.placeName}</div>
                        </Circle>
                        {index < day.candidates[currentCandidateIndex].itinerary.length - 1 &&
                          <Line>
                            {day.candidates[currentCandidateIndex].travelSegments[index].distance.toFixed(2)}km
                          </Line>
                        }
                      </React.Fragment>
                    ))}
                  </PathLine>
                </TravelPathContainer>
              </RouteContainer>
            </React.Fragment>
          ))}
        </RouteBox>
        <ButtonContainer>
          <FixButton onClick={handleFixRouteClick}>이 루트로 여행 갈래요!</FixButton>
          <EditButton onClick={handleEditClick}>다시 추천받을래요</EditButton>
        </ButtonContainer>
      </ContentContainer>
    </Container>
  );
};

export default RouteRecommend;