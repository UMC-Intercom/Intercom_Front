import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../data/fakeData';
import styled from "styled-components";



const PostPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
  
    useEffect(() => {
      const foundPost = fakeData.find(p => p.id.toString() === postId);
      setPost(foundPost);
    }, [postId]);
  
    if (!post) {
      return <div>글을 찾을 수 없습니다.</div>;
    }
  
    return (
        <PageContainer>
            <PostContainer>
               <Title>{post.title}</Title>
                 <Content>{post.content}</Content>

                 <PostingInfoConatiner>
                    <User>{post.username}</User>
                    <WrittenTime>{post.time}</WrittenTime>
                 </PostingInfoConatiner>
            </PostContainer>
        </PageContainer>
    );
  };
  
  export default PostPage;
const PostingInfoConatiner=styled.div``;
const User=styled.div``;
const WrittenTime=styled.div``;

  const PageContainer=styled.div`
  align-items: center;
  background-color: #EFF0F4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  `;

  const PostContainer = styled.div`
  background: #FFF;
  border: 2px solid #E2E2E2;
  border-radius: 1.25rem;
  display: flex;
  align-items: left;
  flex-direction: column;
  min-height: 52.1875rem;
  width: 75rem;
  height: 70.125rem;
  align-items: left;
  margin-top: 3.69rem;
  margin-left: 6.38rem;
`;



const Title = styled.h1`
color: #000;
font-family: SUITE;
font-size: 3.125rem;
font-weight: 700;
`;

const Content = styled.p`
width: 62.5rem;
height: 9.6875rem;
font-family: SUITE;
font-size: 1.5625rem;
font-weight: 600;
line-height: 2.34375rem;
color: #636363;

`;
