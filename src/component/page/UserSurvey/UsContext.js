import React, { createContext, useState } from 'react';

export const UserSurveyContext = createContext();

export const UserSurveyProvider = ({ children }) => {
  const [usersurveyData, setUserSurveyData] = useState({
    name: '', // 이름
    email: '', // 이메일
    phone: '', // 하나의 문자열로 저장
    gender: '', // 성별 (남:1, 여:2)
    age: '', // 연령대
    desranks: Array(5).fill(null), // 여행지 이미지 순위
    prevtrips: Array(3).fill(null), // 이전 여행지
    openness: '', // 취향과 거리가 먼 여행지 (1~5)
    musictaste: [] // 음악 취향
  });

  return (
    <UserSurveyContext.Provider value={{ usersurveyData, setUserSurveyData }}>
      {children}
    </UserSurveyContext.Provider>
  );
};