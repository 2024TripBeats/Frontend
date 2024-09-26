import React from 'react';
import styled from "styled-components";

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = "http://localhost:8000/callback"; // FastAPI 콜백 URL
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "code";
const SCOPES = [
    'streaming', // 스트리밍 권한
    'user-read-email',
    'user-read-private',
    'user-modify-playback-state', // 재생 제어 권한
    'user-read-playback-state',   // 재생 상태 읽기 권한
    'playlist-modify-public',     // 공개 플레이리스트 생성 및 수정 권한
    'playlist-modify-private'     // 비공개 플레이리스트 생성 및 수정 권한
  ].join(' ');

const SpotifyLogin = () => {
  const handleLogin = () => {
    const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPES)}`;
    window.location.href = authUrl; // Spotify 로그인 페이지로 리디렉션
  };

  console.log("CLIENT_ID:", CLIENT_ID);

  return (
    <Container>
      <LogoMessage>스포티파이 로그인</LogoMessage>
      <LoginButton onClick={handleLogin}>로그인</LoginButton>
    </Container>
  );
};

export default SpotifyLogin;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #FAFAFA;
`;

const LogoMessage = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const LoginButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #1db954;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: #1ed760;
  }
`;