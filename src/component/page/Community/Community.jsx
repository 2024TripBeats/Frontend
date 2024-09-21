import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Community = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [posts, setPosts] = useState([]);

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  // 데이터를 서버에서 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8888/posts/all'); // 실제 API 경로로 수정
        
        // posts를 timestamp 기준으로 정렬 (최신 글이 맨 위로 오도록)
        const sortedPosts = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        setPosts(sortedPosts); // 정렬된 데이터를 상태에 저장
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);

  // PostItem을 클릭했을 때 post_id로 이동 (쿼리스트링 사용)
  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <Container>
      <Header>
        <Message>커뮤니티</Message>
        <HeaderBox>
          <Icon src="asset/icon/search_logo.png" onClick={() => navigate('/search')} />
          <Icon src="asset/icon/write.png" onClick={() => navigate('/write')} />
        </HeaderBox>
      </Header>

      <AdContainer>
        <ImageContainer index={currentImageIndex}>
          <Image src={process.env.PUBLIC_URL + `asset/sample/seoul.jpg`} />
        </ImageContainer>
        <AdText>서울 서비스<br />11월 Coming Soon!</AdText>
        <DotsContainer>
          <Dot active={currentImageIndex === 0} onClick={() => handleDotClick(0)} />
        </DotsContainer>
      </AdContainer>

      <PostList>
        {posts.map((post) => (
          <PostItem key={post.postId} onClick={() => handlePostClick(post.postId)}>
            <PostContent>
              <CategoryTag category={post.category}>{post.category}</CategoryTag>
              <PostTitle>{post.title}</PostTitle>
              <PostDetails>일정 | {post.schedule}</PostDetails>
              <PostDetails>장소 | {post.location}</PostDetails>
            </PostContent>
            <PostImageContainer>
              {/* 이미지가 "none"이 아니고 값이 있을 때만 렌더링 */}
              {post.image && post.image !== "none" && (
                <PostImage src={post.image} />
              )}
              <PostFooter>
                <FooterIcon>
                  <CommentIcon src="asset/icon/comment.png" />
                  <FooterText>{post.comments}</FooterText>
                </FooterIcon>
              </PostFooter>
            </PostImageContainer>
          </PostItem>
        ))}
      </PostList>
    </Container>
  );
};

export default Community;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding-left: 30px;
  padding-right: 30px;
  background-color: #FAFAFA;
  box-sizing: border-box;
`;

const Message = styled.div`
  font-size: 25px;
  font-family: "Pretendard-ExtraBold";
  color: #252A2F;
`;

const Header = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderBox = styled.div`
  display: flex;
  gap: 20%;
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

const AdContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FAFAFA;
  box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.1);
  width: 95%;
  height: 110px;
  border-radius: 10px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
`;

const ImageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease-in-out;
  transform: ${props => `translateX(-${props.index * 100}%)`};
`;

const Image = styled.img`
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const AdText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FAFAFA;
  font-size: 24px;
  font-family: "Pretendard-ExtraBold";
  text-align: center;
  background-color: rgba(0, 0, 0, 0.4); /* 반투명 배경 */
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dot = styled.div`
  width: 7px;
  height: 7px;
  margin: 0 5px;
  background-color: ${props => (props.active ? "#FF8A1D" : "#ddd")};
  border-radius: 50%;
  cursor: pointer;
`;

const PostList = styled.div`
  width: 100%;
`;

const PostItem = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  background-color: #FAFAFA;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
`;

const PostContent = styled.div`
  grid-column: 1 / 2;
`;

const PostImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;

const PostImage = styled.img`
  margin-top: 5px;
  margin-bottom: 5px;
  width: 120px;
  height: 60px;
  background-color: #ddd;
  border-radius: 8px;
  object-fit: cover;
`;

const CategoryTag = styled.div`
  display: inline-block;
  padding: 4px 8px;
  background-color: ${({ category }) => (category === "같이 먹어요" ? "#FF8A1D" : "#F5D870")};
  border-radius: 4px;
  font-size: 12px;
  font-family: "Pretendard-SemiBold";
  margin-bottom: 8px;
`;

const PostTitle = styled.div`
  font-size: 15px;
  margin: 0;
  margin-bottom: 8px;
  font-family: "Pretendard-Medium";
  color: #333;
`;

const PostDetails = styled.div`
  font-size: 12px;
  font-family: "Pretendard-Medium";
  color: #797979;
  margin-bottom: 3px;
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 5px;
`;

const FooterIcon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const FooterText = styled.span`
  font-size: 12px;
  color: #797979;
  font-family: "Pretendard-Medium";
`;

const CommentIcon = styled.img`
  width: 10px;
  height: 10px;
  margin-left: 5px;
  margin-right: 3px;
`;