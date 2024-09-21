import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setMinutes, setHours, format } from "date-fns";
import axios from "axios";

const CommunityWrite = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [id, setId] = useState("");  // id 상태 선언
  
  const queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get("post_id");

  const [category, setCategory] = useState("같이 먹어요");
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [schedule, setSchedule] = useState(new Date());
  const [content, setContent] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  // useEffect를 통해 로컬스토리지에서 id를 가져와 상태에 저장
  useEffect(() => {
    const storedId = localStorage.getItem("id");
    if (storedId) {
      setId(storedId);
    }
  }, []);

  useEffect(() => {
    if (postId) {
      // 수정 모드일 때 기존 데이터를 불러옴
      setIsEditMode(true);
      const fetchPostData = async () => {
        try {
          const response = await axios.get(`http://localhost:8888/posts/${postId}`);
          const post = response.data.post || response.data;  // 응답 구조에 맞춰서 변경
          setCategory(post.category);
          setImage(post.image);
          setTitle(post.title);
          setLocationInput(post.location);
          setSchedule(new Date(post.schedule));  // 일정은 Date 객체로 변환
          setContent(post.content);
        } catch (error) {
          console.error("Error fetching post data:", error);
        }
      };
      fetchPostData();
    }
  }, [postId]);

  const isFormComplete = category && title && locationInput && schedule && content;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Base64로 인코딩된 이미지를 상태에 저장
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (isFormComplete) {
      const formattedSchedule = format(schedule, "yyyy-MM-dd HH:mm:ss"); // 일정 포맷 변경
      const formData = {
        accountId: id,  // 로컬스토리지에서 가져온 id 사용
        image: image || "none", // Base64로 인코딩된 이미지 (없으면 none)
        title,
        category,
        location: locationInput,
        schedule: formattedSchedule, // 포맷된 일정
        content,
      };

      if (isEditMode) {
        // 수정 모드일 경우 PATCH 요청
        handleEditPost(formData);
      } else {
        // 새 글 작성일 경우 POST 요청
        handleCreatePost(formData);
      }
    }
  };

  const handleEditPost = (formData) => {
    axios
      .put(`http://localhost:8888/posts/${postId}`, formData)  // PATCH 대신 PUT 사용
      .then(() => {
        navigate("/community");
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  };

  const handleCreatePost = (formData) => {
    axios
      .post("http://localhost:8888/posts", formData)
      .then(() => {
        navigate("/community");
      })
      .catch((error) => {
        console.error("Error creating post:", formData);
      });
  };

  return (
    <Container>
      <Header>
        <Icon src="asset/icon/back.png" onClick={() => navigate("/community")} />
        <Title>{isEditMode ? "게시글 수정하기" : "게시글 작성하기"}</Title>
      </Header>

      <ImageUploadBox onClick={() => document.getElementById("imageUpload").click()}>
        {image ? <img src={image} alt="Upload Preview" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px"}} /> : "📸 사진을 추가하세요"}
      </ImageUploadBox>
      <input id="imageUpload" type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />

      <SelectContainer>
        <CategoryContainer>
          <CategoryButton selected={category === "같이 먹어요"} onClick={() => setCategory("같이 먹어요")}>
            같이 먹어요
          </CategoryButton>
          <CategoryButton selected={category === "같이 놀아요"} onClick={() => setCategory("같이 놀아요")}>
            같이 놀아요
          </CategoryButton>
        </CategoryContainer>

        <InputContainer>
          <Label>장소</Label>
          <InfoInput
            type="text"
            placeholder="장소를 입력하세요"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
          />
        </InputContainer>

        <DateTimeContainer>
          <Label>일정</Label>
          <CustomDatePicker
            selected={schedule}
            onChange={(date) => setSchedule(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="yyyy.MM.dd HH:mm"
            timeCaption="시간"
            minTime={setHours(setMinutes(new Date(), 0), 0)}
            maxTime={setHours(setMinutes(new Date(), 45), 23)}
          />
        </DateTimeContainer>
      </SelectContainer>

      <InputContainer>
        <Input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </InputContainer>

      <InputContainer style={{ marginBottom: "20px" }}>
        <TextArea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </InputContainer>

      <ButtonContainer>
        <SubmitButton active={isFormComplete} onClick={handleSubmit}>
          {isEditMode ? "수정 완료" : "작성 완료"}
        </SubmitButton>
      </ButtonContainer>
    </Container>
  );
};

export default CommunityWrite;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-bottom: 10px;
`;

const Icon = styled.img`
  width: 12px;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 25px;
  margin-left: 10px;
  font-family: "Pretendard-ExtraBold";
  color: #252A2F;
`;

const ImageUploadBox = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
  border: 1px dashed #e9e9e9;
  border-radius: 10px;
  background-color: #eeeeee;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 10px;
  font-family: "Pretendard-SemiBold";
  font-size: 13px;
  color: #707070;
`;

const SelectContainer = styled.div`
  width: 100%;
  margin-bottom: 5px;
`;

const CategoryContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const CategoryButton = styled.button`
  font-size: 13px;
  font-family: "Pretendard-Bold";
  border: none;
  padding: 5px 10px;
  background-color: ${({ selected }) => (selected ? '#FF8A1D' : '#FAFAFA')};
  color: ${({ selected }) => (selected ? '#252a2f' : '#D0D0D0')};
  border-radius: 5px;
  margin-right: 5px;
  cursor: pointer;
  box-shadow: inset 0px 0px 1px rgba(0, 0, 0, 0.25);
`;

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #FAFAFA;
  border-radius: 5px;
  font-size: 18px;
  font-family: "Pretendard-ExtraBold";
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
  &::placeholder {
    color: #D9D9D9;
  }
  &:focus {
    outline: none;
  }
`;

const InfoInput = styled.input`
  width: 75%;
  margin-left: 10px;
  color: #252A2F;
  border: none;
  background-color: #FAFAFA;
  border-radius: 5px;
  font-size: 12px;
  font-family: "Pretendard-Medium";
  box-shadow: inset 0px 0px 1px rgba(0, 0, 0, 0.25);
  padding: 6px 10px;
  &::placeholder {
    color: #D9D9D9;
  }
  &:focus {
    outline: none;
  }
`;

const DateTimeContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Label = styled.label`
  width: 25px;
  font-size: 14px;
  display: block;
  font-family: "Pretendard-Medium";
  color: #252A2F;
  align-items: center;
  margin-right: 30px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  height: 150px;
  border: none;
  background-color: #FAFAFA;
  border-radius: 5px;
  font-size: 14px;
  font-family: "Pretendard-Medium";
  resize: none;
  &::placeholder {
    color: #D9D9D9;
  }
  &:focus {
    outline: none;
  }
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

const CustomDatePicker = styled(DatePicker)`
  width: 75%;
  padding: 6px 10px;
  color: #252A2F;
  border: none;
  background-color: #FAFAFA;
  border-radius: 5px;
  font-size: 12px;
  font-family: "Pretendard-Medium";
  box-shadow: inset 0px 0px 1px rgba(0, 0, 0, 0.25);
  margin-left: 10px;
`;