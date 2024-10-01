import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FAFAFA;
  box-sizing: border-box;
  align-items: center;
  max-width: 100%;
  margin-bottom: 50px;
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
  margin: 0 7%;
`;

const BackButton = styled.button`
  align-self: flex-start;
  background-color: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #252a2f;
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const InfoContainer = styled.div`
  width: 100%;
  text-align: left;
  padding: 0 10px;
`;

const InfoTitle = styled.div`
  font-family: "Pretendard-ExtraBold";
  font-size: 24px;
  margin-bottom: 10px;
`;

const InfoType = styled.div`
  font-family: "Pretendard-Medium";
  font-size: 16px;
  margin: 5px 0;
  color: #848484;
`;

const InfoText = styled.div`
  font-family: "Pretendard-Medium";
  font-size: 14px;
  margin: 5px 0;
`;

const Link = styled.div`
  color: #FF8A1D;
  text-decoration: none;
  font-family: "Pretendard-Medium";
`;

const DetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { destination } = location.state || {};

  if (!destination) {
    return <p>Loading...</p>;
  }

  // 시간 정보를 파싱해서 평일과 주말 데이터를 각각 표시
  const renderTime = () => {
    if (destination.time && Array.isArray(destination.time)) {
      return destination.time.map((time, index) => (
        <InfoText key={index}>⏰ {time}</InfoText>
      ));
    }
    return null;
  };

  // null 값이 아닌 경우만 렌더링하는 함수
  const renderIfExists = (label, value, isContact) => {
    if (value) {
      return <InfoText>{label} {isContact ? <a href={`tel:${value}`}>{value}</a> : value}</InfoText>;
    }
    return null;
  };

  // 이미지 에러 처리 핸들러
  const handleImageError = (e) => {
    e.target.src = `${process.env.PUBLIC_URL}/asset/noimage.png`;
  };

  return (
    <Container>
      <LogoContainer>
        <img
          style={{ width: "30%" }}
          src={process.env.PUBLIC_URL + '/asset/logo/logo.png'}
          alt="logo"
        />
      </LogoContainer>
      <ContentContainer>
        <BackButton onClick={() => navigate(-1)}>⬅️</BackButton>
        {destination.imageUrl && (
          <Image
            src={destination.imageUrl}
            alt={destination.name}
            onError={handleImageError}
          />
        )}
        <InfoContainer>
          {destination.visitAreaNm && <InfoTitle>{destination.visitAreaNm}</InfoTitle>}
          {destination.visitAreaTypeCd && <InfoType>{destination.visitAreaTypeCd}</InfoType>}
          {destination.description && <InfoText style={{ marginBottom: '20px' }}>{destination.description}</InfoText>}
          {renderIfExists("📍", destination.radNmAddr)}
          {renderIfExists("💁🏻", destination.info)}
          {renderIfExists("💰", destination.fare)}
          {renderTime()}
          {renderIfExists("📞", destination.contact, true)}
          {destination.hashtags && (
            <InfoText style={{ marginTop: '20px', color: '#2271d1' }}>
              {destination.hashtags}
            </InfoText>
          )}
        </InfoContainer>
      </ContentContainer>
    </Container>
  );
};

export default DetailPage;