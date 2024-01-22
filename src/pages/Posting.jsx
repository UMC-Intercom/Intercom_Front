import React, { useState } from 'react';
import styled from 'styled-components';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill 에디터의 스타일시트


const PostCreationPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    console.log(title, content);
  };

  const CustomToolbar = () => (
    <div id="toolbar">
      <button className="ql-bold">Bold</button>
      <button className="ql-italic">Italic</button>
    </div>
  );

  return (
    <PageContainer>
      <Form onSubmit={handleSubmit}>
        <Input 
          type="text" 
          placeholder="제목을 입력하세요" 
          value={title} 
          onChange={handleTitleChange} 
        />

<StyledReactQuill
  theme="snow"
  value={content}
  onChange={setContent}
/>

        
        <ButtonContainer>
          <SubmitButton type="submit">질문 등록</SubmitButton>
        </ButtonContainer>
      </Form>
    </PageContainer>
  );
};
export default PostCreationPage;

// Styled Components
const PageContainer = styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh; 
`;

const Form = styled.form`
display: flex;
flex-direction: column;
width: 100%; // 폼의 너비를 전체로 설정
max-width: 75.125rem; // 최대 너비 제한
padding: 1rem; // 폼 내부의 여백
margin-top: 5.25rem;


`;

const Input = styled.input`

  width: 100%;
  height: 3.75rem;
  border-width: 2px;
  border-style: solid;
  border-color: #5B00EF;
  border-radius: 0.8rem;
margin-bottom:7.81rem;
  &::placeholder {
    font-size: 1.25rem;
    font-weight: 700;
    font-family: 'SUITE', sans-serif;
    color: #A1A1A1;
    padding-left: 2.56rem; 
  }
`;


const StyledReactQuill = styled(ReactQuill)`
  .ql-container {
    resize: none;
    width: 100%;
    height: 41.6875rem;
    border-style: solid;
    border-color: #A1A1A1;
    border-radius: 0.8rem;
    border-width: 3px; // 중복 제거
    border-top: 3px solid #A1A1A1; // 순서 조정
    font-size: 1.5625rem;
    font-weight: 600;
    font-family: 'SUITE', sans-serif;
    line-height: 2.34375rem;
  }

  .ql-editor {
    padding: 2.44rem 2.56rem;
  }

  .ql-toolbar {
    width: 23.9375rem;
    height: 3rem;
    margin-left: 0.19rem;
    margin-bottom: 0.87rem;
  }
`;



const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SubmitButton = styled.button`
  background-color: #5B00EF;
  color: white;
  border: none;
  cursor: pointer;
  width: 12.5rem;
height: 4rem;
font-size: 1.25rem;
font-weight: 700;
font-family: SUITE;
margin-top:6.31rem;
border-radius: 0.625rem;


  &:hover {
    background-color: #4e00d1;
  }
`;
