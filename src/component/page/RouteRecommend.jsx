import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useLocation, useNavigate } from 'react-router-dom';

const RouteRecommend = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedDestination } = location.state; // Data passed from the previous page

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [imageUrl, setImageUrl] = useState('');
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [currentPlace, setCurrentPlace] = useState(null); // New state to track the currently selected place

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
    if (selectedDestination) {
      // Initially set the first place as the current place
      setCurrentPlace(selectedDestination.itinerary[0].places[0]);
    }
  }, [selectedDestination]);

  useEffect(() => {
    if (currentPlace) {
      fetch(`http://localhost:8888/spots/${currentPlace.placeName}/image`)
        .then((response) => response.text())
        .then((data) => {
          setImageUrl(data);
        })
        .catch((error) => console.error('Error fetching destination image:', error));
    }
  }, [currentPlace]);

  // 자세히 보기 detail 페이지 이동
  const handleDetailClick = () => {
    if (currentPlace) {
      fetch(`http://localhost:8888/spots/${currentPlace.placeName}`)
        .then((response) => response.json()) // Already parsed JSON
        .then((data) => {
          navigate(`/detail/${currentPlace.placeName}`, { state: { destination: data } });
        })
        .catch((error) => console.error('Error fetching destination details:', error));
    }
  };

  const handleCircleClick = (dayNumber, place) => {
    setCurrentPlace(place); // Update current place when a circle is clicked
  };

  const handleFixRouteClick = () => {
    const selectedRoute = selectedDestination.itinerary.map(day => ({
      dayNumber: day.dayNumber,
      places: day.places,
    }));
    navigate('/routefix', { state: { selectedRoute } });
  };

  const handleEditClick = () => {
    setCurrentCandidateIndex((prevIndex) => (prevIndex + 1) % selectedDestination.itinerary.length);
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
          {currentPlace && (
            <>
              <Image src={imageUrl} alt={currentPlace.placeName} onError={handleImageError} />
              <DetailsContainer>
                <DestName>{currentPlace.placeName}</DestName>
                <DetailButton onClick={handleDetailClick}>
                  자세히 보기
                </DetailButton>
                {/* Check if spotify_id exists before rendering the MusicContainer */}
                {currentPlace.spotify_id && (
                  <MusicContainer>
                    <img style={{ width: "20px" }}
                         src={process.env.PUBLIC_URL + '/asset/icon/musicplay.png'} alt='music play icon'/>
                    <MusicBox>
                      <MusicTitle>{currentPlace.song_title}</MusicTitle>
                      <MusicSinger>{currentPlace.artist_name}</MusicSinger>
                    </MusicBox>
                  </MusicContainer>
                )}
              </DetailsContainer>
            </>
          )}
        </ImageContainer>
        <RouteBox>
          {selectedDestination?.itinerary.map((day) => (
            <React.Fragment key={day.dayNumber}>
              <RouteContainer>
                <Day>{`${day.dayNumber}일차`}</Day>
                <TravelPathContainer>
                  <PathLine>
                    {day.places.map((place, index) => (
                      <React.Fragment key={place.placeId}>
                        <Circle
                          onClick={() => handleCircleClick(day.dayNumber, place)}
                          isSelected={place.placeId === currentPlace?.placeId}
                        >
                          <VisitTime
                            isSelected={place.placeId === currentPlace?.placeId}
                          >
                            {place.duration}분
                          </VisitTime>
                          <div>{place.placeName}</div>
                          <PriceTag>{place.price.toLocaleString()}원</PriceTag> {/* Display price */}
                        </Circle>
                        {index < day.places.length - 1 && (
                          <Line>
                            {day.travelSegments[index]?.distance.toFixed(2)}km
                          </Line>
                        )}
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


const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fafafa;
  box-sizing: border-box;
  margin-bottom: 70px;
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
    align-items: self-start;
    justify-content: center;
    margin-bottom: 20px;
    width: 100%;
    border: none;
    background-color: #fafafa;
`;

const RouteContainer = styled.div`
    display: flex;
    justify-content: space-between;  /* 두 요소를 양 끝에 배치 */
    align-items: center;
    width: 100%;
    margin-top: 10px;
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
  padding: 12px;
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

const PriceTag = styled.div`
  font-size: 8px;
  font-family: "Pretendard-SemiBold";
  background-color: #cfcfcf;
  border-radius: 10px;
  padding: 2px 5px;
  color: #606060;
  margin-top: 5px;
`;