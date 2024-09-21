import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

const CommunityPost = () => {
  const [postData, setPostData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get('post_id');

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`/api/post/${postId}`); // 실제 API 경로로 수정
        setPostData(response.data);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    if (postId) {
      fetchPostData();
    }
  }, [postId]);

  const handleImageClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleEdit = () => {
    // 수정을 위해 /write로 이동하면서, postId를 쿼리스트링에 담아 보냄
    navigate(`/write?post_id=${postId}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/post/${postId}`); // 서버에서 게시글 삭제 요청
      navigate('/community'); // 삭제 후 커뮤니티 페이지로 이동
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Header>
        <Icon src="asset/icon/back.png" onClick={() => navigate('/community')} />
        <Title>커뮤니티</Title>
      </Header>

      <ImageContainer>
        <Image 
          src={postData.post.image}
          alt="Uploaded Image" 
          onClick={handleImageClick}
        />
      </ImageContainer>

      <ContentInfoContainer>
        <Category>{postData.post.category}</Category>
        <TitleBox>
          <PostTitle>{postData.post.title}</PostTitle>
          <Author><AppoInfo>작성자</AppoInfo>{postData.post.kakaoName}</Author>
        </TitleBox>
        <AppoContainer>
          <AppoInfo>일정 | {postData.post.schedule}</AppoInfo>
          <AppoInfo>장소 | {postData.post.location}</AppoInfo>
        </AppoContainer>
      </ContentInfoContainer>

      <Content>
        {postData.post.content}<br/>
      </Content>

      <CommentsSection>
        <CommentTitle>댓글 <CommentCount>{postData.post.totalCount}개</CommentCount></CommentTitle> 
        {postData.post.commentList.map((comment) => (   
          <Comment key={comment.commentId}>
            <CommentInfoBox>
              <CommentAuthor>{comment.kakaoName}</CommentAuthor> 
              <AppoInfo style={{color: '#acacac'}}>{comment.timestamp}</AppoInfo>
            </CommentInfoBox>
            <CommentContent>{comment.content}</CommentContent>
          </Comment>
        ))}
      </CommentsSection>

      <ButtonContainer>
        <SubmitButton onClick={handleEdit}>수정</SubmitButton>
        <SubmitButton onClick={handleDelete}>삭제</SubmitButton>
      </ButtonContainer>

      <InputContainer>
        <Input placeholder="댓글을 입력하세요" />
        <Button>
          <ButtonImage src="/asset/icon/send.png" alt="Send" />
        </Button>
      </InputContainer>

      {showPopup && (
        <PopupOverlay onClick={handleClosePopup}>
          <PopupImage 
            src={postData.post.image}
            alt="Popup Image"
          />
        </PopupOverlay>
      )}
    </Container>
  );
};

export default CommunityPost;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  padding-right: 30px;
  background-color: #FAFAFA;
  box-sizing: border-box;
  padding-bottom: 100px;
`;

const Header = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 12px;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 23px;
  margin-left: 10px;
  font-family: "Pretendard-ExtraBold";
  color: #252A2F;
`;

const ImageContainer = styled.div`
  height: 140px;
  display: flex;
  border: 1px solid #e9e9e9;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  font-family: "Pretendard-SemiBold";
  font-size: 13px;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
`;

const ContentInfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid #e9e9e9;
  padding-bottom: 20px;
  box-sizing: border-box;
`;

const Category = styled.div`
  font-size: 12px;
  font-family: "Pretendard-SemiBold";
  border: none;
  padding: 5px 10px;
  background-color:#FF8A1D;
  color: #252a2f;
  border-radius: 5px;
  margin-right: 5px;
  cursor: pointer;
  box-shadow: inset 0px 0px 1px rgba(0, 0, 0, 0.25);
`;

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 13px;
`;

const PostTitle = styled.div`
  font-size: 17px;
  font-family: "Pretendard-Bold";
  color: #252A2F;
`;

const Author = styled.div`
  font-size: 13px;
  font-family: "Pretendard-Bold";
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #252A2F;
  gap: 4px;
`;

const AppoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 10px;
`;

const AppoInfo = styled.div`
  font-size: 12px;
  font-family: "Pretendard-Regular";
  color: #797979;
`;

const Content = styled.div`
  padding: 20px 0;
  font-family: "Pretendard-Medium";
  font-size: 13.5px;
  color: #252A2F;
  box-sizing: border-box;
  border-bottom: 1px solid #e9e9e9;
  white-space: pre-wrap;
  line-height: 1.5;
`;

const CommentTitle = styled.div`
  font-size: 17px;
  font-family: "Pretendard-Bold";
  color: #252A2F;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const CommentsSection = styled.div`
  padding: 20px 0;
`;

const CommentCount = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 14px;
  color: #9e9e9e;
`;

const Comment = styled.div`
  padding: 5px 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const CommentInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const CommentAuthor = styled.div`
  font-family: "Pretendard-Bold";
  color: #252A2F;
  font-size: 14px;
  margin-right: 5px;
`;

const CommentContent = styled.div`
  font-family: "Pretendard-Regular";
  color: #252A2F;
  font-size: 13.5px;
`;

const InputContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px 20px;
  /* background-color: #fff;
  border-top: 1px solid #eee; */
  align-items: center;
  box-sizing: border-box;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  font-size: 13px;
  border: none;
  background-color: #f2f2f2;
  color: #252A2F;
  box-shadow: inset 0px 0px 1px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  margin-right: 10px;
  &::placeholder {
    color: #bababa;
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: #FF8A1D;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonImage = styled.img`
  /* width: 18px; */
  height: 12px;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const PopupImage = styled.img`
  max-width: 90%;
  max-height: 90%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  gap: 10%;
`;

const SubmitButton = styled.button`
  padding: 10px 40px;
  background-color: ${({ active }) => (active ? '#FF8A1D' : '#d6d6d6')};
  color: ${({ active }) => (active ? '#252a2f' : '#4a4a4a')};
  border: none;
  border-radius: 20px;
  font-family: "Pretendard-ExtraBold";
  font-size: 13px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  cursor: ${({ active }) => (active ? 'pointer' : 'not-allowed')};
  opacity: ${({ active }) => (active ? '1' : '0.5')};
`;


// const CommunityPost = () => {
//   const [postData, setPostData] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const dummyData = {
//       post: {
//         postId: 123,
//         title: "홍대에서 저녁 같이 먹어요!",
//         category: "같이 먹어요",
//         content: "어쩌구저쩌구 \n이렇게저렇게 \n계산은 식당에서 각자계산",
//         schedule: "2024-09-21 20:00",
//         location: "서울 홍대 맛집",
//         userId: 456,
//         kakaoName: "김와빅",
//         timestamp: "2024-09-19 18:30:50",
//         image: "Base64 인코딩 뭐시기",
//         totalCount: 2, // totalCount 사용
//         commentList: [
//           {
//             commentId: 1,
//             userId: 8097,
//             kakaoName: "최빅타", // username 대신 kakaoName 사용
//             content: "내일 식당 앞으로 가면 될까요?",
//             timestamp: "2024-09-20 17:44:00" // created_at 대신 timestamp 사용
//           },
//           {
//             commentId: 2,
//             userId: 456,
//             kakaoName: "김와빅", // username 대신 kakaoName 사용
//             content: "아뇨 싫어요",
//             timestamp: "2024-09-20 19:01:00" // created_at 대신 timestamp 사용
//           }
//         ]
//       }
//     };

//     setPostData(dummyData);
//   }, []);

//   const handleImageClick = () => {
//     setShowPopup(true);
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   if (!postData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Container>
//       <Header>
//         <Icon src="asset/icon/back.png" onClick={() => navigate('/community')} />
//         <Title>커뮤니티</Title>
//       </Header>

//       <ImageContainer>
//         <Image 
//           src={postData.post.image}
//           alt="Uploaded Image" 
//           onClick={handleImageClick}
//         />
//       </ImageContainer>

//       <ContentInfoContainer>
//         <Category>{postData.post.category}</Category>
//         <TitleBox>
//           <PostTitle>{postData.post.title}</PostTitle>
//           <Author><AppoInfo>작성자</AppoInfo>{postData.post.kakaoName}</Author>
//         </TitleBox>
//         <AppoContainer>
//           <AppoInfo>일정 | {postData.post.schedule}</AppoInfo>
//           <AppoInfo>장소 | {postData.post.location}</AppoInfo>
//         </AppoContainer>
//       </ContentInfoContainer>

//       <Content>
//         {postData.post.content}<br/>
//       </Content>

//       <CommentsSection>
//         <CommentTitle>댓글 <CommentCount>{postData.post.totalCount}개</CommentCount></CommentTitle> 
//         {postData.post.commentList.map((comment) => (   
//           <Comment key={comment.commentId}>
//             <CommentInfoBox>
//               <CommentAuthor>{comment.kakaoName}</CommentAuthor> 
//               <AppoInfo style={{color: '#acacac'}}>{comment.timestamp}</AppoInfo>
//             </CommentInfoBox>
//             <CommentContent>{comment.content}</CommentContent>
//           </Comment>
//         ))}
//       </CommentsSection>

//       <InputContainer>
//         <Input placeholder="댓글을 입력하세요" />
//         <Button>
//           <ButtonImage src="/asset/icon/send.png" alt="Send" />
//         </Button>
//       </InputContainer>

//       {showPopup && (
//         <PopupOverlay onClick={handleClosePopup}>
//           <PopupImage 
//             src={postData.post.image}
//             alt="Popup Image"
//           />
//         </PopupOverlay>
//       )}
//     </Container>
//   );
// };

// export default CommunityPost;