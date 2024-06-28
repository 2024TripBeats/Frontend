import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
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
  const { destination } = location.state;

  if (!destination) {
    return <p>Loading...</p>;
  }

  const getAccessibilityText = (value) => (value ? '가능' : '불가능');

  return (
    <Container>
      <LogoContainer>
        <img style={{ width: "30%" }} 
          src={process.env.PUBLIC_URL + '/asset/logo/logo.png'}
          alt='logo' />
      </LogoContainer>
      <ContentContainer>
        <BackButton onClick={() => navigate(-1)}>⬅️</BackButton>
        <Image src={destination.imageUrl} alt={destination.name} />
        <InfoContainer>
          <InfoTitle>{destination.visitAreaNm}</InfoTitle>
          <InfoText style={{marginBottom: '20px'}}>{destination.description}</InfoText>
          <InfoText>📍 {destination.radNmAddr}</InfoText>
          <InfoText>⏰ {destination.time}</InfoText>
          <InfoText>🐕 {getAccessibilityText(destination.petAccess)}</InfoText>
          <InfoText>🚗 {getAccessibilityText(destination.parking)}</InfoText>
          <InfoText>📞 {destination.contact}</InfoText>
          <InfoText>{destination.hashtags}</InfoText>
        </InfoContainer>
      </ContentContainer>
    </Container>
  );
};

export default DetailPage;