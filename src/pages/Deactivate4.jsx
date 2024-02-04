import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Deactivate4 = () => {
  const navigate = useNavigate();

  const handleNextDeactivate = () => {
    navigate('/deactivate-account5');
  };

  const handleDownloadPdf = () => {
    navigate('/deactivate-downloadPDF')
  };

  return (
    <DeactivateContainer>
        <Message>작성한 이력서와 자기소개서를 PDF로 내려받을 수 있어요,</Message>
        <Message>확인 하셨나요?</Message>
        <DeactivateImg src="./assets/Deactivate4.png" />
        <ButtonSection>
            <NextButton onClick={handleNextDeactivate}>괜찮아요</NextButton>
            <DownloadButton onClick={handleDownloadPdf}>내려받기</DownloadButton>
        </ButtonSection>
    </DeactivateContainer>
  );
};

export default Deactivate4;

const DeactivateContainer = styled.div`
    font-family: SUITE;
    padding: 2rem;
    max-width: 43rem;
    padding-top: 8rem;
    margin: auto;
    text-align: center;
`;

const Message = styled.p`
    color: #000;
    margin-bottom: 0.5rem;
    font-size: 1.875rem;
    font-weight: 700;
`;

const DeactivateImg = styled.img `
    width: 23.75rem;
    height: 23.75rem;
    margin-top: 3.5rem;
`;

const ButtonSection = styled.div `
    margin-top: 8rem;
    display: flex;
    justify-content: space-around; // 버튼을 공간에 맞게 분산시킵니다.
    padding: 0 1rem;
`;


const NextButton = styled.button`
    background-color: #A1A1A1;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 0.625rem;
    cursor: pointer;
    width: 18.375rem;
    height: 4.5rem;
    font-family: SUITE;
    font-size: 1.25rem;
    font-weight: 700;

    &:hover {
    background-color: #636363;
    }
`;

const DownloadButton = styled.button`
    background-color: #5B00EF;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 0.625rem;
    cursor: pointer;
    width: 18.375rem;
    height: 4.5rem;
    font-family: SUITE;
    font-size: 1.25rem;
    font-weight: 700;

    &:hover {
    background-color: #4a00d1;
    }
`;