import React, { useContext } from 'react';
import { TravelSurveyContext } from './TsContext';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #FAFAFA;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 24px;
  font-family: "Pretendard-ExtraBold";
  color: #252a2f;
  margin-top: 20px;
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-top: 20px;
`;

const DataItem = styled.div`
  font-size: 18px;
  font-family: "Pretendard-Regular";
  color: #252a2f;
  margin-bottom: 10px;
  word-wrap: break-word;
`;

const Button = styled.button`
  padding: 10px 40px;
  background-color: #3869E0;
  border-radius: 20px;
  font-family: "Pretendard-ExtraBold";
  border: none;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #FAFAFA;
  cursor: pointer;
  margin-top: 20px;
`;

const TsSummary = () => {
  const navigate = useNavigate();
  const { travelsurveyData } = useContext(TravelSurveyContext);

  return (
    <Container>
      <Title>Survey Data</Title>
      <DataContainer>
        <DataItem><strong>Destination:</strong> {travelsurveyData.destination}</DataItem>
        <DataItem><strong>Period:</strong> {travelsurveyData.period}</DataItem>
        <DataItem><strong>Intensity:</strong> {travelsurveyData.intensity.join(', ')}</DataItem>
        <DataItem><strong>Accommodation:</strong> {travelsurveyData.accomodation.join(', ')}</DataItem>
        <DataItem><strong>Restaurant:</strong> {travelsurveyData.restaurant.join(', ')}</DataItem>
        <DataItem><strong>Mandatory:</strong> {travelsurveyData.requirewords}</DataItem>
        <DataItem><strong>Stopwords:</strong> {travelsurveyData.stopwords}</DataItem>
      </DataContainer>
      <Button onClick={() => navigate('/home')}>Back to Home</Button>
    </Container>
  );
};

export default TsSummary;