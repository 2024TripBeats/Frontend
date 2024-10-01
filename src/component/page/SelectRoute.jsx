import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { set } from 'date-fns';

const SelectRoute = () => {
    const [travelDestinations, setTravelDestinations] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [dayIndexByRoute, setDayIndexByRoute] = useState({});
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [flightPrice, setFlightPrice] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
      const storedName = localStorage.getItem("name");
      const storedId = localStorage.getItem("id");
      const flightPrice = Number(localStorage.getItem("flightprice")); // flightPrice를 숫자로 변환
  
      if (storedName && storedId) {
          setName(storedName);
          setId(storedId);
          setFlightPrice(flightPrice);
      } else {
          console.error("No user data found in localStorage");
      }
  }, []);

    useEffect(() => {
        const storedRecommendations = localStorage.getItem('travelRecommendations');
        
        if (storedRecommendations) {
            const recommendations = JSON.parse(storedRecommendations);
            setTravelDestinations(recommendations);
            console.log("Loaded travel recommendations:", recommendations);  // 데이터 로드 확인
    
            // DayIndexByRoute 설정
            const initialDayIndex = {};
            recommendations.forEach((_, idx) => {
                initialDayIndex[idx] = 0;
            });
            setDayIndexByRoute(initialDayIndex);
        }
    }, []);

    const calculateTotalPrice = (itinerary) => {
        const basePrice = itinerary.reduce((total, day) => {
            const dayTotal = day.places.reduce((sum, place) => sum + place.price, 0);
            return total + dayTotal;
        }, 0);
    
        const additionalCostPerDay = 98696;
        const totalDays = itinerary.length;
        
        // 기본 가격에 추가 비용(일자별 추가 비용) 더하기
        return basePrice + (additionalCostPerDay * totalDays) + flightPrice;
    };

    const handleFixRouteClick = async () => {
        try {
            // 기존 설문 데이터를 가져옴
            const surveyData = JSON.parse(localStorage.getItem("surveyData"));
            if (!surveyData) {
                console.error("No survey data found");
                return;
            }

            // 서버로 데이터 전송
            const response = await fetch('http://localhost:8888/recommend/getAllFinalRecommendation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(surveyData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);

            // 추천 데이터를 localStorage에 저장
            localStorage.setItem('travelRecommendations', JSON.stringify(result));
            localStorage.setItem('surveyResponseReceived', 'true');

            // 이동하면서 새로운 추천 경로를 로딩
            navigate('/travelsurveyend');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDayChange = (candidateIndex, newDayIndex) => {
        setDayIndexByRoute((prev) => ({
            ...prev,
            [candidateIndex]: newDayIndex,
        }));
    };

    const showAverageCostInfo = () => {
        setIsModalOpen(true);  // 모달 열기
    };

    const closeModal = () => {
        setIsModalOpen(false);  // 모달 닫기
    };

    const handleDetailClick = (candidateIndex) => {
      const destination = travelDestinations[candidateIndex];
      const storedFlightPrice = Number(localStorage.getItem('flightprice'));
  
      navigate('/recommend', { state: { selectedDestination: destination, flightPrice: storedFlightPrice } });
  };

    return (
        <Container>
            <LogoContainer>
                <img style={{ width: "30%" }} src={process.env.PUBLIC_URL + '/asset/logo/logo.png'} alt='logo' />
            </LogoContainer>
            <ContentContainer>
                <Message>{name}님을 위한 여행코스가 추천되었어요!</Message>
                <Message style={{marginBottom:"10px"}}>원하는 코스를 선택해주세요</Message>

                {travelDestinations.map((route, candidateIndex) => (
                    <RouteBox key={candidateIndex}>
                        <Message style={{marginBottom:"10px", fontSize:"16px"}}>여행 코스 {candidateIndex + 1}</Message>
                        <DaySelector>
                            <DayButtonContainer>
                                {route.itinerary.map((day, i) => (
                                    <DayButton
                                        key={i}
                                        onClick={() => handleDayChange(candidateIndex, i)}
                                        isSelected={dayIndexByRoute[candidateIndex] === i}
                                    >
                                        {day.dayNumber}일차
                                    </DayButton>
                                ))}
                            </DayButtonContainer>
                            <DetailContainer onClick={() => handleDetailClick(candidateIndex)}>
                                자세히 보기
                                <DetailButton>
                                    <img src={process.env.PUBLIC_URL + '/asset/icon/passover.png'} alt='detail' />
                                </DetailButton>
                            </DetailContainer>
                        </DaySelector>
                        <RouteContainer>
                            <TravelPathContainer>
                                <PathLine>
                                    {/* 안전하게 places 접근하기 위해 조건부 렌더링 추가 */}
                                    {route.itinerary[dayIndexByRoute[candidateIndex]]?.places?.map((destination, i) => (
                                        <React.Fragment key={destination.placeId}>
                                            <Circle>
                                            {destination.duration !== null && (
                                                <VisitTime>{destination.duration}분</VisitTime>
                                            )}
                                                <div>{destination.placeName}</div>
                                            </Circle>
                                            {i < route.itinerary[dayIndexByRoute[candidateIndex]].places.length - 1 && (
                                                <Line>
                                                    {route.itinerary[dayIndexByRoute[candidateIndex]].travelSegments[i].distance.toFixed(2)}km
                                                </Line>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </PathLine>
                            </TravelPathContainer>
                            <CostContainer>
                                <CostLabel>예상 경비</CostLabel>
                                <CostAmount>{calculateTotalPrice(route.itinerary).toLocaleString()}원</CostAmount>
                            </CostContainer>
                        </RouteContainer>
                    </RouteBox>
                ))}

                <ButtonContainer>
                    <Notice>다른 여행코스를 추천받고 싶다면</Notice>
                    <Notice>아래 버튼을 눌러주세요!</Notice>
                    <FixButton onClick={handleFixRouteClick}>🔄 다른 루트를 추천받을래요</FixButton>
                    <Notice onClick={showAverageCostInfo} style={{justifyContent: 'flex-end', cursor: 'pointer'}}>ⓘ 평균 제주 여행 경비</Notice>
                </ButtonContainer>
            </ContentContainer>

            {/* 모달 창 */}
            {isModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>
                            <Message>평균 제주 여행 경비</Message>
                            <CloseButton onClick={closeModal}>X</CloseButton>
                        </ModalHeader>
                        <ModalBody>
                            <Notice>이 수치는 2023년 제주특별자치도 방문관광객 실태조사를 바탕으로 계산된 1인당 제주 여행 경비를 나타냅니다.</Notice>
                            <Notice style={{fontFamily:"Pretendard-Bold", marginTop:"10px"}}>1. 연평균 1인 제주 여행 경비</Notice>
                            <Notice>- 전체 평균: 663,705원</Notice>
                            <Notice style={{fontFamily:"Pretendard-Bold", marginTop:"10px"}}>2. 연령별 평균 경비:</Notice>
                            <Notice>- 15세 ~ 19세: 662,318원</Notice>
                            <Notice>- 20세 ~ 29세: 656,005원</Notice>
                            <Notice>- 30세 ~ 39세: 668,651원</Notice>
                            <Notice>- 40세 ~ 49세: 666,876원</Notice>
                            <Notice>- 50세 ~ 59세: 661,216원</Notice>
                            <Notice>- 60세 이상: 671,309원</Notice>
                        </ModalBody>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};

export default SelectRoute;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fafafa;
  box-sizing: border-box;
  margin-bottom: 70px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-width: 80%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
`;

const ModalBody = styled.div`
`;


const Message = styled.div`
    font-size: 18px;
    font-family: "Pretendard-ExtraBold";
    color: #252a2f;
    text-align: center;
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
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding-left: 7%;
    padding-right: 7%;
    background-color: #FAFAFA;
    box-sizing: border-box;
`;

const RouteBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: self-start;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 0px;
    width: 100%;
    border: none;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    padding: 10px;
    background-color: #fafafa;
    position: relative;  /* 디테일 버튼과 예상 경비 배치를 위해 position 설정 */
`;

const RouteContainer = styled.div`
    display: flex;
    justify-content: space-between;  /* 두 요소를 양 끝에 배치 */
    align-items: center;
    width: 100%;
    margin-top: 10px;
`;


const DaySelector = styled.div`
    display: flex;
    justify-content: space-between;  /* 왼쪽 버튼들과 오른쪽 디테일 버튼 사이에 공간을 균등 배분 */
    align-items: center;
    width: 100%;
`;

const DayButtonContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const DayButton = styled.button`
  padding: 5px 10px;
  font-family: "Pretendard-Bold";
  background-color: ${props => (props.isSelected ? '#252a2f' : '#e7e7e7')};
  color: ${props => (props.isSelected ? '#FF8a1D' : '#252a2f')};
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 12px;
`;

const DetailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Pretendard-Bold";
  color: #252a2f;
  font-size: 12px;
  cursor: pointer;  /* 전체 컨테이너에 클릭 가능 표시 */
`;

const DetailButton = styled.button`
  background-color: #fafafa;
  border: none;
  padding: 0;  /* padding 제거 */
  margin-left: 5px;
  border: none; /* border 제거 */
  outline: none; /* outline 제거 */
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 15px;
  }
`;

const CostContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-family: "Pretendard-ExtraBold";
    font-size: 12px;
    color: #252a2f;
    max-width: 25%;  /* CostContainer가 전체의 25% 차지 */
`;

const CostLabel = styled.div`
    color: #252a2f; 
    font-family: "Pretendard-Regular";
    margin-bottom: 1px;
`;

const CostAmount = styled.div`
    color: #252a2f;
    font-size: 14px;
    font-family: "Pretendard-ExtraBold";
`;

const TravelPathContainer = styled.div`
    display: flex;
    overflow-x: auto;
    height: 95px;
    max-width: 75%;  /* TravelPathContainer가 전체의 75% 차지 */
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

const Circle = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 40px;
  min-height: 40px;
  border-radius: 50%;
  background-color: #e7e7e7;
  display: flex;
  justify-content: center;
  align-items: center;
  color:#252a2f;
  border: none;
  font-family: "Pretendard-Bold";
  font-size: 11px;
  flex-shrink: 0;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
`;

const VisitTime = styled.div`
  font-family: "Pretendard-SemiBold";
  font-size: 8px;
  color: #252a2f;
  margin-bottom: 3px;
`;

const Line = styled.div`
  min-width: 20px;
  height: 7px;
  background-color: #e7e7e7;
  font-family: "Pretendard-Regular";
  font-size: 8px;
  align-items: center;
  display: flex;
  justify-content: center;
  color: #575757;
  padding: 2px 9px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 50px;
  background-color: #efefef;
  border-radius: 20px;
  padding: 10px;
`;

const Notice = styled.div`
  font-family: "Pretendard-Medium";
  font-size: 12px;
  margin-bottom: 5px;
  color: #252a2f;
`;

const FixButton = styled.button`
  padding: 10px 60px;
  background-color: #Fafafa;
  border-radius: 20px;
  font-family: "Pretendard-ExtraBold";
  border: none;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  font-size: 13px;
  color: #252a2f;
  margin-top: 5px;
  margin-bottom: 10px;
  cursor: pointer;
`;