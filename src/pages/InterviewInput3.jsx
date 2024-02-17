import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ReactQuill, { Quill } from 'react-quill'; //npm install react-quill 필수
import 'react-quill/dist/quill.snow.css'; // Quill 에디터의 스타일시트
import { useNavigate } from 'react-router-dom';


 const TEMP_DATA_KEY = "temporaryData";


 const InterviewInput3= () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [titleLength, setTitleLength] = useState(0);
  const maxTitleLength = 30;
  const [contentLength, setContentLength] = useState(0);
  const maxContentLength = 500;
  const quillRef = useRef(null);
  const [posts, setPosts] = useState([]); // 글 목록 상태 추가

  const handleGoBack = () => {
    navigate(-1); // 뒤로가기 기능 실행
  };
//제목글자수
  useEffect(() => {
    setTitleLength(title.length);
  }, [title]);
  

  //내용글자수
  useEffect(() => {
    const text = content.replace(/<[^>]*>?/gm, '');
    setContentLength(text.length);
  }, [content]);

  //이미지
  useEffect(() => {
    const quill = quillRef.current;
    if (quill) {
      quill.getEditor().getModule('toolbar').addHandler('image', () => {
        handleImageUpload();
      });
    }
  }, []);
  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
  
    input.onchange = async () => {
      const file = input.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
  
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
  
          // 이미지 사이즈 조정 로직
          const MAX_WIDTH = 400;
          let width = img.width;
          let height = img.height;
  
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
  
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
  
          const resizedImgDataUrl = canvas.toDataURL('image/jpeg');
  
          // 조정된 이미지를 Quill 에디터에 삽입
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, 'image', resizedImgDataUrl);
          quill.setSelection(range.index + 1);
        };
      };
    };
  };
  
  const handleTitleChange = (e) => {
    if (e.target.value.length <= maxTitleLength) {
      setTitle(e.target.value);
    }  };
   

   const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, content, categories: selectedCategories };
    setPosts([...posts, newPost]); // 글 목록 상태 업데이트
    // 나머지 로직...
  };

  //카테고리

    // 선택된 카테고리들을 저장할 상태 (배열)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
  
    const handleDropdownToggle = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    const handleCategoryChange = (categoryId) => {
      setSelectedCategories((prev) =>
        prev.includes(categoryId)
          ? prev.filter((id) => id !== categoryId)
          : [...prev, categoryId]
      );
    };

    const handleSave = () => {
      const temporaryData = { title, content };
      localStorage.setItem(TEMP_DATA_KEY, JSON.stringify(temporaryData));
      alert("임시저장 되었습니다.");
    };
  
    const handleCancel = () => {
      localStorage.removeItem(TEMP_DATA_KEY);
      alert("작성이 취소되고 글이 삭제되었습니다.");
      navigate(-1);  
    };
    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const fromTalkTalk = params.get('from') === 'talktalk';
    
      if (fromTalkTalk) {
        const savedData = localStorage.getItem(TEMP_DATA_KEY);
        if (savedData) {
          const shouldLoadData = window.confirm("임시저장된 글이 있습니다. 불러오시겠습니까?");
          if (shouldLoadData) {
            const { title: savedTitle, content: savedContent } = JSON.parse(savedData);
            setTitle(savedTitle);
            setContent(savedContent);
          }
        }
      }
    }, []);
    
    
  return (
    <PageContainer>
      <Form onSubmit={handleSubmit}>
         <ContentContainer>
<ImageButton onClick={handleImageUpload}>
  <img src="./assets/Group26.png" alt="이미지 아이콘" /> 
  이미지 첨부하기
</ImageButton>
<ContentCounter>
          ({contentLength}/{maxContentLength}자)
        </ContentCounter>

        </ContentContainer>
        <SaveCancelButtonContainer>
        <Button onClick={handleCancel}>작성 취소</Button>
        <Button onClick={handleSave}>임시저장</Button>
        </SaveCancelButtonContainer>
        <ButtonContainer>
          <SubmitButton type="submit">질문 등록</SubmitButton>
        </ButtonContainer>
      </Form>
    </PageContainer>
  );
};
export default InterviewInput3;

// Styled Components
const PageContainer = styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh; 
`;
const BackButtonContainer = styled.div`
max-width: 75.125rem;`;

const Form = styled.form`
display: flex;
flex-direction: column;
width: 100%; // 폼의 너비를 전체로 설정
max-width: 75.125rem; // 최대 너비 제한
padding: 1rem; // 폼 내부의 여백
margin-top: 5.25rem;


`;
const InputContainer = styled.div`
  position: relative;
  margin-bottom:3.94rem;
  // 최대 너비 제한

`;

const TitleCounter = styled.div`
  position: absolute;
  width: 6.375rem;
  height: 1.5625rem;
  text-align: right;
margin-top: 1.12rem;
margin-left: 71rem;
  font-family: SUITE;
font-size: 1.0625rem;
font-weight: 700;
  color: #636363;
`;
const Input = styled.input`
display: flex;
    align-items: center; // 세로 중앙 정렬
    width: 75.125rem;   
    height: 3.75rem;
  border-width: 0.2rem;;
  border-style: solid;
  border-color: #5B00EF;
  border-radius: 0.8rem;
  padding-left: 2.56rem; 
  font-weight: 700;
    font-family: 'SUITE', sans-serif;
    color: #000;
    font-size: 1.25rem;
    
    &:focus {
      outline: none; // 포커스 상태에서 아웃라인 제거
      border-color: #5B00EF; // 필요한 경우 특정 색상으로 변경
    }

  &::placeholder {
    display: flex;
    align-items: center; // 세로 중앙 정렬
    font-size: 1.25rem;
    font-weight: 700;
    font-family: 'SUITE', sans-serif;
    color: #A1A1A1;
  }
`;

const ContentContainer = styled.div`
  width: 78.125rem;
  height: 41.6875rem;
  border: 3px solid #A1A1A1;
  border-radius: 0.8rem;
  margin-top: 5.13rem;;
  position: relative; /* 이 부분을 추가하세요 */

`;
const StyledReactQuill = styled(ReactQuill)`

.ql-container {
  height: 100%;
  border: none !important; //이렇게하면안됨 ㅠ
  
}
    .ql-editor {
      position: relative; // 상대적 위치 설정
    top: -1.56rem;      
      height: 32.94rem;
    font-size: 1.25rem;
    font-weight: 300;
    font-family: 'SUITE', sans-serif;
    line-height: 2.34375rem;
    margin-left:1.58rem;
    margin-right:1.58rem;
    
  }

  .ql-toolbar {
    position: relative; // 상대적 위치 설정
    top: -4rem;
    left: 0;
    display: flex;
    justify-content: center; // 중앙 정렬
    align-items: center; // 세로 중앙 정렬
    width: 23.9375rem;
    height: 3rem;
    font-family: 'SUITE', sans-serif;
    background: #EFF0F4;
    font-color: #636363;
    border: none;
    button {
      font-size: 1.25rem;
    }

    .ql-picker-label, .ql-picker-item {
      display: flex;
      align-items: center; 
      font-size: 1rem; 
    }
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
  &:active {
    transform: scale(0.95); /* 버튼을 5% 축소 */
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  margin-left: 2.06rem;
  border-radius: 0.625rem;
  border: 2px solid #A1A1A1;
  width: 21.4375rem;
  height: 3rem;
  `;

const DropdownHeader = styled.div`
padding: 10px;
display: flex;
justify-content: space-between;
align-items: center;
margin-left: 3rem;
margin-right: 1.12rem;
margin-top: 0.19rem;

`;

const DropdownIndicator = styled.span`
display: inline-block;
width: 1rem;
height: 1rem;
background-image: url('./assets/Vector3.png');
background-size: contain;
background-repeat: no-repeat;
transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'none')};
transition: transform 0.3s;
`;

const DropdownList = styled.div`
  position: absolute;
  width: 21.25rem;  
  height: 27rem;
  background-color: #fff;
  border: 3px solid #E2E2E2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.div`\
width: 14.25rem;
height: 2.25rem;
justify-content: flex;
border-bottom: 2px solid #E2E2E2;
margin-left: 3rem;
display: flex;
align-items: center; // 체크박스와 텍스트를 세로 중앙정렬합니다.
padding: 10px;

`;

const CheckboxLabel = styled.label`
display: flex;
margin-right: 2.5rem; // 라벨과 카테고리 이름 사이의 간격을 설정합니다.
position: relative;
cursor: pointer;

input {
  opacity: 0;
  position: absolute;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: -0.5rem;;
  left: 0;
  width: 1.25rem;
height: 1.25rem;
  background-color: #eee;
  border-radius: 4px;
  &:after {
    content: "";
    position: absolute;
    display: none;
    left: 0.4rem;
    top: 0.15rem;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
}

input:checked ~ .checkmark {
  background-color: #5B00EF;
  &:after {
    display: block;
  }
}
`;
// ImageButton을 styled.button에서 컴포넌트로 변경

const ImageButton = styled.button`
  position: absolute;
  bottom: 10.13rem; 
  right: 9rem; 
  z-index: 1000;
  background-color: transparent;
  color: #A1A1A1;
  border-radius: 5px; 
  cursor: pointer; 
  border: none; 
  display: flex; 
  align-items: flex-end; /* 이미지와 텍스트를 바닥으로 정렬 */
  justify-content: space-between; /* 내부 요소 사이에 공간 동등 분배 */
  font-size: 1.0625rem;
  font-weight: 700;
  font-family: 'SUITE', sans-serif;
  transition: transform 0.1s, background-color 0.1s; 

  img {
    margin-right: 0.56rem; /* 아이콘과 텍스트 사이의 간격 */
    width: 1.875rem;
    height: 1.875rem;
  }
  &:active {
    transform: scale(0.95); /* 버튼을 5% 축소 */
  }
`;


const ContentCounter = styled.div`
    position: absolute;
    width: 6.375rem;
bottom: 10.13rem; 
right: 2.38rem;
    color: #636363; // 글자 색상
    font-family: SUITE;
    font-size: 1.0625rem;
    font-weight: 700;
    text-align: right;
`;
const SaveCancelButtonContainer = styled.div`
  position: relative;
  margin-top: 1.69rem;
  margin-left:62.4rem; 
  width: 16rem; /* 너비를 자동으로 조절 */
  height: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end; /* 버튼을 오른쪽으로 정렬 */
  /* 버튼 간격 조절 */
  & > button {
    margin-right: 1rem; /* 버튼 사이의 간격을 조절할 수 있습니다. */
  }

  /* 마지막 버튼의 오른쪽 마진 제거 */
  & > button:last-child {
    margin-right: 0;
  }
`;
const Button = styled.button`
  background-color: transparent; /* 버튼 기본 색상 */
  color: #636363; /* 여기서 색상 코드 앞에 '#'가 누락되었습니다. */
  border: 2px solid #A1A1A1;
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-family: SUITE;
  font-size: 1.25rem;
  font-weight: 700;
  border-radius: 0.625rem;
  transition: background-color 0.2s;
  width: 7.5rem;
  height: 3.375rem;

  &:hover {
    background-color: rgba(128, 128, 128, 0.2); /* 버튼 호버 색상 */
  }
  &:active {
    transform: scale(0.95); /* 버튼을 5% 축소 */
  }
`;
const BackButton = styled.div`
display: flex;
cursor: pointer;
background-color: #5B00EF;
color: white;
border: none;
padding: 10px;
border-radius: 5px;
margin-top: 4rem;
margin-right: 70rem;
margin-bottom: -5.5rem;  // 제목 입력칸과의 간격
align-self: flex-start;  // 왼쪽 정렬
`;