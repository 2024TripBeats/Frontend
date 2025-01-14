import React from 'react';
import styled from "styled-components";



const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #FAFAFA;
    box-sizing: border-box;
    position: relative; /* 상대적 위치 설정 */
    z-index: 0; /* Container의 z-index 설정 */
`;

const Message = styled.div`
    font-size: 10px;
    font-family: "Pretendard-Regular";
    color: #252A2F;
`;

const InitialPage = () => {

    const CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    return (
        <Container>
            <Message style={{marginBottom:"7%"}}>당신을 위한 사운드 트립 서비스</Message>
            <img
                style={{width: "55%", marginBottom:"20%"}}
                src={process.env.PUBLIC_URL + `asset/logo/logo.png`}
                alt="Logo"
            />
            <a href={KAKAO_AUTH_URL} className="kakaobtn">
                <img
                    style={{width: "130px", boxShadow: "0 0 1px rgba(0,0,0,0.1)", borderRadius: "5px", marginBottom:"15%"}}
                    src={process.env.PUBLIC_URL + `asset/kakao_login.png`}
                    alt="Kakao Login"
                />
            </a>
            <Message style={{marginBottom:"1%"}}>회원가입</Message>
            <Message>개인정보정책</Message>
        </Container>
    );
};

export default InitialPage;