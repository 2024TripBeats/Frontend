import React, { useContext } from 'react';
import styled from "styled-components";
import { UserSurveyContext } from './UsContext';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #FAFAFA;
    box-sizing: border-box;
    padding: 20px;
`;

const Title = styled.h1`
    font-size: 24px;
    font-family: "Pretendard-ExtraBold";
    color: #252a2f;
    text-align: center;
`;

const DataContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
`;

const DataItem = styled.div`
    font-size: 16px;
    font-family: "Pretendard-Regular";
    color: #252a2f;
`;

const SurveySummary = () => {
  const { usersurveyData } = useContext(UserSurveyContext);

  return (
    <Container>
      <Title>Survey Summary</Title>
      <DataContainer>
        <DataItem><strong>Name:</strong> {usersurveyData.name}</DataItem>
        <DataItem><strong>Email:</strong> {usersurveyData.email}</DataItem>
        <DataItem><strong>Phone:</strong> {usersurveyData.phone}</DataItem>
        <DataItem><strong>Gender:</strong> {usersurveyData.gender}</DataItem>
        <DataItem><strong>Age:</strong> {usersurveyData.age}</DataItem>
        <DataItem><strong>Desranks:</strong> {usersurveyData.desranks}</DataItem>
        <DataItem><strong>PrevTrips:</strong> {usersurveyData.prevtrips}</DataItem>
        <DataItem><strong>Openness:</strong> {usersurveyData.openness}</DataItem>
        <DataItem><strong>musictaste</strong> {usersurveyData.musictaste}</DataItem>
      </DataContainer>
    </Container>
  );
};

export default SurveySummary;