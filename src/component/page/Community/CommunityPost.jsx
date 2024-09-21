import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const CommunityPost = () => {
  const [postData, setPostData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // 삭제 확인 팝업 상태
  const navigate = useNavigate();
  const { postId } = useParams(); // URL에서 postId 가져오기

  // 데이터 받아오기
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/posts/${postId}`);
        setPostData(response.data);  // 데이터를 상태에 저장
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    if (postId) {
      fetchPostData();  // postId가 있을 때 데이터 요청
    }
  }, [postId]);

  const handleImageClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleEdit = () => {
    navigate(`/write?post_id=${postId}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8888/posts/${postId}`);
      navigate('/community'); // 삭제 후 커뮤니티 페이지로 이동
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // 삭제 팝업 열기
  const openDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  // 삭제 팝업 닫기
  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  // postData가 없거나 데이터가 로드되지 않으면 로딩 표시
  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Header>
        <Icon src="/asset/icon/back.png" onClick={() => navigate('/community')} />
        <Title>커뮤니티</Title>
      </Header>

      {/* 이미지가 "none"이 아닐 경우에만 이미지 박스를 렌더링 */}
      {postData.image !== "none" && (
        <ImageContainer>
          <Image 
            src={postData.image}
            alt="Uploaded Image" 
            onClick={handleImageClick}
          />
        </ImageContainer>
      )}

      <ContentInfoContainer>
        <Category>{postData.category}</Category>
        <TitleBox>
          <PostTitle>{postData.title}</PostTitle>
          <Author><AppoInfo>작성자</AppoInfo>{postData.kakaoName}</Author>
        </TitleBox>

        {/* Flexbox를 사용하여 일정/장소와 버튼을 가로로 배치 */}
        <AppoButtonContainer>
          <AppoContainer>
            <AppoInfo>일정 | {postData.schedule}</AppoInfo>
            <AppoInfo>장소 | {postData.location}</AppoInfo>
          </AppoContainer>
          <ButtonContainer>
            <SubmitButton onClick={handleEdit}>수정</SubmitButton>
            <SubmitButton onClick={openDeleteConfirmation}>삭제</SubmitButton>
          </ButtonContainer>
        </AppoButtonContainer>
      </ContentInfoContainer>

      <Content>
        {postData.content}<br/>
      </Content>

      <CommentsSection>
        <CommentTitle>댓글 <CommentCount>{postData.totalCount}개</CommentCount></CommentTitle> 
        {postData.commentList.map((comment) => (   
          <Comment key={comment.commentId}>
            <CommentInfoBox>
              <CommentAuthor>{comment.kakaoName}</CommentAuthor> 
              <AppoInfo style={{color: '#acacac'}}>{comment.timestamp}</AppoInfo>
            </CommentInfoBox>
            <CommentContent>{comment.content}</CommentContent>
          </Comment>
        ))}
      </CommentsSection>

      <InputContainer>
        <Input placeholder="댓글을 입력하세요" />
        <Button>
          <ButtonImage src="/asset/icon/send.png" alt="Send" />
        </Button>
      </InputContainer>

      {showPopup && (
        <PopupOverlay onClick={handleClosePopup}>
          <PopupImage 
            src={postData.image}
            alt="Popup Image"
          />
        </PopupOverlay>
      )}

      {showDeleteConfirmation && (
        <DeleteConfirmationOverlay>
          <DeleteConfirmationBox>
            <DeleteConfirmationText>정말 삭제하시겠습니까?</DeleteConfirmationText>
            <DeleteConfirmationButtons>
              <DeleteButton onClick={handleDelete}>네</DeleteButton>
              <CancelButton onClick={closeDeleteConfirmation}>아니오</CancelButton>
            </DeleteConfirmationButtons>
          </DeleteConfirmationBox>
        </DeleteConfirmationOverlay>
      )}
    </Container>
  );
};

export default CommunityPost;

// 스타일 컴포넌트 정의

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

const AppoButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;

const AppoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const AppoInfo = styled.div`
  font-size: 12px;
  font-family: "Pretendard-Regular";
  color: #797979;
`;

const ButtonContainer = styled.div`
  padding-top: 5px;
  box-sizing: border-box;
  display: flex;
`;

const SubmitButton = styled.button`
  padding: 5px;
  color: #252a2f;
  border: none;
  background-color: #FAFAFA;
  font-family: "Pretendard-Medium";
  font-size: 10px;  /* 글씨 크기 줄임 */
  cursor: pointer;
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

const DeleteConfirmationOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;
`;

const DeleteConfirmationBox = styled.div`
  background-color: #FAFAFA;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
`;

const DeleteConfirmationText = styled.div`
  font-family: "Pretendard-ExtraBold";
  font-size: 16px;
  margin-bottom: 20px;
`;

const DeleteConfirmationButtons = styled.div`
  display: flex;
  justify-content: space-around;
`;

const DeleteButton = styled.button`
  padding: 10px 20px;
  background-color: #cdcdcd;
  color: white;
  font-family: "Pretendard-ExtraBold";
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #FF8A1D;
  color: #FAFAFA;
  font-family: "Pretendard-ExtraBold";
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;