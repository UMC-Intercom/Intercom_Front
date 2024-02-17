import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { formatDistanceToNow, parseISO } from 'date-fns';
import ko from 'date-fns/locale/ko';
import TalkComment from './TalkComment';

const PostPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [isMentor, setIsMentor] = useState(false); // 현직자 인증 여부
    const [isOwner, setIsOwner] = useState(false); // 작성자 본인 여부
    const defaultProfileImg = '../assets/MyProfile.png';

    useEffect(() => {
        axios.get(`http://localhost:8080/talks/${postId}`)
            .then(response => {
                setPost(response.data);
            })
            .catch(error => {
                console.error('Error fetching post:', error);
            });
    }, [postId]);
    
    if (!post) {
        return <div>Loading post...</div>;
    }
    const handleEdit = () => {
      // '수정하기' 버튼 클릭 시 수행할 로직을 여기에 추가하세요.
      console.log("게시글 수정 페이지로 이동");
  };
  const categories = post.category ? post.category.split(',') : [];

  // 분리된 카테고리를 map 함수로 순회하며 렌더링
  const renderedCategories = categories.map((category, index) => (
      <Category key={index}>{category.trim()}</Category>
  ));
    const timeAgo = post.createdAt ? formatDistanceToNow(parseISO(post.createdAt), { addSuffix: true, locale: ko }) : '시간 정보 없음';

    return (
        <PageContainer>
            <PostContainer>
                <TitleWrapper>
                    <Title>{post.title}</Title>
                    {isMentor && <MentorLabel>멘토</MentorLabel>}
                  
                    {isOwner && <EditButton onClick={handleEdit}>수정하기
                    <EditImage src="../assets/Group73.png" alt="Profile"/>
              </EditButton>}
                </TitleWrapper>
                <Content>{post.content}</Content>
                <PostingInfoContainer>
                <ProfileImage src={post.imageUrls && post.imageUrls.length > 0 ? post.imageUrls[0] : defaultProfileImg} alt="Profile" />
                    <User>{post.writer}</User>
                    <WrittenTime>{timeAgo}</WrittenTime>
                </PostingInfoContainer>
                <Categories>
                {renderedCategories}
                </Categories>
                            </PostContainer>
            <TalkComment />
        </PageContainer>
    );
};

export default PostPage;

const Categories = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 18px;
    margin-left: 103px;
    
`;
const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
height: 62px;
margin-top: 59px;
margin-left: 102px;
`;

const EditImage = styled.img`
  width: 14.23px;
  height: 20.26px;
  margin-left: 5px; // 텍스트와 이미지 사이의 간격을 조정합니다.
`;
const MentorLabel = styled.span`
    background-color: #9FAEFF; // 멘토 라벨 배경색
    color: #FFFFFF; // 멘토 라벨 글자색
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    font-weight: bold;
    font-size: 20px;
    width: 81px;
    height: 42.23px;
    margin-left: 17px;
    margin-right: 300px;
`;

const Category = styled.span`
  display: inline-flex;
  min-width: 80px; /* 최소 너비 설정 */
  height: 40px;
  background-color: white;
  border-radius: 5px;
  padding: 0 10px; /* 좌우 패딩 추가 */
  font-size: 16px;
  font-weight: 700;
  color: #5B00EF;
  border: 2px solid #5B00EF;
  align-items: center;
  justify-content: center;
  margin-right: 16px; /* 항목 사이 간격 */
  margin-top: 10px;
`;


const EditButton = styled.button`
  background-color: transparent;
  color: #636363;
  font-size: 18px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
  font-weight: 700;
  display: flex; // flexbox를 사용하여 내부 요소들을 정렬합니다.
  align-items: center; // 버튼 내의 요소들을 세로 중앙에 배치합니다.
  justify-content: center; // 버튼 내의 요소들을 가로 중앙에 배치합니다.
`;
const PostingInfoContainer=styled.div`
display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: 97px;
`;
const User=styled.div`
margin-right: 11px;
font-size: 17px;
color: #636363;
font-weight: 600;

`;
const WrittenTime=styled.div`
font-size: 17px;
font-weight: 600;
color: #636363;

`;
const ProfileImage=styled.img`
width: 40px;
height: 40px;
border-radius: 50%;
object-fit: cover;
margin-right: 11px;
`;

  const PageContainer=styled.div`
  align-items: center;
  background-color: #EFF0F4;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  `;

  const PostContainer = styled.div`
  background: #FFF;
  border: 2px solid #E2E2E2;
  border-radius: 1.25rem 1.25rem 0 0;  display: flex;
  align-items: left;
  flex-direction: column;
  width: 75rem;
  align-items: left;
  margin-top: 3.69rem;
  margin-left: 6.38rem;
  padding-bottom: 55px;
`;



const Title = styled.h1`
color: #000;
font-family: SUITE;
font-size: 3.125rem;
font-weight: 700;

`;

const Content = styled.p`
width: 62.5rem;
font-family: SUITE;
font-size: 1.5625rem;
font-weight: 600;
line-height: 2.34375rem;
color: #636363;
margin-top: 30px;
margin-left: 101px;
padding-bottom: 2px; /* 내용 하단에 20px의 여백 추가 */
    overflow-wrap: break-word; 

`;