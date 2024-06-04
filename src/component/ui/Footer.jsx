import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 500px; /* AppContainer의 max-width와 동일하게 설정 */
  height: 50px;
  background-color: #ffffff;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const StyledLink = styled(Link)`
  color: #5f5f59;
  text-decoration: none;
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 10px;
  font-family: "Pretendard-ExtraBold";
  box-sizing: border-box;
  gap: 5px;
  color: black;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <StyledLink to="/home">
        <img src="/asset/footer/home.png" alt="home"
        style={{height: '15px'}}/>
        홈
      </StyledLink>
      <StyledLink to="/mypage">
        <img src="/asset/footer/user.png" alt="mypage" 
        style={{height: '15px'}}/>
        마이페이지
      </StyledLink>
    </FooterContainer>
  );
};

export default Footer;
