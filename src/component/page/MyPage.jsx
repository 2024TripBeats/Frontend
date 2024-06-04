import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 20px;
    background-color: #F1F1DE;
    box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 0.5em;
`;

const Paragraph = styled.p`
  font-size: 1.2em;
`;

const MyPage = () => {
  return (
    <Container>
      <Title>My Page</Title>
      <Paragraph>Welcome to your page!</Paragraph>
    </Container>
  );
};

export default MyPage;