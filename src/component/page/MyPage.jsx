import React, { useState, useEffect } from 'react';
import styled from "styled-components";

const MyPage = () => {
  // 임시 데이터
  const [travelRecords, setTravelRecords] = useState({
    accountId: '333333',
    route: [
      {
        tripName: '서울 여행',
        location: '서울',
        itinerary: [
          {
            dayNumber: 1,
            places: [
              {
                placeId: '791',
                placeName: '남산공원',
                category: '공원',
                duration: 120,
                music_bool: true,
                song_title: '크리스마스 노래',
                artist_name: '4minute',
                price: 0
              },
              {
                placeId: '1194',
                placeName: '롯데면세점 명동본점',
                category: '상업지구',
                duration: 120,
                music_bool: true,
                song_title: 'Bright Blue Skies',
                artist_name: 'Mitch James',
                price: 0
              }
            ],
            travelSegments: [{ distance: 2.5 }]
          },
          {
            dayNumber: 2,
            places: [
              {
                placeId: '878',
                placeName: '인사동 문화의거리',
                category: '전통 문화 거리',
                duration: 120,
                music_bool: false,
                price: 0
              },
              {
                placeId: '903',
                placeName: '청계천헌책방거리',
                category: '산책로',
                duration: 120,
                music_bool: false,
                price: 0
              },
              {
                placeId: '920',
                placeName: '동대문 디자인 플라자',
                category: '전시관',
                duration: 90,
                music_bool: true,
                song_title: 'Design Symphony',
                artist_name: 'Jazztronik',
                price: 5000
              }
            ],
            travelSegments: [{ distance: 3.9 }]
          },
          {
            dayNumber: 3,
            places: [
              {
                placeId: '786',
                placeName: '난지한강공원',
                category: '공원',
                duration: 120,
                music_bool: true,
                song_title: '이 노래',
                artist_name: '2AM',
                price: 0
              },
              {
                placeId: '923',
                placeName: '전쟁기념관 어린이박물관',
                category: '역사 유적지',
                duration: 120,
                music_bool: true,
                song_title: 'Let Me Know',
                artist_name: 'LANY',
                price: 0
              },
              {
                placeId: '922',
                placeName: '국립중앙박물관',
                category: '박물관',
                duration: 120,
                music_bool: false,
                price: 3000
              }
            ],
            travelSegments: [{ distance: 4.8 }, { distance: 3.3 }]
          }
        ]
      },
      {
        tripName: '부산 여행',
        location: '부산',
        itinerary: [
          {
            dayNumber: 1,
            places: [
              {
                placeId: '105',
                placeName: '해운대 해수욕장',
                category: '해변',
                duration: 90,
                music_bool: true,
                song_title: '여름바다',
                artist_name: '태연',
                price: 5000
              },
              {
                placeId: '106',
                placeName: '광안리 해변',
                category: '해변',
                duration: 120,
                music_bool: true,
                song_title: '바다의 노래',
                artist_name: '이문세',
                price: 0
              }
            ],
            travelSegments: [{ distance: 1.2 }]
          },
          {
            dayNumber: 2,
            places: [
              {
                placeId: '107',
                placeName: '부산 타워',
                category: '전망대',
                duration: 60,
                music_bool: false,
                price: 10000
              },
              {
                placeId: '108',
                placeName: '자갈치 시장',
                category: '시장',
                duration: 120,
                music_bool: false,
                price: 2000
              },
              {
                placeId: '109',
                placeName: '부산 영화의 전당',
                category: '극장',
                duration: 150,
                music_bool: true,
                song_title: '영화 속의 주인공',
                artist_name: '김동률',
                price: 15000
              }
            ],
            travelSegments: [{ distance: 3.0 }]
          }
        ]
      },
      {
        tripName: '제주 여행',
        location: '제주',
        itinerary: [
          {
            dayNumber: 1,
            places: [
              {
                placeId: '201',
                placeName: '성산 일출봉',
                category: '자연',
                duration: 180,
                music_bool: false,
                price: 2000
              },
              {
                placeId: '202',
                placeName: '섭지코지',
                category: '해안지형',
                duration: 120,
                music_bool: true,
                song_title: '섬으로 떠나는 여행',
                artist_name: '정승환',
                price: 3000
              }
            ],
            travelSegments: [{ distance: 5.0 }]
          },
          {
            dayNumber: 2,
            places: [
              {
                placeId: '203',
                placeName: '한라산 등반',
                category: '산',
                duration: 360,
                music_bool: false,
                price: 0
              },
              {
                placeId: '204',
                placeName: '우도',
                category: '섬',
                duration: 300,
                music_bool: false,
                price: 3000
              },
              {
                placeId: '205',
                placeName: '제주 돌문화공원',
                category: '박물관',
                duration: 120,
                music_bool: true,
                song_title: '바람과 돌',
                artist_name: '박효신',
                price: 4000
              }
            ],
            travelSegments: [{ distance: 1.5 }]
          }
        ]
      }
    ]
  });

  const toggleDetails = (index) => {
    setTravelRecords((prevRecords) => ({
      ...prevRecords,
      route: prevRecords.route.map((record, i) =>
        i === index ? { ...record, showDetails: !record.showDetails } : record
      )
    }));
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
          총 <Highlight>{travelRecords.route.length}</Highlight>번 여행을 다녀왔어요
        </TravelCount>
        {travelRecords.route.map((record, index) => (
          <TravelRecord key={index}>
            <TravelSummary>
              <TravelInfo>
                <TravelName>
                  <Location>{record.location}</Location> {record.tripName}
                </TravelName>
              </TravelInfo>
              <MoreButton onClick={() => toggleDetails(index)}>
                {record.showDetails ? '닫기' : '더보기'}
              </MoreButton>
            </TravelSummary>
  
            {record.showDetails && (
              <DayBox>
                {record.itinerary.map((day, dayIndex) => (
                  <DayContainer key={dayIndex}>
                    <Day>{day.dayNumber}일차</Day>
                    {day.places.map((place, placeIndex) => (
                      <React.Fragment key={place.placeId}>
                        <TravelItemContainer>
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
                                <MusicTitle>{place.song_title}</MusicTitle>
                                <MusicSinger>{place.artist_name}</MusicSinger>
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

const Location = styled.span`
  color: #ff8a1d;
  font-size: 14px;
  margin-right: 5px;
`;

const TravelDate = styled.div`
  font-size: 13px;
  color: #727272;
  font-family: 'Pretendard-Regular';
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
