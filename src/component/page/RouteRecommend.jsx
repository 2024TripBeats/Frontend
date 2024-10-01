import React, { useState, useEffect, useContext } from 'react';
import styled from "styled-components";
import { useLocation, useNavigate } from 'react-router-dom';
import { TravelSurveyContext } from './TravelSurvey/TsContext';


const RouteRecommend = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  
  // 처음에는 location.state에서 데이터를 가져오고, 이후에는 localStorage에서 복원
  const initialDestination = location.state?.selectedDestination || JSON.parse(localStorage.getItem('selectedDestination'));
  const [selectedDestination, setSelectedDestination] = useState(initialDestination);
  const [flightPrice, setFlightPrice] = useState(location.state?.flightPrice || 0);

  const { travelsurveyData, setTravelSurveyData } = useContext(TravelSurveyContext);

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [imageUrl, setImageUrl] = useState('');
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [currentPlace, setCurrentPlace] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [accessToken, setAccessToken] = useState(""); // 액세스 토큰 상태
  const [trackQueue, setTrackQueue] = useState([]); // Spotify 트랙들을 저장하는 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부 상태

  const tripName = localStorage.getItem('tripName');

  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI; // FastAPI 콜백 URL
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "code";
  const SCOPES = [
      'streaming',
      'user-read-email',
      'user-read-private',
      'user-modify-playback-state',
      'user-read-playback-state',
      'playlist-modify-public',
      'playlist-modify-private'
  ].join(' ');

    // 추가된 일자별 식비 및 렌터카 비용
    const foodCostPerDay = 53200; 
    const carRentalCostPerDay = 45496; 

    // 자세히 보기 detail 페이지 이동
    const handleDetailClick = () => {
      if (currentPlace) {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/spots/${currentPlace.placeId}/detail-v2`)
          .then((response) => response.json()) // Already parsed JSON
          .then((data) => {
            navigate(`/detail/${currentPlace.placeId}`, { state: { destination: data } });
          })
          .catch((error) => console.error('Error fetching destination details:', error));
      }
    };

    useEffect(() => {
      // 페이지가 로드될 때 localStorage에서 name과 id를 가져오기
      const storedName = localStorage.getItem("name");
      const storedId = localStorage.getItem("id");
      const flightPrice = Number(localStorage.getItem("flightprice"));

      if (storedName && storedId) {
          setName(storedName);
          setId(storedId);
          setFlightPrice(flightPrice);
      } else {
          console.error("No user data found in localStorage");
      }

      // 만약 페이지 새로고침 후 location.state가 없으면 localStorage에서 복구
      if (!selectedDestination) {
          const savedDestination = localStorage.getItem('selectedDestination');
          if (savedDestination) {
              setSelectedDestination(JSON.parse(savedDestination));
          }
      }
  
  
      // URL에서 액세스 토큰을 추출하여 저장
      const params = new URLSearchParams(window.location.search);
      const token = params.get('access_token');
      if (token) {
        setAccessToken(token);
        navigate(window.location.pathname, { replace: true });
      }
    }, [navigate, selectedDestination]);

    useEffect(() => {
      if (selectedDestination) {
        // 선택된 목적지 데이터를 localStorage에 저장
        localStorage.setItem("selectedDestination", JSON.stringify(selectedDestination));
  
        // 첫 번째 장소를 기본 선택
        setCurrentPlace(selectedDestination.itinerary[0].places[0]);
  
        const totalDays = selectedDestination.itinerary.length;
        const baseCost = selectedDestination.itinerary.reduce((acc, day) => {
          return acc + day.places.reduce((dayAcc, place) => dayAcc + place.price, 0);
        }, 0);
        const additionalCost = totalDays * (foodCostPerDay + carRentalCostPerDay) + flightPrice; // 식비와 렌터카 비용 추가
        setTotalPrice(baseCost + additionalCost); // 총 여행 경비 계산
  
        // 여행지의 모든 spotifyId를 모아서 trackQueue에 저장
        const allTracks = [];
        selectedDestination.itinerary.forEach(day => {
          day.places.forEach(place => {
            if (place.spotifyId && place.spotifyId.length === 22) {
              allTracks.push(`spotify:track:${place.spotifyId}`);
            }
          });
        });
        setTrackQueue(allTracks);
      }
    }, [selectedDestination]);

      // Spotify 사용자 로그인 여부 확인
  useEffect(() => {
    const checkIfLoggedIn = async () => {
      if (accessToken) {
        try {
          const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          if (response.ok) {
            setIsLoggedIn(true); // 로그인 상태
          } else {
            setIsLoggedIn(false); // 로그인되지 않음
          }
        } catch (error) {
          console.error('Spotify 사용자 정보를 가져오는 중 오류 발생:', error);
          setIsLoggedIn(false);
        }
      }
    };

    checkIfLoggedIn();
  }, [accessToken]);
  
    // 플레이리스트 생성 후 새 창에서 열기
    const createPlaylistAndOpenNewWindow = async () => {
      if (trackQueue.length === 0) {
        console.error('트랙 목록이 비어 있습니다.');
        return;
      }
  
      try {
        // 사용자 정보 가져오기
        const userResponse = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        const userData = await userResponse.json();
        const userId = userData.id;
  
        // 플레이리스트 생성
        const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: '여행 플레이리스트',
            description: 'TRIPBEATS에서 추천한 플레이리스트',
            public: false
          })
        });
        
        // 트랙 배열 확인하기
        console.log(trackQueue);
  
        if (!createPlaylistResponse.ok) {
          console.error('플레이리스트 생성 중 오류 발생:', await createPlaylistResponse.text());
          return;
        }
  
        const playlistData = await createPlaylistResponse.json();
        const playlistId = playlistData.id;
  
        // 플레이리스트에 트랙 추가
        const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uris: trackQueue
          })
        });
  
        if (!addTracksResponse.ok) {
          console.error('트랙 추가 중 오류 발생:', await addTracksResponse.text());
          return;
        }
  
        // 새 창에서 플레이리스트 열기
        const playlistUrl = `https://open.spotify.com/playlist/${playlistId}`;
        window.open(playlistUrl, '_blank');
      } catch (error) {
        console.error('플레이리스트 생성 중 오류 발생:', error);
      }
    };
  
  useEffect(() => {
    if (currentPlace) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/spots/${currentPlace.placeId}/image-v2`)
        .then((response) => response.text())
        .then((data) => setImageUrl(data))
        .catch((error) => console.error('Error fetching destination image:', error));
    }
  }, [currentPlace]);

  const handleLogin = () => {
    if (selectedDestination) {
      localStorage.setItem("selectedDestination", JSON.stringify(selectedDestination));
    }
    const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPES)}`;
    window.location.href = authUrl;
  };

  const handleCircleClick = (dayNumber, place) => {
    setCurrentPlace(place);
  };

  const handleFixRouteClick = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/trips/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountId: id,
          tripName: tripName,
          tripData: {
            itinerary: selectedDestination.itinerary
          }
        }),
      });
  
      console.log(JSON.stringify({
        accountId: id,
        tripName: tripName,
        tripData: {
          itinerary: selectedDestination.itinerary
        }
      }));
  
      // 응답이 성공적이고, 응답 본문이 있으면 처리
      if (response.ok) {
        const text = await response.text();
        const data = text ? JSON.parse(text) : {};  // 응답이 비어있으면 빈 객체로 처리
        console.log('여행 경로 저장 성공:', data);
  
        // 저장 성공 후 경로 이동
        navigate('/routefix', { state: { itinerary: selectedDestination.itinerary } });
      } else {
        console.error('여행 경로 저장 실패:', response.statusText);
        navigate('/routefix', { state: { itinerary: selectedDestination.itinerary } });
      }
    } catch (error) {
      console.error('서버 요청 중 오류 발생:', error);
    }
  };

  const handleImageError = (e) => {
    e.target.src = `${process.env.PUBLIC_URL}/asset/noimage.png`;
  };

  return (
    <Container>
      <LogoContainer>
        <img style={{ width: "30%" }} src={process.env.PUBLIC_URL + '/asset/logo/logo.png'} alt='logo' />
      </LogoContainer>
      <ContentContainer>
        <Message>{name}님의 취향을 바탕으로</Message>
        <Message style={{ marginBottom: "10px" }}>여행 루트와 음악을 추천해봤어요!</Message>
        <MusicMessage>* 스포티파이 프리미엄 유저라면, 로그인하고 플레이리스트를 생성해보세요!</MusicMessage>
        <SpotifyContainer>
          <LoginButton onClick={handleLogin} disabled={isLoggedIn}>
            <SpotifyImg src={process.env.PUBLIC_URL + '/asset/icon/spotify.png'} alt='spotify icon' />
            {isLoggedIn ? "로그인됨" : "로그인"}
          </LoginButton>
          <MusicButton onClick={createPlaylistAndOpenNewWindow} disabled={trackQueue.length === 0}>🎧 추천된 음악 나의 플리에서 듣기</MusicButton>
        </SpotifyContainer>
        <ImageContainer>
          {currentPlace && (
            <>
              <Image src={imageUrl} alt={currentPlace.placeName} onError={handleImageError} />
              <DetailsContainer>
                <Category>{currentPlace.category}</Category>
                <DestName>{currentPlace.placeName}</DestName>
                <DetailButton onClick={handleDetailClick}>
                  자세히 보기
                </DetailButton>
                {currentPlace.spotifyId && (
                  <MusicContainer>
                    <img style={{ width: "20px" }} src={process.env.PUBLIC_URL + '/asset/icon/musicplay.png'} alt='music play icon' />
                    <MusicBox>
                      <MusicTitle>{currentPlace.musicName}</MusicTitle>
                      <MusicSinger>{currentPlace.musicArtist}</MusicSinger>
                    </MusicBox>
                  </MusicContainer>
                )}
              </DetailsContainer>
            </>
          )}
        </ImageContainer>
        <RouteBox>
          <TotalPriceContainer>
            예상 경비 | {totalPrice.toLocaleString()}원
            <AdditionalCosts>
              식비: {foodCostPerDay.toLocaleString()}원/일<br />
              렌터카: {carRentalCostPerDay.toLocaleString()}원/일<br />
              항공권: {flightPrice.toLocaleString()}원
            </AdditionalCosts>
          </TotalPriceContainer>
          {selectedDestination?.itinerary.map((day) => (
            <React.Fragment key={day.dayNumber}>
              <RouteContainer>
                <Day>{`${day.dayNumber}일차`}</Day>
                <TravelPathContainer>
                  <PathLine>
                  {day.places.map((place, index) => (
                    <React.Fragment key={`${place.placeId}-${index}`}>
                        <Circle onClick={() => handleCircleClick(day.dayNumber, place)} isSelected={place.placeId === currentPlace?.placeId}>
                            {place.duration !== null && (
                                <VisitTime isSelected={place.placeId === currentPlace?.placeId}>
                                    {place.duration}분
                                </VisitTime>
                            )}
                            <div>{place.placeName}</div>
                            {place.price > 0 && <PriceTag>{place.price.toLocaleString()}원</PriceTag>}
                        </Circle>
                        {index < day.places.length - 1 && (
                          <Line>{day.travelSegments[index]?.distance.toFixed(2)}km</Line>
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
        </ButtonContainer>
      </ContentContainer>
    </Container>
  );
};

export default RouteRecommend;

const AdditionalCosts = styled.div`
  font-size: 13px;
  font-family: "Pretendard-SemiBold";
  color: #7d7d7d;
  text-align: center;
  margin-top: 5px;
`;

const TotalPriceContainer = styled.div`
  font-size: 15px;
  font-family: "Pretendard-Bold";
  color: #7d7d7d;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

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

const Category = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 15px;
  color: #FF8A1D;
  border-radius: 15px;
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
  margin-bottom: 40px;
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
  min-height: 70px;
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

const SpotifyContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  width: 100%;
  gap: 5%;
`;

const LoginButton = styled.button`
  width: 150px;
  height: 30px;
  font-size: 14px;
  background-color: ${props => (props.disabled ? '#b0b0b0' : '#1ED760')}; /* 비활성화 상태일 때 회색 처리 */
  color: #252a2f;
  gap: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 20px;
  font-family: "Pretendard-ExtraBold";
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')}; /* 비활성화 상태에서 커서 변경 */
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')}; /* 클릭되지 않도록 설정 */
`;

const SpotifyImg = styled.img`
  width: 70px;
`;

const MusicButton = styled.button`
  width: 220px;
  height: 30px;
  font-size: 14px;
  font-family: "Pretendard-Bold";
  background-color: #252a2f;
  color: #1ED760;
  border: none;
  border-radius: 20px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const MusicMessage = styled.div`
  font-size: 12px;
  font-family: "Pretendard-Medium";
  color: #156c33;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 0px;
`;