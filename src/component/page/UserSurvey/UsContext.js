import React, { createContext, useState } from 'react';

export const UserSurveyContext = createContext();

export const UserSurveyProvider = ({ children }) => {
  const [usersurveyData, setUserSurveyData] = useState({
    name: '',
    email: '',
    phone: '', // 하나의 문자열로 저장
    gender: '',
    age: '',
    desranks: Array(5).fill(null),
    prevtrips: Array(3).fill(null),
    openness: '',
  });

  return (
    <UserSurveyContext.Provider value={{ usersurveyData, setUserSurveyData }}>
      {children}
    </UserSurveyContext.Provider>
  );
};