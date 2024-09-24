import React, { createContext, useState } from 'react';

export const TravelSurveyContext = createContext();

export const TravelSurveyProvider = ({ children }) => {
  const [travelsurveyData, setTravelSurveyData] = useState({
    destination: '', // 여행지
    tripName: '', // 여행 이름
    startDate: null, // 여행 시작일
    endDate: null, // 여행 종료일
    intensity: [], // 각 날짜별 여행 강도
    accomodation: [], // 숙박 옵션
    requiredAccomText: '', // 추가로 필요한 숙박 옵션
    accompriority: '', // 숙박 우선순위
    restaurant: [], // 음식점 옵션
    requiredRestText: '', // 추가로 필요한 음식점 옵션
    cafe: [], // 카페 옵션
    travelCategory: [], //여행지 카테고리
    stopwords: '',
    requirewords: '',
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