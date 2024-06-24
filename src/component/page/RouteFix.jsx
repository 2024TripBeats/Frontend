import React from 'react';
import styled from "styled-components";
import { useNavigate, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FAFAFA;
  box-sizing: border-box;
  align-items: center;
  max-width: 500px;
  box-sizing: border-box;
`;

const LogoContainer = styled.div`
  margin-top: 8%;
  margin-bottom: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 7%;
  box-sizing: border-box;
`;

const TravelItemContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  gap: 10px;
  box-sizing: border-box;
`;

const Day = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 16px;
  color: #FAFAFA;
  margin-right: 10px;
  background-color: #3869E0;
  border-radius: 5px;
  padding: 5px 20px;  
  margin-bottom: 30px;
`;

const DayContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  flex-direction: column;
`;

const Circle = styled.div`
  min-width: 60px;
  min-height: 60px;
  border-radius: 50%;
  background-color: ${props => (props.isSelected ? '#3869E0' : '#e7e7e7')};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => (props.isSelected ? '#FAFAFA' : '#252a2f')};
  border: none;
  font-family: "Pretendard-Bold";
  font-size: 13px;
  flex-shrink: 0;
  padding: 10px;
  box-sizing: border-box;
`;

const Line = styled.div`
  width: 2px;
  height: 50px;
  background-color: #e7e7e7;
  flex-shrink: 0;
`;

const TravelDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
  cursor: pointer;
`;

const DestName = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 18px;
  color: #252a2f;
`;

const DestDetails = styled.div`
  font-family: "Pretendard-Medium";
  font-size: 12px;
  color: #252a2f;
`;

const FloatingButton = styled.button.attrs({
    className: 'no-capture'
  })`
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    background-color: #3869E0;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-family: "Pretendard-ExtraBold";
    font-size: 13px;
    z-index: 1000;
  `;
  

const RouteFix = ({ }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const travelDestinations = location.state.travelDestinations;

  const handleSaveImageClick = () => {
    html2canvas(document.querySelector("#route-fix-container"), {
      ignoreElements: (element) => element.classList.contains("no-capture")
    }).then(canvas => {
      const link = document.createElement("a");
      link.download = "route.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };  
  

  const convertDayKeyToKorean = (dayKey) => {
    return `${parseInt(dayKey.replace('day', ''))}일차`;
  };

  const handleDetailClick = (destinationId) => {
    navigate(`/detail/${destinationId}`);
  };

  return (
    <Container id="route-fix-container">
      <LogoContainer>
        <img style={{ width: "30%" }} 
          src={process.env.PUBLIC_URL + '/asset/logo/simplelogo.png'}
          alt='logo' />
      </LogoContainer>
      <ContentContainer>
        {travelDestinations.map((day, dayIndex) => (
          <React.Fragment key={dayIndex}>
            {Object.keys(day).map((dayKey) => (
              <React.Fragment key={dayKey}>
                <DayContainer>
                 <Day>{convertDayKeyToKorean(dayKey)}</Day>
                    {day[dayKey].map((destination, index) => (
                    <TravelItemContainer key={destination.id}>
                        <Circle isSelected={false}>
                        {`여행지${index + 1}`}
                        </Circle>
                        <Line />
                        <TravelDetails onClick={() => handleDetailClick(destination.id)}>
                        <DestName>{destination.name}</DestName>
                        <DestDetails>{destination.details}</DestDetails>
                        </TravelDetails>
                    </TravelItemContainer>
                    ))}
                </DayContainer>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </ContentContainer>
      <FloatingButton onClick={handleSaveImageClick}>이미지로 저장</FloatingButton>
    </Container>
  );
};

export default RouteFix;