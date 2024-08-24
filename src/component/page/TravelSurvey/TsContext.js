import React, { createContext, useState } from 'react';

export const TravelSurveyContext = createContext();

export const TravelSurveyProvider = ({ children }) => {
  const [travelsurveyData, setTravelSurveyData] = useState({
    destination: '', // 여행지
    startDate: null, // 여행 시작일
    endDate: null, // 여행 종료일
    intensity: [], // 각 날짜별 여행 강도
    stopwords: '',
    requirewords: '',
    tripName: '', // 여행 이름 추가
  });

  const updatePeriod = (newStartDate, newEndDate) => {
    if (newStartDate && newEndDate) {
      setTravelSurveyData((prevData) => ({
        ...prevData,
        startDate: newStartDate,
        endDate: newEndDate,
        intensity: [] // 날짜 범위가 변경될 때 강도 초기화
      }));
    }
  };

  return (
    <TravelSurveyContext.Provider value={{ travelsurveyData, setTravelSurveyData, updatePeriod }}>
      {children}
    </TravelSurveyContext.Provider>
  );
};