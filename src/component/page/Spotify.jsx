import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Spotify = () => {
  const location = useLocation();
  const [accessToken, setAccessToken] = useState("");
  const [trackQueue, setTrackQueue] = useState([]);

  // 이미 알고 있는 트랙 ID 배열
  const trackIds = ["7DMPq3XndRJaj6NTINsLOz", "0cboWVpFSP3KYaxBV5pP78", "7795WJLVKJoAyVoOtCWqXN"];

  // URL에서 액세스 토큰 추출
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access_token");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  // 트랙 ID 배열을 바로 사용
  useEffect(() => {
    setTrackQueue(trackIds.map(id => `spotify:track:${id}`));
  }, []);

  // 플레이리스트 생성 후 리디렉션
  const createPlaylistAndOpenNewWindow = async () => {
    if (trackQueue.length === 0) {
      console.error('트랙 목록이 비어 있습니다.');
      return;
    }

    try {
      // 사용자 정보 가져오기
      const userResponse = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const userData = await userResponse.json();
      const userId = userData.id;

      // 플레이리스트 생성
      const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: '제주 여행 플레이리스트',
          description: 'by TRIPBEATS',
          public: false
        })
      });

      if (!createPlaylistResponse.ok) {
        console.error('플레이리스트 생성 중 오류 발생:', await createPlaylistResponse.text());
        return;
      }

      const playlistData = await createPlaylistResponse.json();
      const playlistId = playlistData.id;

      if (!playlistId) {
        console.error('플레이리스트 ID를 가져오지 못했습니다.');
        return;
      }

      // 플레이리스트에 트랙 추가
      const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: trackQueue
        })
      });

      if (!addTracksResponse.ok) {
        console.error('트랙 추가 중 오류 발생:', await addTracksResponse.text());
        return;
      }

      // 새 창에서 플레이리스트 열기
      const playlistUrl = `https://open.spotify.com/playlist/${playlistId}`;
      window.open(playlistUrl, '_blank');
    } catch (error) {
      console.error('플레이리스트 생성 중 오류 발생:', error);
    }
  };

  return (
    <div>
      <h1>Spotify Playlist Creator</h1>
      {location.pathname === '/spotify' && (
        <>
          <button onClick={createPlaylistAndOpenNewWindow} disabled={trackQueue.length === 0}>Create Playlist & Redirect</button>
        </>
      )}
    </div>
  );
};

export default Spotify;