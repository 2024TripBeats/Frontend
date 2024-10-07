import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [travelRecords, setTravelRecords] = useState([]); // 여행 기록을 저장하는 배열
  const navigate = useNavigate();

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

  // 접속 시 데이터 요청
  useEffect(() => {
    if (id) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/trips/account/${id}/all`)
        .then(response => {
          return response.json(); // JSON으로 변환
        })
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setTravelRecords(data); // 배열 데이터를 그대로 저장
          } else {
            console.error("No valid travel records found");
          }
        })
        .catch(error => console.error("Error fetching travel records:", error));
    }
  }, [id]);

  const toggleDetails = (index) => {
    setTravelRecords((prevRecords) =>
      prevRecords.map((record, i) =>
        i === index ? { ...record, showDetails: !record.showDetails } : record
      )
    );
  };

  const handleDetailClick = (placeId) => {
    if (placeId) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/spots/${placeId}/detail-v2`)
        .then((response) => response.json()) // Already parsed JSON
        .then((data) => {
          navigate(`/detail/${placeId}`, { state: { destination: data } });
        })
        .catch((error) => console.error('Error fetching destination details:', error));
    }
  };

  return (
    <Container>
      <Header>
        <LogoContainer>
          <img
            style={{ width: '30%' }}
            src={process.env.PUBLIC_URL + `asset/logo/blacklogo.png`}
            alt='logo'
          />
        </LogoContainer>
        <MessageBox>
          <Title>{localStorage.getItem('name')}님의</Title>
          <Subtitle>마이페이지</Subtitle>
        </MessageBox>
      </Header>
      <Content>
        <TravelCount>
          총 <Highlight>{travelRecords.length}</Highlight>번 여행을 다녀왔어요
        </TravelCount>
        {travelRecords.map((record, index) => (
          <TravelRecord key={index}>
            <TravelSummary>
              <TravelInfo>
                <TravelName>{record.tripName}</TravelName> {/* 여행 이름 표시 */}
              </TravelInfo>
              <MoreButton onClick={() => toggleDetails(index)}>
                {record.showDetails ? '닫기' : '더보기'}
              </MoreButton>
            </TravelSummary>

            {/* 여행의 상세 정보 표시 */}
            {record.showDetails && record.tripData?.itinerary && (
              <DayBox>
                {record.tripData.itinerary.map((day, dayIndex) => (
                  <DayContainer key={dayIndex}>
                    <Day>{day.dayNumber}일차</Day>
                    {day.places.map((place, placeIndex) => (
                      <React.Fragment key={place.placeId}>
                          <TravelItemContainer onClick={() => handleDetailClick(place.placeId)}>
                            <CircleContainer>
                              <Circle>{place.duration}분</Circle>
                            </CircleContainer>
                            <TravelDetails>
                              <DestName>{place.placeName}</DestName>
                              {place.price > 0 && (
                                <PriceInfo>예상 경비 | {place.price.toLocaleString()}원</PriceInfo>
                              )}
                              {place.music_bool && (
                                <MusicContainer>
                                  <img
                                    style={{ width: '14px' }}
                                    src={process.env.PUBLIC_URL + '/asset/icon/musicplay.png'}
                                    alt='music-icon'
                                  />
                                  <MusicTitle>{place.musicName}</MusicTitle>
                                  <MusicSinger>{place.musicArtist}</MusicSinger>
                                </MusicContainer>
                              )}
                            </TravelDetails>
                          </TravelItemContainer>
                        {placeIndex < day.places.length - 1 && (
                          <DistanceContainer>
                            <Line />
                            <Distance>{day.travelSegments[placeIndex]?.distance.toFixed(2)} km</Distance>
                          </DistanceContainer>
                        )}
                      </React.Fragment>
                    ))}
                  </DayContainer>
                ))}
              </DayBox>
            )}
          </TravelRecord>
        ))}
      </Content>
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #fafafa;
  box-sizing: border-box;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  background-color: #ff8a1d;
  flex-direction: column;
  width: 100%;
  height: 33vh;
  box-sizing: border-box;
`;

const LogoContainer = styled.div`
  padding-top: 8%;
  padding-bottom: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const MessageBox = styled.div`
  margin-top: 5%;
  margin-left: 10%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h1`
  font-size: 27px;
  font-family: 'Pretendard-ExtraBold';
  color: #252a2f;
  margin: 0;
`;

const Subtitle = styled.div`
  font-size: 20px;
  font-family: 'Pretendard-ExtraBold';
  margin-top: 10px;
  color: #252a2f;
`;

const Content = styled.div`
  width: 95%;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 30px 30px 0 0;
`;

const TravelCount = styled.div`
  font-size: 16px;
  font-family: 'Pretendard-Bold';
  color: black;
  margin-bottom: 20px;
`;

const Highlight = styled.span`
  color: #ff8a1d;
`;

const TravelRecord = styled.div`
  margin-bottom: 15px;
  padding: 15px;
  background-color: #fafafa;
  border-radius: 10px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const TravelSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Pretendard-Bold';
  font-size: 16px;
  color: black;
`;

const TravelInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const TravelName = styled.div`
  font-size: 16px;
  color: #252a2f;
  font-family: 'Pretendard-Bold';
`;

const MoreButton = styled.button`
  background-color: #e0e0e0;
  border: none;
  color: black;
  padding: 6px 13px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 10px;
`;

const DayBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
  padding: 20px;
  margin-top: 15px;
  gap: 15px;
`;

const DayContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
`;

const Day = styled.div`
  font-family: 'Pretendard-Bold';
  font-size: 13px;
  color: #252a2f;
  margin-right: 10px;
  background-color: #b8b8b8;
  text-align: center;
  border-radius: 5px;
  padding: 5px 15px;  
  margin-bottom: 15px;
`;

const TravelItemContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
  box-sizing: border-box;
  cursor: pointer;
`;

const CircleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Circle = styled.div`
  min-width: 30px;
  min-height: 30px;
  border-radius: 50%;
  background-color: #e7e7e7;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #252a2f;
  border: none;
  font-family: "Pretendard-Bold";
  font-size: 11px;
  padding: 10px;
`;

const TravelDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  gap: 5px;
`;

const DestName = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 14px;
  color: #252a2f;
`;

const PriceInfo = styled.div`
  font-family: "Pretendard-Medium";
  font-size: 11px;
  color: #757575;
`;

const MusicContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const MusicTitle = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 9px;
  color: #252a2f;
`;

const MusicSinger = styled.div`
  font-family: "Pretendard-Medium";
  font-size: 9px;
  color: #252a2f;
`;

const DistanceContainer = styled.div`
  display: flex;
  justify-content: left;
  width: 100%;
  align-items: center;
  margin-left: 27px;
`;

const Line = styled.div`
  width: 5px;
  height: 20px;
  background-color: #e7e7e7;
`;

const Distance = styled.div`
  margin-left: 10px;
  font-family: 'Pretendard-Regular';
  font-size: 10px;
  color: #575757;
`;
