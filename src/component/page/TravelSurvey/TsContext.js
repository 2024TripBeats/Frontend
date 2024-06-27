import React, { createContext, useState } from 'react';

export const TravelSurveyContext = createContext();

export const TravelSurveyProvider = ({ children }) => {
  const [travelsurveyData, setTravelSurveyData] = useState({
    destination: '', // 여행지
    period: '', // 여행 기간 (일)
    intensity: [],
    // accomodation: [],
    // restaurant: [],
    stopwords: '',
    requirewords: '',
  });

  const updatePeriod = (newPeriod) => {
    const periodInt = parseInt(newPeriod, 10);
    if (!isNaN(periodInt)) {
      setTravelSurveyData((prevData) => ({
        ...prevData,
        period: newPeriod,
        intensity: []
      }));
    }
  };

  return (
    <TravelSurveyContext.Provider value={{ travelsurveyData, setTravelSurveyData, updatePeriod }}>
      {children}
    </TravelSurveyContext.Provider>
  );
};