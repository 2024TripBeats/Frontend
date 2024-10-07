import React, { useState, useEffect } from 'react';
import styled, { keyframes } from "styled-components";
import { useNavigate } from 'react-router-dom';

const SelectRoute = () => {
    const [travelDestinations, setTravelDestinations] = useState([]);
    const [selectedDayIndex, setSelectedDayIndex] = useState({}); // 각 경로의 선택된 날짜를 추적
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [flightPrice, setFlightPrice] = useState(0);
    const [isRecommending, setIsRecommending] = useState(false); // 추천 중 상태 추가


    const navigate = useNavigate();

    // 유저 정보 및 항공 가격 가져오기
    useEffect(() => {
        const storedName = localStorage.getItem("name");
        const storedId = localStorage.getItem("id");
        const flightPrice = Number(localStorage.getItem("flightprice"));
    
        if (storedName && storedId) {
            setName(storedName);
            setId(storedId);
            setFlightPrice(flightPrice);
        } else {
            console.error("No user data found in localStorage");
        }
    }, []);

    // 추천 경로 가져오기
    useEffect(() => {
        const storedRecommendations = localStorage.getItem('travelRecommendations');
        console.log(storedRecommendations);
        
        if (storedRecommendations) {
            const parsedData = JSON.parse(storedRecommendations);
            const recommendations = parsedData.recommendations;

            if (Array.isArray(recommendations)) {
                setTravelDestinations(recommendations);

                // 각 코스마다 0일차로 초기화
                const initialDayIndex = recommendations.reduce((acc, _, idx) => {
                    acc[idx] = 0; // 각 코스의 첫 번째 날짜로 초기화
                    return acc;
                }, {});
                setSelectedDayIndex(initialDayIndex);
            } else {
                console.error("Recommendations is not an array");
            }
        }
    }, []);

    useEffect(() => {
        // travelDestinations와 selectedDayIndex가 있을 때 데이터를 확인
        if (travelDestinations.length > 0 && Object.keys(selectedDayIndex).length > 0) {
            travelDestinations.forEach((route, routeIndex) => {
                const selectedDay = selectedDayIndex[routeIndex];
                console.log(`Route ${routeIndex + 1}, Day ${selectedDay + 1}:`, route.itinerary[selectedDay]);
            });
        }
    }, [travelDestinations, selectedDayIndex]);

    // 비용 계산
    const calculateTotalPrice = (itinerary) => {
        const basePrice = itinerary.reduce((total, day) => {
            const dayTotal = day.places.reduce((sum, place) => sum + place.price, 0);
            return total + dayTotal;
        }, 0);
    
        const additionalCostPerDay = 98696;
        const totalDays = itinerary.length;
        
        return basePrice + (additionalCostPerDay * totalDays) + flightPrice;
    };

    // 코스 재추천 받기
    const handleAgainClick = async () => {
        try {
            setIsRecommending(true); // 추천 중으로 상태 설정

            const storedSurveyData = JSON.parse(localStorage.getItem('surveyData'));

            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/recommend/getAllRecommendation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(storedSurveyData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            localStorage.setItem('travelRecommendations', JSON.stringify(result));
            localStorage.setItem('surveyResponseReceived', 'true');

            setIsRecommending(false); // 추천 완료 후 상태 해제
            navigate('/travelsurveyend');
        } catch (error) {
            console.error('Error:', error);
            setIsRecommending(false); // 오류가 발생해도 상태 해제
        }
    };

    // 특정 경로의 날짜 선택 시 호출
    const handleDayChange = (routeIndex, newDayIndex) => {
        setSelectedDayIndex((prev) => ({
            ...prev,
            [routeIndex]: newDayIndex, // 선택된 코스의 날짜를 갱신
        }));
    };

    const showAverageCostInfo = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDetailClick = (routeIndex) => {
        const destination = travelDestinations[routeIndex];
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
                <Message style={{ marginBottom: "10px" }}>원하는 코스를 선택해주세요</Message>

                {travelDestinations.map((route, routeIndex) => (
                    <RouteBox key={routeIndex}>
                        <Message style={{ marginBottom: "10px", fontSize: "16px" }}>여행 코스 {routeIndex + 1}</Message>
                        <DaySelector>
                            <DayButtonContainer>
                                {route.itinerary.map((_, dayIndex) => (
                                    <DayButton
                                        key={dayIndex}
                                        onClick={() => handleDayChange(routeIndex, dayIndex)}
                                        isSelected={selectedDayIndex[routeIndex] === dayIndex}
                                    >
                                        {dayIndex + 1}일차
                                    </DayButton>
                                ))}
                            </DayButtonContainer>
                            <DetailContainer onClick={() => handleDetailClick(routeIndex)}>
                                자세히 보기
                                <DetailButton>
                                    <img src={process.env.PUBLIC_URL + '/asset/icon/passover.png'} alt='detail' />
                                </DetailButton>
                            </DetailContainer>
                        </DaySelector>
                        <RouteContainer>
                            <TravelPathContainer>
                                <PathLine>
                                {/* 선택된 날짜의 places만 렌더링 */}
                                {route.itinerary[selectedDayIndex[routeIndex]]?.places.map((destination, i) => (
                                    <React.Fragment key={destination.placeId + i}> {/* key를 고유하게 설정 */}
                                    <Circle>
                                        {destination.duration !== null && (
                                        <VisitTime>{destination.duration}분</VisitTime>
                                        )}
                                        <div>{destination.placeName}</div>
                                    </Circle>
                                    {i < route.itinerary[selectedDayIndex[routeIndex]].places.length - 1 &&
                                        route.itinerary[selectedDayIndex[routeIndex]].travelSegments && (
                                        <Line>
                                        {route.itinerary[selectedDayIndex[routeIndex]].travelSegments[i]?.distance
                                            ? `${route.itinerary[selectedDayIndex[routeIndex]].travelSegments[i].distance.toFixed(2)}km`
                                            : 'N/A'}
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
                    
                    {isRecommending ? ( // 추천 중일 때는 이모티콘 애니메이션 표시
                        <EmojiWrapper>
                            <Emoji>🔄 </Emoji>
                            <FixButton style={{backgroundColor: "#FF8a1D"}}>다른 루트를 추천중이에요!</FixButton>
                        </EmojiWrapper>
                    ) : ( // 추천 중이 아니면 버튼 표시
                        <FixButton onClick={handleAgainClick}>🔄 다른 루트를 추천받을래요</FixButton>
                    )}
                    <Notice onClick={showAverageCostInfo} style={{ justifyContent: 'flex-end', cursor: 'pointer' }}>ⓘ 평균 제주 여행 경비</Notice>
                </ButtonContainer>
            </ContentContainer>

            {isModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>
                            <Message>평균 제주 여행 경비</Message>
                            <CloseButton onClick={closeModal}>X</CloseButton>
                        </ModalHeader>
                        <ModalBody>
                            <Notice>이 수치는 2023년 제주특별자치도 방문관광객 실태조사를 바탕으로 계산된 1인당 제주 여행 경비를 나타냅니다.</Notice>
                            <Notice style={{ fontFamily: "Pretendard-Bold", marginTop: "10px" }}>1. 연평균 1인 제주 여행 경비</Notice>
                            <Notice>- 전체 평균: 663,705원</Notice>
                            <Notice style={{ fontFamily: "Pretendard-Bold", marginTop: "10px" }}>2. 연령별 평균 경비:</Notice>
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

const fadeInOut = keyframes`
  0%, 20%, 80%, 100% { opacity: 0; }
  30%, 70% { opacity: 1; }
`;

const EmojiWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Emoji = styled.div`
  font-size: 40px;
  animation: ${fadeInOut} 1.5s linear infinite;
`;

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
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;