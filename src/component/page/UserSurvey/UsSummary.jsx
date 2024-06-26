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
        <DataItem>이름: {userName}</DataItem>
        <DataItem>이메일: {usersurveyData.email}</DataItem>
        <DataItem>전화번호: {usersurveyData.phoneNumber}</DataItem>
        <DataItem>성별: {usersurveyData.gender}</DataItem>
        <DataItem>연령대: {usersurveyData.age}</DataItem>
        <DataItem>장소1 {usersurveyData.firstSpot}</DataItem>
        <DataItem>장소2 {usersurveyData.secondSpot}</DataItem>
        <DataItem>장소3 {usersurveyData.thirdSpot}</DataItem>
        <DataItem>장소4 {usersurveyData.fourthSpot}</DataItem>
        <DataItem>장소5 {usersurveyData.fifthSpot}</DataItem>
        <DataItem>장소개방도{usersurveyData.distance}</DataItem>
        <DataItem>{usersurveyData.activityLevel}</DataItem>
        <DataItem>{usersurveyData.Scene}</DataItem>
        <DataItem>{usersurveyData.openness}</DataItem>
        <DataItem>음악장르: {usersurveyData.musicGenre}</DataItem>
        <DataItem>장르개방도: {usersurveyData.genreOpenness}</DataItem>
        <DataItem>음악태그: {usersurveyData.musicTags}</DataItem>
        <DataItem>태그개방도: {usersurveyData.tagOpenness}</DataItem>
      </DataContainer>
    </Container>
  );
};

export default UsSummary;