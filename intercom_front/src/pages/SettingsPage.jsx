// SettingsPage.jsx
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';
import config from '../path/config';

const SettingsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleLogin } = useAuth();
  const { isLoggedIn } = useAuth();
  const [username, setUsername] = useState('사용자');
  const [usernickname, setUsernickname] = useState('닉네임');
  const [coins, setCoins] = useState(0);

  const isCurrentPath = (path) => location.pathname === path;

  useEffect(() => {
    // 로컬 스토리지에서 사용자 이름을 가져와 상태에 저장
    const storedUsername = localStorage.getItem('userName') || '사용자';
    setUsername(storedUsername);
    const storedUsernickname = localStorage.getItem('userNickname') || '닉네임';
    setUsernickname(storedUsernickname);
    const storedImageUrl = localStorage.getItem('profileImageUrl') || './assets/MyProfile.png';
    setProfileImage(storedImageUrl);
  }, [isLoggedIn]);

  useEffect(() => {
    // 사용자의 보유 코인 정보 조회
    const fetchCoins = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/coin`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // 인증 토큰 추가
          },
        });
        setCoins(response.data); // 보유 코인 상태 업데이트
      } catch (error) {
        console.error('코인 정보 조회 실패:', error);
      }
    };

    fetchCoins();
  }, []);

  


  const [profileImage, setProfileImage] = useState('./assets/MyProfile.png');

  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    axios.post(`${process.env.REACT_APP_API_URL}/users/default-profile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // 인증 토큰 추가
      },
    })
    .then((response) => {
      const uploadedImageUrl = response.data; // Adjust according to actual response structure
      localStorage.setItem('profileImageUrl', uploadedImageUrl);
      setProfileImage(uploadedImageUrl);
    })
    .catch((error) => {
      // 업로드 실패 시 처리: 사용자에게 에러 메시지 표시
      alert('이미지 업로드에 실패했습니다.');
      console.error('업로드 실패:', error);
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);

      handleFileUpload(file);
    }
  };

  
  const handleLogout = () => {
    // 로컬 스토리지에서 액세스 토큰 삭제
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userNickname');
    localStorage.removeItem('profileImageUrl');
    localStorage.setItem('isLoggedIn', 'false'); // 로그인 상태를 false로 설정

    // 로그인 상태 업데이트
    toggleLogin();

    // 로그인 페이지 또는 홈으로 리다이렉트
    navigate('/'); // 또는 navigate('/') 등 원하는 경로로 변경하세요.
  };

  

  return (
    <PageContainer>
      <MenuContainer>
      <Divider />
      <MenuItem
        className={isCurrentPath('/scrap') ? 'selected' : ''}
        onClick={() => navigate('/scrap')}
        >
        스크랩
      </MenuItem>
      <MenuItem
        className={isCurrentPath('/settings') ? 'selected' : ''}
        onClick={() => navigate('/settings')}
      >
        설정
      </MenuItem>
      <NewDivider />
      <LogoutText onClick={handleLogout}>로그아웃</LogoutText>
    </MenuContainer>

      <Content>
        <ProfileSection>
          <ProfileImage src={profileImage} alt="Profile" />
          <EditButtonContainer>
            <label htmlFor="profile-upload">
              <EditButton src="./assets/Edit1.png" alt="Edit" />
            </label>
          </EditButtonContainer>
          <FileInput
            id="profile-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <NameAndNickname>
            <NameContainer onClick={() => navigate('/profile-edit')}>
              <Name>{username} 님</Name>
              <VectorImage src="./assets/Vector2.png" alt="Vector" />
            </NameContainer>
            <NicknameAndCoinContainer>
              <Nickname>{usernickname}</Nickname>
              <Coin>보유 코인: {coins} </Coin>
            </NicknameAndCoinContainer>
          </NameAndNickname>
        </ProfileSection>

        <OptionSection>
          <Section>
            <SectionTitle>MY</SectionTitle>
            <MyAndAccountSection>
              <Option>
                <OptionText onClick={() => navigate('/mycareer')}>내 커리어</OptionText>
              </Option>
              <Option>
                <OptionText onClick={() => navigate('/written-content')}>작성한 글</OptionText>
              </Option>
            </MyAndAccountSection>
          </Section>
          <Section>
            <SectionTitle>계정</SectionTitle>
            <MyAndAccountSection>
              <Option>
                <OptionText onClick={() => navigate('/deactivate-account0')}>계정 탈퇴</OptionText>
              </Option>
            </MyAndAccountSection>
          </Section>
        </OptionSection>
      </Content>
    </PageContainer>
  );
};

export default SettingsPage;


// 왼쪽 사이드 메뉴 스타일링
const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: SUITE;
  font-size: 1.5625rem;
  font-weight: 800;
  color: #636363;
  position: relative;
  left: 15rem;
  padding-top: 4rem;
`;

// 기존 구분선 스타일링
const Divider = styled.img.attrs({
  src: './assets/Divider1.png'
})`
  position: absolute;
  top: 2.5rem;
  width: 0.1875rem;
  height: 18.625rem;
  left: 11rem;
  right: 7rem;
`;

// 새 구분선 스타일링
const NewDivider = styled.div`
  position: sticky; // 요소를 스티키 포지셔닝합니다.
  margin-top: 56rem; // 부모 컨테이너 대비 하단에서부터의 거리를 지정합니다.
  height: 0.1875rem;
  background: url('./assets/Divider2.png') center/cover no-repeat;
  width: 11.25rem; // Divider의 너비를 지정합니다.
`;
// 로그아웃 텍스트 스타일링
const LogoutText = styled.div`
    cursor: pointer;
    margin-top: 1.44rem;
    margin-left: 4.7rem;
    font-family: SUITE;
    font-size: 1.5625rem;
    color: #636363;
`;
// 왼쪽 사이드 메뉴 아이템 스타일링
const MenuItem = styled.div`
  cursor: pointer;
  padding: 0.625rem;
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 2.62rem;
  

  &:before {
    content: '';
    background-image: url('./assets/Check.png');
    background-size: contain;
    background-repeat: no-repeat;
    width: 1.1875rem;
    height: 1.1875rem;
    display: block;
    margin-right: 1.1875rem;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &.selected:before {
    opacity: 1;
  }
`;

// 스타일 컴포넌트 정의
const PageContainer = styled.div`
  display: flex;
  padding: 2rem;
`;

const Content = styled.div`
  flex-grow: 0.6;
  position: relative;
  margin-left: calc(7rem + 0.1875rem + 7rem);
  top: 3rem;
  left: 7.8rem;
`;

const EditButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer; 
  margin-right: -3rem;
`;

const ProfileSection = styled.section`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: start;
  margin-left: 6rem;
  padding-bottom: 2rem; // 섹션 사이 간격
`;

const ProfileImage = styled.img`
  width: 7.375rem;
  height: 7.375rem;
  flex-shrink: 0;
  margin-right: 1rem;
  border-radius: 50%;
`;

const EditButton = styled.img`
  width: 50px;
  height: 50px;
  position: absolute;
  margin-left: 5.3rem;
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;


const NameAndNickname = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 2rem;
  margin-bottom: 0.2rem; /* 각 요소 간의 여백 */
`;

const NameContainer = styled.div`
  display: flex; // 추가: flex를 사용하여 Name과 VectorImage를 한 줄에 나란히 배치합니다.
  align-items: center; // 추가: 세로 중앙 정렬
  cursor: pointer;
`;

const Name = styled.h1`
  color: #636363;
  font-family: SUITE;
  font-size: 3.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 0.1rem;
`;

const VectorImage = styled.img`
  padding-top: 2.2rem;
  margin-left: 2.12rem;
  width: 1.375rem;
  height: 1.375rem;
  flex-shrink: 0;
`;

const NicknameAndCoinContainer = styled.div`
  display: flex; // 항목들을 가로로 나열
  align-items: center; // 항목들을 세로 중앙에 정렬
  margin-top: 0.5rem; // 이름과의 간격 조정
`;

const Nickname = styled.h2`
  color: #636363;
  font-family: SUITE;
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Coin = styled.h2`
  color: #636363;
  font-family: SUITE;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 5rem;
`;

const Section = styled.section`
    margin-bottom: 4.12rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5625rem;
  color: #636363;
  margin-bottom: 1rem; /* 제목과 입력란 사이의 간격 */
`;

const MyAndAccountSection = styled.div`
  background: #fff;
  border: 0.1875rem solid #A1A1A1;
  border-radius: 0.625rem;
`;

const OptionSection = styled.div `
  margin-top: 6rem;
  margin-left: 6rem;
`;

const Option = styled.div`
  padding-left: 4rem;
  display: flex;
  flex-direction: column;
  margin-top: 2.8rem;
  margin-bottom: 2.8rem;
  &::after {
    content: '';
    width: 90%;
    height: 0.1rem;
    background-color: #E2E2E2;
    margin-top: 0.2rem; /* 원하는 여백 조절 가능 */
  }
`;

const OptionText = styled.div`
  font-family: SUITE;
  font-size: 1.5625rem;
  font-weight: 600;
  color: #636363;
  cursor: pointer;
`;