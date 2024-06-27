import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const LoginHandler = (props) => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const KAKAO_AUTH_BACK = `http://localhost:8888/login/oauth2/callback/kakao`;

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

        const { kakaoName, id } = res.data.account;

        console.log('kakaoName:', kakaoName); // Log the kakaoName
        console.log('kakaoId:', id); // Log the kakaoId

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
    <div className="LoginHandler">
      <div className="notice">
        <p>로그인 중입니다.</p>
        <p>잠시만 기다려주세요.</p>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default LoginHandler;