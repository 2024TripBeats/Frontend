import React, { useContext, useState, useEffect } from 'react';
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

const UsSummary = () => {
  const { usersurveyData } = useContext(UserSurveyContext);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("name");
    const id = localStorage.getItem("id");

    if (name) setUserName(name);
    if (id) setUserId(id);
  }, []);

  return (
    <Container>
      <Title>Survey Summary</Title>
      <DataContainer>
        <DataItem>{userName}</DataItem>
        <DataItem>{userId}</DataItem>
        <DataItem>{usersurveyData.email}</DataItem>
        <DataItem>{usersurveyData.phoneNumber}</DataItem>
        <DataItem>{usersurveyData.gender}</DataItem>
        <DataItem>{usersurveyData.age}</DataItem>
        <DataItem>{usersurveyData.firstSpot}</DataItem>
        <DataItem>{usersurveyData.secondSpot}</DataItem>
        <DataItem>{usersurveyData.thirdSpot}</DataItem>
        <DataItem>{usersurveyData.fourthSpot}</DataItem>
        <DataItem>{usersurveyData.fifthSpot}</DataItem>
        <DataItem>{usersurveyData.distance}</DataItem>
        <DataItem>{usersurveyData.activityLevel}</DataItem>
        <DataItem>{usersurveyData.Scene}</DataItem>
        <DataItem>{usersurveyData.openness}</DataItem>
        <DataItem>{usersurveyData.musicGenre}</DataItem>
      </DataContainer>
    </Container>
  );
};

export default UsSummary;