import React, { useState } from 'react';
import styled from 'styled-components';

export default function InterviewResult() {
    const [isScrapped, setIsScrapped] = useState(false);

    const toggleScrap = () => {
        setIsScrapped(!isScrapped);
    };

    return (
        <Container>
            <CoverLetterResultWrap>
            <MainTitleWrap>
                <TitleText>면접 후기</TitleText>

                <SubTitleWrap>
                    <Subtitle>
                        <Company>현대자동차</Company>
                        <DepartmentSemester>마케팅 / 2023 하반기</DepartmentSemester>
                    </Subtitle>

                    <IconWrap>
                        <ScrapButton onClick={toggleScrap}>
                            {isScrapped ? '스크랩' : '스크랩'}
                        </ScrapButton>
                        <ScrapIcon src={isScrapped ? './assets/scrap.png' : './assets/unscrap.png'} alt="Scrap Icon" />
                    </IconWrap>
                </SubTitleWrap>

            </MainTitleWrap>
            <SpecificationWrap>
                <SpecificationTitle>합격 스펙:</SpecificationTitle>
                <SpecificationInformation>
                    홍익대학교 경영학과<br />
                    학점 3.6<br />
                    오픽:IM2
                </SpecificationInformation>
            </SpecificationWrap>

            <QuestionContainer>
                <QuestionWrap>
                    <Question>
                    현대자동차는 전기차 시장에서 가격적 측면을 넘어, 고성능 브랜드 가치를 제공하기 위해 노력하고 있습니다. 후발주자임에도 다양한 노력으로 탑기어 2021 올해의 차에 뽑히는 훌륭한 제품군을 구축했으며 최근 미래 방향성을 제시하는 롤링랩 N 74 공개 마케팅을 전개하는 등 새로운 브랜드 이미지를 구축하기 위해 적극적으로 나아가고 있습니다. 이러한 현재자동차의 행보는 "탄탄한 브랜딩에서 성공이 나온다"라는 제 신념과 일치합니다.
 <br /><br /> {/*연동할때수정 */}
현대자동차는 전기차 시장에서 가격적 측면을 넘어, 고성능 브랜드 가치를 제공하기 위해 노력하고 있습니다. 후발주자임에도 다양한 노력으로 탑기어 2021 올해의 차에 뽑히는 훌륭한 제품군을 구축했으며 최근 미래 방향성을 제시하는 롤링랩 N 74 공개 마케팅을 전개하는 등 새로운 브랜드 이미지를 구축하기 위해 적극적으로 나아가고 있습니다. 이러한 현재자동차의 행보는 "탄탄한 브랜딩에서 성공이 나온다"라는 제 신념과 일치합니다.
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