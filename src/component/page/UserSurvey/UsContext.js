import React, { createContext, useState } from 'react';

export const UserSurveyContext = createContext();

export const UserSurveyProvider = ({ children }) => {
  const [usersurveyData, setUserSurveyData] = useState({

    /* Step1 Data */
    email: '', // 이메일
    phoneNumber: '', // 하나의 문자열로 저장
    gender: '', // 성별 (남:1, 여:2)
    age: '', // 연령대

    /* Step2 Data */
    travelSpots: [], // 여행지 순위

    /* Step3 Data */
    distance: '',
    activityLevel: '',
    Scene: '',
    openness: '', // 취향과 거리가 먼 여행지 (1~5)

    /* Step4 Data */
    musicGenre: [], // 음악 취향
    genreOpenness: '', // 음악 취향에 대한 열린 정도 (1~5)

    /* Step5 Data */
    musicTags: [], // 음악 해시태그
    tagOpenness: '', // 음악 해시태그에 대한 열린 정도 (1~5)
  });

  return (
    <UserSurveyContext.Provider value={{ usersurveyData, setUserSurveyData }}>
      {children}
    </UserSurveyContext.Provider>
  );
};