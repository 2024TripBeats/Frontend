import React, { useContext, useState, useRef } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserSurveyContext } from './UsContext';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #FAFAFA;
    box-sizing: border-box;
`;

const LogoContainer = styled.div`
  margin-top: 8%;
  margin-bottom: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SurveyContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 8%;
  padding: 0 7%;
  box-sizing: border-box;
  gap: 10px;
`;

const Question = styled.div`
  font-size: 15px;
  font-family: "Pretendard-ExtraBold";
  color: #252a2f;
  text-align: center;
`;

const TextInput = styled.input`
  width: 100%;
  height: 30px;
  font-size: 12px;
  font-family: "Pretendard-Regular";
  color: #252A2F;
  background-color: #FAFAFA;
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom: 15px;
`;

const PhoneNumberContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  justify-content: space-between;
  flex-direction: row;
`;

const GenderButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
`;

const GenderButton = styled.button`
  flex: 1;
  margin: 0 5px;
  background-color: ${props => (props.selected ? '#3869E0' : '#FAFAFA')};
  color: ${props => (props.selected ? 'white' : '#252A2F')};
  border: none;
  border-radius: 10px;
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.2);
  height: 30px;
  font-size: 12px;
  font-family: "Pretendard-ExtraBold";
  cursor: pointer;
`;

const Select = styled.select`
  width: 100%;
  height: 30px;
  font-size: 12px;
  font-family: "Pretendard-Regular";
  color: #252A2F;
  background-color: #FAFAFA;
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
  padding: 0 10px;
  box-sizing: border-box;
`;

const Button = styled.button`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 60px;
  background-color: ${props => (props.active ? '#3869E0' : '#848484')};
  border-radius: 20px;
  font-family: "Pretendard-ExtraBold";
  border: none;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  font-size: 13px;
  color: #FAFAFA;
  cursor: ${props => (props.active ? 'pointer' : 'not-allowed')};
`;

const VitalContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3px;
`;

const VitalSign = styled.div`
  font-size: 10px;
  font-family: "Pretendard-ExtraBold";
  color: #d50f0f;
`;

const UsStep1 = () => {
  const navigate = useNavigate();
  const { usersurveyData, setUserSurveyData } = useContext(UserSurveyContext);
  const [phoneParts, setPhoneParts] = useState({ phone1: '', phone2: '', phone3: '' });

  const phone1Ref = useRef(null);
  const phone2Ref = useRef(null);
  const phone3Ref = useRef(null);

  const isFormComplete = () => {
    const { name, email, gender, age, phone } = usersurveyData;
    return name && email && gender && age && phone;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserSurveyData(prevData => ({ ...prevData, [name]: value }));
  };

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    if ((name === 'phone1' && value.length <= 3) ||
        (name === 'phone2' && value.length <= 4) ||
        (name === 'phone3' && value.length <= 4)) {
      setPhoneParts(prevParts => {
        const newParts = { ...prevParts, [name]: value };
        const combinedPhone = `${newParts.phone1}${newParts.phone2}${newParts.phone3}`;
        setUserSurveyData(prevData => ({ ...prevData, phone: combinedPhone }));

        if (name === 'phone1' && value.length === 3) {
          phone2Ref.current.focus();
        } else if (name === 'phone2' && value.length === 4) {
          phone3Ref.current.focus();
        }

        return newParts;
      });
    }
  };

  const handleGenderChange = (gender) => {
    const genderValue = gender === '남' ? 1 : 2;
    setUserSurveyData(prevData => ({ ...prevData, gender: genderValue }));
  };

  const handleNavigate = () => {
    if (isFormComplete()) {
      navigate('/usersurvey2');
    }
  };

  return (
    <Container>
      <LogoContainer>
        <img style={{ width: "30%" }} 
          src={process.env.PUBLIC_URL + `asset/logo/simplelogo.png`}
          alt='logo' />
      </LogoContainer>
      <SurveyContainer>
        <VitalContainer>
          <Question>이름</Question>
          <VitalSign>*</VitalSign>
        </VitalContainer>
        <TextInput 
          type="text" 
          name="name"
          placeholder="이름을 입력해주세요" 
          value={usersurveyData.name}
          onChange={handleInputChange}
        />
        <VitalContainer>
          <Question>이메일 주소</Question>
          <VitalSign>*</VitalSign>
        </VitalContainer>
        <TextInput 
          type="text" 
          name="email"
          placeholder="이메일을 입력해주세요" 
          value={usersurveyData.email}
          onChange={handleInputChange}
        />
        <VitalContainer>
          <Question>전화번호</Question>
          <VitalSign>*</VitalSign>
        </VitalContainer>
        <PhoneNumberContainer>
          <TextInput
            type="text"
            name="phone1"
            placeholder="010"
            value={phoneParts.phone1}
            onChange={handlePhoneChange}
            ref={phone1Ref}
          />
          <TextInput
            type="text"
            name="phone2"
            placeholder="1234"
            value={phoneParts.phone2}
            onChange={handlePhoneChange}
            ref={phone2Ref}
          />
          <TextInput
            type="text"
            name="phone3"
            placeholder="5678"
            value={phoneParts.phone3}
            onChange={handlePhoneChange}
            ref={phone3Ref}
          />
        </PhoneNumberContainer>
        <VitalContainer>
          <Question>성별</Question>
          <VitalSign>*</VitalSign>
        </VitalContainer>
        <GenderButtonContainer>
          <GenderButton
            selected={usersurveyData.gender === 1}
            onClick={() => handleGenderChange('남')}
          >
            남
          </GenderButton>
          <GenderButton
            selected={usersurveyData.gender === 2}
            onClick={() => handleGenderChange('여')}
          >
            여
          </GenderButton>
        </GenderButtonContainer>
        <VitalContainer>
          <Question>연령대</Question>
          <VitalSign>*</VitalSign>
        </VitalContainer>
        <Select 
          name="age"
          value={usersurveyData.age}
          onChange={handleInputChange}
        >
          <option value="">연령대를 선택해주세요</option>
          <option value="10대">10대</option>
          <option value="20대">20대</option>
          <option value="30대">30대</option>
          <option value="40대">40대</option>
          <option value="50대">50대</option>
          <option value="그 이상">그 이상</option>
        </Select>
      </SurveyContainer>
      <Button 
        active={isFormComplete()} 
        onClick={handleNavigate}
      >
        다음으로
      </Button>
    </Container>
  );
};

export default UsStep1;