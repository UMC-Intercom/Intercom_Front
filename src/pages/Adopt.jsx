import React, { useState } from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';

const AdoptButtonStyled = styled.button`
  background-color: #fff;
  color: white;
  padding: 10px 24px;
  margin: 4px 2px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  display: inline-block; // Updated from 'inline' to 'inline-block' for proper dimension application

  &:hover {
    background-color: #5B00EF; // Ensure the color value is a string and correctly prefixed with #
  }

  
  ${props => props.adopted && css`
  display: none; // 채택된 경우 버튼을 숨깁니다.
`}
`;



const Adopt = ({ commentId, accessToken, adoptionStatus, onAdoptSuccess }) => {
    const [isLoading, setIsLoading] = useState(false);
    const adopted = adoptionStatus === 'ADOPTED'; // 채택 상태 확인

    const handleAdopt = async () => {
        if (adopted || isLoading) return; // 이미 채택됐거나 로딩 중이면 실행 중단
        setIsLoading(true);

        try {
            // 채택 API 호출
            const response = await axios.post(
                `http://localhost:8080/comments/${commentId}/adopt`,
                {},
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );

            // 채택 성공 시 onAdoptSuccess 콜백 실행
            if (response.status === 200) {
                onAdoptSuccess(commentId); // 채택 성공 처리 (상위 컴포넌트에서 상태 업데이트 등을 수행할 수 있도록 commentId 전달)
            }
        } catch (error) {
            console.error('채택 처리 중 오류 발생:', error);
            alert('채택 처리 중 문제가 발생했습니다.');
        } finally {
            setIsLoading(false); // 로딩 상태 해제
        }
    };

    return (
        <AdoptButtonStyled onClick={handleAdopt} adopted={adopted} disabled={isLoading}>
            채택하기
        </AdoptButtonStyled>
    );
};

export default Adopt;
