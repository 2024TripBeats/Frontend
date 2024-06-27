import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import detailData from './detail.json';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FAFAFA;
  box-sizing: border-box;
  align-items: center;
  max-width: 100%;
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
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    const foundDestination = detailData.find(dest => dest.id === parseInt(id));
    setDestination(foundDestination);
  }, [id]);

  if (!destination) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <LogoContainer>
        <img style={{ width: "30%" }} 
          src={process.env.PUBLIC_URL + '/asset/logo/logo.png'}
          alt='logo' />
      </LogoContainer>
      <ContentContainer>
        <BackButton onClick={() => navigate(-1)}>⬅️</BackButton>
        <Image src={destination.image_url} alt={destination.name} />
        <InfoContainer>
          <InfoTitle>{destination.name}</InfoTitle>
          <InfoText>📍 {destination.address}</InfoText>
          <InfoText>⏰ {destination.hours}</InfoText>
          <InfoText>📞 {destination.phone}</InfoText>
          <Link href={destination.website} target="_blank" rel="noopener noreferrer">
            🌐  {destination.website}
          </Link>
        </InfoContainer>
      </ContentContainer>
    </Container>
  );
};

export default DetailPage;