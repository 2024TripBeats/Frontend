import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Style for the overall container
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 40px;
  padding-right: 40px;
  background-color: #FAFAFA;
  box-sizing: border-box;
  padding-bottom: 100px; /* 버튼 아래 여유 공간 */
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

const CommunityWrite = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('같이 먹어요');
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [schedule, setSchedule] = useState('');
  const [content, setContent] = useState('');

  const [name, setName] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedId = localStorage.getItem("id");

    if (storedName && storedId) {
      setName(storedName);
      setId(storedId);
    } else {
      // Handle case where data is not found in localStorage
      console.error("No user data found in localStorage");
    }
  }, []);

  // 버튼 활성화 조건: 모든 필드가 채워졌을 때
  const isFormComplete = category && title && location && schedule && content;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (isFormComplete) {
      const formData = {
        id,                  // 작성자의 ID
        image: image || 'none', // 이미지 (없으면 none)
        title,               // 제목
        category,            // 카테고리
        location,            // 장소
        schedule,            // 일정
        content,             // 본문 내용
      };
  
      console.log('Submitted: ', formData);
  
      // // 실제 API 요청 코드 (주석 처리)
      // fetch('https://api.example.com/community/posts', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // })
      // .then(response => response.json())
      // .then(data => {
      //   console.log('Success:', data);
      //   // 성공 시 페이지 이동
      //   navigate('/community'); //일단 커뮤니티 페이지로 이동
      // })
      // .catch((error) => {
      //   console.error('Error:', error);
      // });
    }
  };


  return (
    <Container>
      <Header>
        <Icon src="asset/icon/back.png" onClick={() => navigate('/community')} />
        <Title>게시글 작성하기</Title>
      </Header>
      {/* Image upload box */}
      <ImageUploadBox onClick={() => document.getElementById('imageUpload').click()}>
        {image ? <img src={image} alt="Upload Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px'}} /> : '📸 사진을 추가하세요'}
      </ImageUploadBox>
      <input id="imageUpload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />

      <SelectContainer>
        <CategoryContainer>
          <CategoryButton selected={category === '같이 먹어요'} onClick={() => setCategory('같이 먹어요')}>같이 먹어요</CategoryButton>
          <CategoryButton selected={category === '같이 놀아요'} onClick={() => setCategory('같이 놀아요')}>같이 놀아요</CategoryButton>
        </CategoryContainer>
        <InputContainer>
          <Label>장소</Label>
          <InfoInput
            type="text" 
            placeholder="장소를 입력하세요" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
          />
        </InputContainer>
        <DateTimeContainer>
          <Label>일정</Label>
          <InfoInput 
            type="datetime-local" 
            value={schedule} 
            onFocus={(e) => e.target.showPicker()} // 클릭하면 바로 달력이 뜨도록
            onChange={(e) => setSchedule(e.target.value)} 
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

      <InputContainer style={{marginBottom: "20px"}}>
        <TextArea 
          placeholder="내용을 입력하세요" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
        />
      </InputContainer>

      {/* Submit Button fixed at the bottom */}
      <ButtonContainer>
        <SubmitButton active={isFormComplete} onClick={handleSubmit}>
          완료
        </SubmitButton>
      </ButtonContainer>
    </Container>
  );
};

export default CommunityWrite;