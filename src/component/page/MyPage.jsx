import React, { useState } from 'react';
import styled from "styled-components";

const MyPage = () => {

  // 임시 데이터
  const [travelRecords, setTravelRecords] = useState([
    {
      id: 1,
      name: '우도 여행',
      location: '제주',
      startDate: '2024-02-01',
      endDate: '2024-02-05',
      details: '1일차: 우도 도착 - 우도해수욕장\n2일차: 비양도 방문 - 섬일주',
      showDetails: false,
    },
    {
      id: 2,
      name: '수료 여행',
      location: '제주',
      startDate: '2024-03-01',
      endDate: '2024-03-05',
      details: '1일차: 수료 관광지 방문\n2일차: 시내 투어 - 특산품 쇼핑',
      showDetails: false,
    },
    {
      id: 3,
      name: '서귀포 먹방 투어투어투어',
      location: '제주',
      startDate: '2024-04-01',
      endDate: '2024-04-05',
      details: '1일차: 올레시장 방문 - 맛집 탐방\n2일차: 서귀포 칼국수 투어',
      showDetails: false,
    },
    {
      id: 4,
      name: '우도 여행',
      location: '제주',
      startDate: '2024-05-01',
      endDate: '2024-05-05',
      details: '1일차: 우도 도착 - 우도해수욕장\n2일차: 비양도 방문 - 섬일주',
      showDetails: false,
    },
  ]);

  /* 서버에 GET 요청하기 */
  // const [travelRecords, setTravelRecords] = useState([]);
  // const [name, setName] = useState('');
  // const [id, setId] = useState('');

  // useEffect(() => {
  //   const storedName = localStorage.getItem("name");
  //   const storedId = localStorage.getItem("id");

  //   if (storedName && storedId) {
  //     setName(storedName);
  //     setId(storedId);

  //     // 서버에 GET 요청 보내기
  //     axios.get(`/api/travelRecords/${storedId}`)
  //       .then(response => {
  //         setTravelRecords(response.data);
  //       })
  //       .catch(error => {
  //         console.error("Error fetching travel records:", error);
  //       });
  //   } else {
  //     // 로컬 스토리지에 데이터가 없을 경우 처리
  //     console.error("No user data found in localStorage");
  //   }
  // }, []);

  // 토글
  const toggleDetails = (id) => {
    setTravelRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.id === id ? { ...record, showDetails: !record.showDetails } : record
      )
    );
  };

  return (
    <Container>
      <Header>
        <LogoContainer>
          <img style={{ width: "30%" }} 
            src={process.env.PUBLIC_URL + `asset/logo/blacklogo.png`}
            alt='logo' />
        </LogoContainer>
        <MessageBox>
          <Title>{localStorage.getItem("name")}님의</Title>
          <Subtitle>마이페이지</Subtitle>
        </MessageBox>
      </Header>
      <Content>
        <TravelCount>총 <Highlight>{travelRecords.length}</Highlight>번 여행을 다녀왔어요</TravelCount>
        {travelRecords.map((record) => (
          <TravelRecord key={record.id}>
            <TravelSummary>
              <TravelInfo>
                <TravelName>
                  <Location>{record.location}</Location> {record.name}
                </TravelName>
                <TravelDate>{record.startDate} - {record.endDate}</TravelDate>
              </TravelInfo>
              <MoreButton onClick={() => toggleDetails(record.id)}>
                {record.showDetails ? '닫기' : '더보기'}
              </MoreButton>
            </TravelSummary>
            {record.showDetails && <TravelDetails>{record.details}</TravelDetails>}
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
  background-color: #FAFAFA;
  box-sizing: border-box;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  background-color: #FF8A1D;
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
  font-family: "Pretendard-ExtraBold";
  color: #252a2f;
  margin: 0;
`;

const Subtitle = styled.div`
  font-size: 20px;
  font-family: "Pretendard-ExtraBold";
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
  font-family: "Pretendard-Bold";
  color: black;
  margin-bottom: 20px;
`;

const Highlight = styled.span`
  color: #FF8A1D;
`;

const TravelRecord = styled.div`
  margin-bottom: 15px;
  padding: 15px;
  background-color: #FAFAFA;
  border-radius: 10px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const TravelSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Pretendard-Bold";
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
  font-family: "Pretendard-Bold";
`;

const Location = styled.span`
  color: #FF8A1D;
  font-size: 14px;
  margin-right: 5px;
`;

const TravelDate = styled.div`
  font-size: 13px;
  color: #727272;
  font-family: "Pretendard-Regular";
`;

const MoreButton = styled.button`
  background-color: #E0E0E0;
  border: none;
  color: black;
  padding: 6px 13px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 10px;
`;

const TravelDetails = styled.div`
  margin-top: 10px;
  white-space: pre-wrap; /* 줄바꿈 및 공백 처리를 위한 스타일 */
  font-family: "Pretendard-Regular";
  font-size: 14px;
  color: #333333;
  background-color: #F7F7F7;
  padding: 10px;
  border-radius: 10px;
  margin-top: 15px;
`;