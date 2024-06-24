import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate, useLocation } from 'react-router-dom';
import response from './dummy.json';

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

const ImageContainer = styled.div`
  margin-top: 5%;
  display: flex;
  background-color: #FAFAFA;
  box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 220px;
  border-radius: 10px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`;

const Image = styled.img`
  flex-shrink: 0;
  width: 50%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px 0 0 10px;
`;

const DetailsContainer = styled.div`
  flex-shrink: 0;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  padding: 0 10px;
  box-sizing: border-box;
  gap: 10px;
`;

const DestName = styled.div`
  font-family: "Pretendard-ExtraBold";
  font-size: 18px;
  color: #252a2f;
`;

const DestDetails = styled.div`
  font-family: "Pretendard-Medium";
  font-size: 12px;
  color: #252a2f;
`;

const DetailButton = styled.button`
  font-family: "Pretendard-SemiBold";
  font-size: 9px;
  margin-top: 10px;
  color: #252a2f;
  border: none;
  border-radius: 20px;
  background-color: #e7e7e7;
  width: 40%;
  height: 20px;
  cursor: pointer;
`;

const RouteBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const RouteContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  max-width: 375px;
  gap: 2px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

const FixButton = styled.button`
  padding: 10px 60px;
  background-color: #3869E0;
  border-radius: 20px;
  font-family: "Pretendard-ExtraBold";
  border: none;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  font-size: 13px;
  color: #FAFAFA;
  cursor: pointer;
`;

const EditButton = styled.button`
  padding: 10px 40px;
  background-color: #FAFAFA;
  border-radius: 20px;
  font-family: "Pretendard-ExtraBold";
  border: none;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  font-size: 13px;
  color: #252a2f;
  cursor: pointer;
`;

const TravelPathContainer = styled.div`
  display: flex;
  overflow-x: auto;
  width: 100%;
  height: 95px;
  max-width: 375px;
  margin: 9px 0;
  white-space: nowrap;
  background-color: #FAFAFA;
  border-radius: 20px;
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
`;

const PathLine = styled.div`
  display: inline-flex;
  align-items: center;
  width: max-content;
`;

const Day = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 16px;
  color: #252a2f;
  margin-right: 10px;
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
  cursor: pointer;
`;

const Line = styled.div`
  min-width: 40px;
  height: 8px;
  background-color: #e7e7e7;
  flex-shrink: 0;
`;

const RouteRecommend = () => {
  const [travelDestinations, setTravelDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTravelDestinations(response.data);
    if (response.data.length > 0 && response.data[0].day1.length > 0) {
      setSelectedDestination(response.data[0].day1[0]);
    }
  }, []);

  const handleCircleClick = (destination) => {
    setSelectedDestination(destination);
  };

  const handleDetailClick = () => {
    navigate(`/detail/${selectedDestination.id}`);
  };

  const handleFixRouteClick = () => {
    navigate('/routefix', { state: { travelDestinations}});
  };

  return (
    <Container>
      <LogoContainer>
        <img style={{ width: "30%" }} 
          src={process.env.PUBLIC_URL + '/asset/logo/simplelogo.png'}
          alt='logo' />
      </LogoContainer>
      <ContentContainer>
        <ImageContainer>
          {selectedDestination && (
            <>
              <Image src={selectedDestination.image_url} />
              <DetailsContainer>
                <DestName>{selectedDestination.name}</DestName>
                <DestDetails>{selectedDestination.details}</DestDetails>
                <DetailButton onClick={handleDetailClick}>자세히 보기</DetailButton>
              </DetailsContainer>
            </>
          )}
        </ImageContainer>
        <RouteBox>
          {travelDestinations.map((day, dayIndex) => (
            <React.Fragment key={dayIndex}>
              {Object.keys(day).map((dayKey) => (
                <React.Fragment key={dayKey}>
                  <RouteContainer>
                  <Day>{dayKey}</Day>
                  <TravelPathContainer>
                    <PathLine>
                      {day[dayKey].map((destination, index) => (
                          <React.Fragment key={destination.id}>
                            <Circle 
                              onClick={() => handleCircleClick(destination)}
                              isSelected={selectedDestination && selectedDestination.id === destination.id}
                            >
                              {destination.name}
                            </Circle>
                            {index < day[dayKey].length - 1 && <Line />}
                          </React.Fragment>
                        ))}
                      </PathLine>
                    </TravelPathContainer>
                  </RouteContainer>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
          <ButtonContainer>
            <FixButton onClick={handleFixRouteClick}>이 루트로 여행 갈래요!</FixButton>
            <EditButton>다시 추천받을래요</EditButton>
          </ButtonContainer>
        </RouteBox>
      </ContentContainer>
    </Container>
  );
};

export default RouteRecommend;