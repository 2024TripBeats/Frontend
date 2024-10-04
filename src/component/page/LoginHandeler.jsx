import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const LoginHandler = (props) => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const KAKAO_AUTH_BACK = `${process.env.REACT_APP_API_BASE_URL}/login/oauth2/callback/kakao`;

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `${KAKAO_AUTH_BACK}?code=${code}`,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Access-Control-Allow-Origin": "*",
          },
        });


        console.log(res);

        const { kakaoName, id } = res.data.account;

        console.log("kakaoName:", kakaoName);
        console.log("kakaoId:", id);

        localStorage.setItem("name", kakaoName);
        localStorage.setItem("id", id);

        navigate("/home");
      } catch (error) {
        console.error("Login failed", error);
        // Handle the error accordingly
      }
    };
    kakaoLogin();
  }, [code, navigate]);

  return (
    <LoginContainer>
      <NoticeContainer>
        <SpinnerContainer>
          <Message>로그인 중입니다.</Message>
          <Message>잠시만 기다려주세요.</Message>
          <Spinner />
        </SpinnerContainer>
      </NoticeContainer>
    </LoginContainer>
  );
};

export default LoginHandler;

// Styled components for LoginHandler
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fafafa;
`;

const NoticeContainer = styled.div`
  text-align: center;
  font-family: "Pretendard-Regular";
  color: #252a2f;
`;

const Message = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  font-family: "Pretendard-SemiBold";
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #ddd;
  border-top: 4px solid #ff8a1d;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-top: 20px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;