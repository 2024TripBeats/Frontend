import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false); // 모달 기본 닫힘 상태로 설정
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 초기 이미지 인덱스 상태
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedId = localStorage.getItem("id");

    if (storedName && storedId) {
      setName(storedName);
      setId(storedId);
    } else {
      // Handle case where data is not found in localStorage
      console.error("No user data found in localStorage");
    }
  }, []);

  // 초기 설문 진행 여부에 따라 모달 열림 상태 변경
  useEffect(() => {
    if (id) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/accounts/${id}/doneSurvey`)
        .then(response => response.json())
        .then(data => {
          if (data === false) { // doneSurvey가 false이면 모달 열기
            setModalOpen(true);
          } else {
            setModalOpen(false); // doneSurvey가 true이면 모달 닫기
          }
        })
        .catch(error => console.error("Error fetching survey status:", error));
    }
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % 2); // 이미지 갯수에 따라 변경
    }, 2000);

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, []);

  const handleButtonClick = () => {
    navigate("/destination");
  };

  const handleNavigate = () => {
    setModalOpen(false);
    navigate("/usersurvey1");
  };

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <Container>
      <LogoContainer>
        <LogoMessage style={{marginBottom:"4%"}}>당신을 위한 사운드 트립 서비스</LogoMessage>
        <img style={{width: "55%"}} 
          src={process.env.PUBLIC_URL + `asset/logo/logo.png`}
          alt='logo'/>
      </LogoContainer>
      <AdContainer>
        <ImageContainer index={currentImageIndex}>
          <Image src={process.env.PUBLIC_URL + `asset/ad/gbg.png`} />
          <Image src={process.env.PUBLIC_URL + `asset/ad/myeongdong.png`} />
        </ImageContainer>
        <DotsContainer>
          <Dot active={currentImageIndex === 0 ? "true" : "false"} onClick={() => handleDotClick(0)} />
          <Dot active={currentImageIndex === 1 ? "true" : "false"} onClick={() => handleDotClick(1)} />
        </DotsContainer>
      </AdContainer>
      <Message>{name}님, 여행을 시작해볼까요?</Message>
      <Button onClick={handleButtonClick}>여행 루트 추천받기 🚞</Button>
      {isModalOpen && (
        <Overlay>
          <Modal>
            <ModalText style={{fontSize: "60px", marginBottom: '8%', textShadow:"0 0 2px rgb"}}>🎉</ModalText>
            <ModalText>환영합니다!</ModalText>
            <ModalText>서비스를 이용하기 전, 여러분들의 취향을 파악하고 있어요</ModalText>
            <ModalText style={{marginBottom: '8%'}}>해당 설문은 가입 시 1회만 진행됩니다</ModalText>
            <Button style={{backgroundColor: "#252a2f"}} onClick={handleNavigate}>설문하러 가기</Button>
          </Modal>
        </Overlay>
      )}
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #FAFAFA;
  box-sizing: border-box;
`;

const LogoContainer = styled.div`
  margin-top: 10%;
  margin-bottom: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LogoMessage = styled.div`
    font-size: 10px;
    font-family: "Pretendard-Regular";
    color: #252A2F;
`;

const AdContainer = styled.div`
  margin-bottom: 10%;
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.1);
  width: 350px;
  height: 220px;
  border-radius: 10px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden; /* 추가 */
`;

const ImageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease-in-out; /* 추가 */
  transform: ${props => `translateX(-${props.index * 100}%)`}; /* 추가 */
`;

const Image = styled.img`
  flex-shrink: 0; /* 추가 */
  width: 100%;
  height: 100%;
  object-fit: cover; /* 추가 */
  border-radius: 10px;
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dot = styled.div.attrs(props => ({
  // 'active'를 DOM에 전달하지 않도록 설정
  active: props.active ? undefined : undefined,
}))`
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background-color: ${props => (props.active ? "#FF8A1D" : "#ddd")}; /* active에 따라 색상 변경 */
  border-radius: 50%;
  cursor: pointer;
`;

const Button = styled.button`
  width: auto;
  height: 30px;
  margin: 10px;
  padding: 5px 20px;
  background-color: #FF8A1D;
  border-radius: 20px;
  font-family: "Pretendard-ExtraBold";
  border: none;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  font-size: 11px;
  color: #fafafa;
  cursor: pointer;
`;

const Message = styled.div`
    font-size: 18px;
    font-family: "Pretendard-ExtraBold";
    color: #252A2F;
    margin-bottom: 10px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background-color: white;
  width: 400px;
  padding: 20px;
  border-radius: 15px;
  box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.2);
  z-index: 2;
  text-align: center;
  position: relative;
`;

const ModalText = styled.div`
  font-size: 1.9dvh;
  font-family: "Pretendard-Bold";
  color: #252A2F;
  margin: 10px;
`;