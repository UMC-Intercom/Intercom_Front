import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ReactQuill, { Quill } from 'react-quill'; //npm install react-quill 필수
import 'react-quill/dist/quill.snow.css'; // Quill 에디터의 스타일시트
import { useNavigate } from 'react-router-dom';
import CurrentEmployCheckingModal from './CurrentEmployCheckingModal';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const categories = [
  { id: 1, name: '영업/고객상담' },
  { id: 2, name: '경영/사무' },
  { id: 3, name: '마케팅/홍보' },
  { id: 4, name: '생산/제조' },
  { id: 5, name: '연구개발/설계' },
  { id: 6, name: 'IT/인터넷' },
  { id: 7, name: '디자인' },
 ];

 const TEMP_DATA_KEY = "temporaryData";


 const PostCreationPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [titleLength, setTitleLength] = useState(0);
  const maxTitleLength = 30;
  const [contentLength, setContentLength] = useState(0);
  const maxContentLength = 500;
  const quillRef = useRef(null);
  const [posts, setPosts] = useState([]); // 글 목록 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false); // 현직자 인증 상태
  const [hasDeferredModal, setHasDeferredModal] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [tempSavedPostId, setTempSavedPostId] = useState(null);





//현직자인증모달띄우기
const handleShowModal = () => {
  setIsModalOpen(true);
};

useEffect(() => {
  // 컴포넌트가 마운트될 때 로컬 스토리지에서 hasDeferredModal 상태를 불러옴
  const storedHasDeferredModal = localStorage.getItem('hasDeferredModal');
  if (storedHasDeferredModal) {
    setHasDeferredModal(storedHasDeferredModal === 'true');
  }
}, []);


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

  const handleImageUpload = (e) => {
    e.stopPropagation(); 
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
  
          // 에디터에 이미지 삽입
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, 'image', resizedImgDataUrl);
          quill.setSelection(range.index + 1);
  
          // 이미지 Data URL을 상태에 저장
          handleImageUploadSuccess(resizedImgDataUrl);
        };
      };
    };
  };

  const handleImageUploadSuccess = (dataUrl) => {
    setImageUrls((prevUrls) => [...prevUrls, dataUrl]);
  };
  
  const handleTitleChange = (e) => {
    e.preventDefault();
    if (e.target.value.length <= maxTitleLength) {
      setTitle(e.target.value);
    }  };

   const accessToken = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기

// 제출 및 현직자 인증
const handleSubmit = async (e) => {
  e.preventDefault();

  // 필수 입력값 검증
  if (!title.trim() || !content.trim()) {
    alert('제목과 내용을 입력해주세요.');
    return;
  }

  try {
    const response = await axios.get('http://localhost:8080/talks/check-mentor', {
      headers: {
        'Authorization': `Bearer ${accessToken}`, // 로컬 스토리지에서 가져온 토큰 사용
      },
    });

    const field = response.data;  // 현직자의 경우 분야 반환
    console.log("** res: ", field)


    if (field !== "") {
      // 인증된 경우, 글 작성 로직 실행
      postSubmission();
    }
    else {
      // 인증 안 된 경우 현직자 인증 모달 표시
      setIsModalOpen(true);
    }
  } catch (error) {
    if (error.response) {
      const responseData = error.response.data; // 서버 응답 데이터에 접근
      const { status, error: errorMessage } = responseData; // 응답 데이터에서 status와 error 추출

      console.error('Error during mentor check:', errorMessage);
      alert('인증 확인 중 오류가 발생했습니다. 다시 시도해주세요.');

  
    } else {
      // 응답 오류 객체가 없는 경우의 처리
      console.error('Error during mentor check:', error);
      alert('응답오류 객체가 없음');
    }
  }
};

//찐제출
    const postSubmission = async () => {
      // FormData 객체 생성 및 필드 추가
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);

      const categoryNames = selectedCategories.map(categoryId => {
        const category = categories.find(c => c.id === categoryId);
        return category ? category.name : null;
      }).filter(Boolean);

      const categoriesString = categoryNames.join(',');
      formData.append('category', categoriesString);
      imageUrls.forEach((url, index) => {
        const blob = dataURLtoBlob(url);
        const file = new File([blob], `image-${index}.jpg`, { type: 'image/jpeg' });
        formData.append('images[]', file);
      });

      try {
        const response = await axios.post('http://localhost:8080/talks', formData, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        });
    
        if (response.status === 200 || response.status === 201) {
          alert('글이 성공적으로 등록되었습니다.');
          navigate('/post-success', { state: { postId: response.data.id } });
        } else {
          throw new Error('서버에서 글 등록을 처리하지 못했습니다.');
        }
      } catch (error) {
        console.error('글 등록 중 오류 발생:', error);
        alert('글 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    };


    const handleCloseModal = () => {
      setIsVerified(true); // 인증을 건너뛰고 글 작성을 계속할 수 있도록 상태 변경
      setIsModalOpen(false); // 모달 닫기
      postSubmission(); // 현직자 인증을 건너뛰고 글 작성 로직 실행
    };




    
// Data URL을 Blob으로 변환하는 함수
function dataURLtoBlob(dataUrl) {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while(n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], {type: mime});
}
    
  //카테고리

    // 선택된 카테고리들을 저장할 상태 (배열)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedCategoryNames, setSelectedCategoryNames] = useState([]);   
   
    const handleDropdownToggle = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
  
    const handleCategoryChange = (categoryId) => {
      setSelectedCategories((prevSelectedCategories) => {
        const isSelected = prevSelectedCategories.includes(categoryId);
        if (isSelected) {
          // 카테고리 선택 해제 시, 해당 카테고리 ID 및 이름 제거
          const updatedCategories = prevSelectedCategories.filter(id => id !== categoryId);
          const updatedCategoryNames = updatedCategories.map(id => categories.find(category => category.id === id).name);
          setSelectedCategoryNames(updatedCategoryNames);
          return updatedCategories;
        } else {
          // 카테고리 선택 시, 해당 카테고리 ID 추가 및 이름 업데이트
          const updatedCategories = [...prevSelectedCategories, categoryId];
          const updatedCategoryNames = updatedCategories.map(id => categories.find(category => category.id === id).name);
          setSelectedCategoryNames(updatedCategoryNames);
          return updatedCategories;
        }
      });
    };

    

    let selectedCategoriesHeader = '카테고리 선택';
    if (selectedCategoryNames.length > 0) {
    if (selectedCategoryNames.length <= 2) {
      // 2개 이하 선택 시 모든 카테고리 이름 나열
      selectedCategoriesHeader = selectedCategoryNames.join(', ');
    } else {
      // 3개 이상 선택 시 첫 2개 나열 후 나머지는 "외 N개"로 표시
      selectedCategoriesHeader = `${selectedCategoryNames.slice(0, 2).join(', ')} 외 ${selectedCategoryNames.length - 2}개`;
    }
  }

  const handleSave = async () => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  
  const categoryNames = selectedCategories.map(categoryId => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : null;
  }).filter(Boolean);

  const categoriesString = categoryNames.join(',');
  formData.append('category', categoriesString); 

  // 이미지 파일 추가
  imageUrls.forEach((url, index) => {
    const blob = dataURLtoBlob(url);
    const file = new File([blob], `image-${index}.jpg`, { type: 'image/jpeg' });
    formData.append('images[]', file);
  });

  try {
    const response = await axios.post('http://localhost:8080/talks/temporary-save', formData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200 || response.status === 201) {
      alert('글이 임시 저장되었습니다.');
    } else {
      throw new Error('Unexpected response status: ' + response.status);
    }
  } catch (error) {
    console.error('Error during temporary save:', error);
    alert('임시 저장 중 오류가 발생했습니다. 다시 시도해주세요.');
  }
};


  const handleCancel = () => {
    setTitle('');
    setContent('');
    setSelectedCategories([]);
    setImageUrls([]);
  
    localStorage.removeItem(TEMP_DATA_KEY);
  
    navigate(-1);
    alert("작성 내용이 초기화되었으며, 이전 페이지로 돌아갑니다.");
  };
  
const location = useLocation();

useEffect(() => {
  if (location.pathname === '/posting') {
    const params = new URLSearchParams(window.location.search);
    const fromTalkTalk = params.get('from') === 'talktalk';

    if (fromTalkTalk) {
      const savedData = localStorage.getItem(TEMP_DATA_KEY);
      if (savedData) {
        const shouldLoadData = window.confirm("임시저장된 글이 있습니다. 불러오시겠습니까?");
        if (shouldLoadData) {
          const { id: tempSavedPostId, title: savedTitle, content: savedContent } = JSON.parse(savedData);
          setTempSavedPostId(tempSavedPostId);
          setTitle(savedTitle);
          setContent(savedContent);
        }
      }
    }
  }
}, [location.pathname]);

    
  return (
    <PageContainer>
      <BackButtonContainer>
      <BackButton onClick={handleGoBack}>&lt; 뒤로가기</BackButton>
      </BackButtonContainer>
      <Form onSubmit={handleSubmit}>
      <InputContainer>
        <Input 
          type="text" 
          placeholder="제목을 입력하세요" 
          value={title} 
          onChange={handleTitleChange} 
        />
         <TitleCounter>({titleLength}/{maxTitleLength}자)</TitleCounter>
         </InputContainer>

         <ContentContainer>
            <StyledReactQuill
              ref={quillRef}
                theme="snow"
               value={content}
               onChange={setContent}
            />
<ImageButton  type="button" onClick={handleImageUpload}> {/*폼안에있으므로 버튼형식 확실히 해야 인식 잘댐 */}
  <img src="./assets/Group26.png" alt="이미지 아이콘" /> 
  이미지 첨부하기
</ImageButton>
<ContentCounter>
          ({contentLength}/{maxContentLength}자)
        </ContentCounter>

      <DropdownContainer>
        <DropdownHeader onClick={handleDropdownToggle}>
        {selectedCategoriesHeader}
          <DropdownIndicator isOpen={isDropdownOpen}></DropdownIndicator>
        </DropdownHeader>
        {isDropdownOpen && (
          <DropdownList>
           {categories.map((category) => (
          <DropdownItem key={category.id}>
            <CheckboxLabel>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
              <span className="checkmark"></span>
            </CheckboxLabel>
            {category.name}
          </DropdownItem>
        ))}
          </DropdownList>
        )}
      </DropdownContainer>
        </ContentContainer>
        <SaveCancelButtonContainer>
        <Button  type="button" onClick={handleCancel}>작성 취소</Button>
        <Button  type="button" onClick={handleSave}>임시저장</Button>
        </SaveCancelButtonContainer>
        <ButtonContainer>
          <SubmitButton type="submit">질문 등록</SubmitButton>
        </ButtonContainer>
      </Form>
      {isModalOpen && (
  <CurrentEmployCheckingModal
    isOpen={isModalOpen}
    onClose={handleCloseModal} // "나중에 하기" 버튼 클릭 시 호출될 함수
  />
)}

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
const BackButtonContainer = styled.div`
max-width: 77.125rem;`;

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
    align-items: center; 
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
      outline: none;
      border-color: #5B00EF; 
    }

  &::placeholder {
    display: flex;
    align-items: center;
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
  position: relative; 
`;
const StyledReactQuill = styled(ReactQuill)`

.ql-container {
  height: 100%;
  border: none !important; //이렇게하면안됨 ㅠ
  
}
    .ql-editor {
      position: relative; 
    top: -1.56rem;      
      height: 32.94rem;
    font-size: 1.25rem;
    font-weight: 300;
    font-family: 'SUITE', sans-serif;
    line-height: 2.34375rem;
    margin-left:1.58rem;
    margin-right:1.58rem;
    border-bottom: 2px solid #E2E2E2;
    
  }

  .ql-toolbar {
    position: relative;
    top: -4rem;
    left: 0;
    display: flex;
    justify-content: center; 
    align-items: center; 
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
    transform: scale(0.95); 
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
margin-top:7px;
margin-left:-1px;
  position: absolute;
  width: 21.25rem;  
  height: 27rem;
  background-color: #fff;
  border: 3px solid #E2E2E2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.div`
width: 14.25rem;
height: 2.25rem;
justify-content: flex;
border-bottom: 2px solid #E2E2E2;
margin-left: 3rem;
display: flex;
align-items: center; 
padding: 10px;

`;

const CheckboxLabel = styled.label`
display: flex;
margin-right: 2.5rem; 
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
  align-items: flex-end; 
  justify-content: space-between; 
  font-size: 1.0625rem;
  font-weight: 700;
  font-family: 'SUITE', sans-serif;
  transition: transform 0.1s, background-color 0.1s; 

  img {
    margin-right: 0.56rem; 
    width: 1.875rem;
    height: 1.875rem;
  }
  &:active {
    transform: scale(0.95); 
  }
`;


const ContentCounter = styled.div`
    position: absolute;
    width: 6.375rem;
bottom: 10.13rem; 
right: 2.38rem;
    color: #636363;
    font-family: SUITE;
    font-size: 1.0625rem;
    font-weight: 700;
    text-align: right;
`;
const SaveCancelButtonContainer = styled.div`
  position: relative;
  margin-top: 1.69rem;
  margin-left:62.4rem; 
  width: 16rem; 
  height: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  & > button {
    margin-right: 1rem; 
  }

  & > button:last-child {
    margin-right: 0;
  }
`;
const Button = styled.button`
  background-color: transparent; 
  color: #636363; 
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
    background-color: rgba(128, 128, 128, 0.2); 
  }
  &:active {
    transform: scale(0.95); 
  }
`;
const BackButton = styled.div`
display: flex;
font-size:16px;
font-weight: 700;
cursor: pointer;
background-color: #fff;
color: #5B00EF;
border: none;
padding: 10px;
border-radius: 5px;
margin-top: 4rem;
margin-right: 70rem;
font-family: SUITE;

margin-bottom: -5.5rem;  
align-self: flex-start;  
`;