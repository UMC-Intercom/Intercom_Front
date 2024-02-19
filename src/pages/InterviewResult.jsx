    import React, {useEffect, useState} from 'react';
    import styled from 'styled-components';
    import axios from "axios";
    import {useParams} from "react-router-dom";
    import config from "../path/config";

    export default function InterviewResult() {
        const [isScrapped, setIsScrapped] = useState(false);
        const [interview, setInterview] = useState(null);
        const { id } = useParams();
        const accessToken = localStorage.getItem('accessToken');
        
        useEffect(() => {
            const fetchInterview = async () => {
              try {
                // 변경된 API 경로에 맞춰서 요청
                const response = await axios.get(`http://www.umcintercom.site/interviews/${id}`, {
                  headers: {
                    'Authorization': `Bearer ${accessToken}`,
                  },
                });
                setInterview(response.data);
              } catch (error) {
                console.error('공고 상세 정보를 가져오는 데 실패했습니다:', error);
              }
            };
          
            fetchInterview();
          }, [id, accessToken]);

          useEffect(() => {
            const fetchInterview = async () => {
              try {
                // 변경된 API 경로에 맞춰서 요청
                const response = await axios.get(`http://www.umcintercom.site/interviews/${id}`, {
                  headers: {
                    'Authorization': `Bearer ${accessToken}`,
                  },
                });
                setInterview(response.data);
        
                const scrapResponse = await axios.get(`http://www.umcintercom.site/scraps/posts/${id}`, {
                  headers: {
                    'Authorization': `Bearer ${accessToken}`,
                  },
                });
                setIsScrapped(scrapResponse.data);
        
              } catch (error) {
                console.error('면접후기 상세 정보를 가져오는 데 실패했습니다:', error);
              }
            };
        
            fetchInterview();
          }, [id, accessToken]);  

          const toggleScrap = async () => {
            try {
              if (isScrapped) {
                await axios.delete(`http://www.umcintercom.site/scraps/posts/${id}`, {
                  headers: {
                    'Authorization': `Bearer ${accessToken}`,
                  },
                });
              } else {
                await axios.post(`http://www.umcintercom.site/scraps/posts/${id}`, {}, {
                  headers: {
                    'Authorization': `Bearer ${accessToken}`,
                  },
                });
              }
              setIsScrapped(!isScrapped);
            } catch (error) {
              console.error('스크랩 처리 중 오류가 발생했습니다:', error);
            }
        };

        return (
            <Container>
                <CoverLetterResultWrap>
                <MainTitleWrap>
                    <TitleText>면접 후기</TitleText>

                    <SubTitleWrap>
                        <Subtitle>
                            <Company>{interview?.company}</Company>
                            <DepartmentSemester>{interview?.department} / {interview?.year} {interview?.semester}</DepartmentSemester>
                        </Subtitle>

                        <IconWrap>
                            <ScrapButton onClick={toggleScrap}>
                                {isScrapped ? '스크랩' : '스크랩'}
                            </ScrapButton>
                            <ScrapIcon src={isScrapped ? '/assets/Vector10.png' : '/assets/Vector11.png'} alt="Scrap Icon" width={24} height={35}/>
                        </IconWrap>
                    </SubTitleWrap>

                </MainTitleWrap>
                <SpecificationWrap>
                    <SpecificationTitle>합격 스펙:</SpecificationTitle>
                    <SpecificationInformation>
                        {interview?.education}, {interview?.major}<br />
                        학점 {interview?.gpa}<br />
                        {interview?.english} {interview?.score}
                    </SpecificationInformation>
                </SpecificationWrap>

                <QuestionContainer>
                    <QuestionWrap>
                        <Question>
                        {interview?.contents}
                        </Question>
                    </QuestionWrap>
                </QuestionContainer>
                </CoverLetterResultWrap>
            </Container>
        )
    }

    const Container = styled.div`
    display: flex;
    justify-content: center;
    `;

    const CoverLetterResultWrap = styled.div`
    `

    const SubTitleWrap = styled.div`
      width: 1201px;
      display: flex;
      justify-content: space-between; /* 수정: space-between; */
    `;

    const IconWrap = styled.div`
      display: flex; /* 추가 */
      align-items: center; /* 추가 */
    `;
    const ScrapIcon = styled.img`
    margin-left: 29px;
    `;

    const Subtitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: row;
    `;

    const ScrapButton = styled.button`
    width: 100px;
    height: 54px;
    
    border: 3px solid #A1A1A1;
    border-radius: 10px;
    background-color: white;
    
    /* B2 */
    font-family: 'SUITE';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
    /* identical to box height */
    text-align: center;
    
    color: #636363;
    cursor: pointer;
    
    `;

    const TitleText = styled.div`
    font-family: 'SUITE';
    font-style: normal;
    font-weight: 800;
    font-size: 25px;
    line-height: 31px;
    
    color: #5B00EF;
    
    margin-bottom: 16px;
    `;

    const MainTitleWrap = styled.div`
        width: 1201px;
        text-align left;
        margin-top: 93px;
    `;

    const Company = styled.div`
    /* 현대자동차 */
    /* T0 */
    font-family: 'SUITE';
    font-style: normal;
    font-weight: 700;
    font-size: 50px;
    line-height: 62px;
    
    color: #000000;
    
    display: inline-block;
    margin-right: 19px;
    `;

    const DepartmentSemester = styled.div`
    /* 마케팅 / 2023 하반기 */
    
    /* T1 */
    font-family: 'SUITE';
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 42px;
    /* identical to box height, or 140% */
    
    color: #636363;
    `;

    const SpecificationWrap = styled.div`
        width: 1201px;
        text-align left;
        display: flex;
        flex-direction: row;
        margin-top: 11px;
        margin-bottom: 66px;
    `;

    const SpecificationTitle = styled.div`
    /* 합격 스펙: */
    font-family: 'SUITE';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    /* or 150% */
    
    color: #636363;
    `;

    const SpecificationInformation = styled.div`
    
    font-family: 'SUITE';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    /* or 150% */
    
    color: #636363;
    `;

    const QuestionContainer = styled.div`
    width: 1201px;
    
    background: #EFF0F4;
    border-radius: 10px;
    padding-top: 21px;
    `;

    const QuestionWrap = styled.div`
      padding: 70px 41px; 
    `;

    const Question = styled.div`
      font-family: 'SUITE';
      font-style: normal;
      font-weight: 700;
      font-size: 30px;
      color: #000000;
      margin-bottom: 11px;
    
      font-family: 'SUITE';
    font-style: normal;
    font-weight: 600;
    font-size: 25px;
    line-height: 38px;
    /* or 150% */
    
    color: #636363;
    `;