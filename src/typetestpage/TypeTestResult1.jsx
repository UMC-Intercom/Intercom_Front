import React from 'react';
import styled from 'styled-components';

export default function TypeTestResult1() {

  return (
    <Container>
      <TestWrap>
        <Text1>오랜 세월 동안 안정적으로 성장하며 주변에 큰 그늘을 제공하는</Text1>
        <Text2>느티나무</Text2>
        <Image2 src='assets/ZelkovaTree.png' />
        <ul>
          <li>함께 해내는 것이 좋아! 팀워크에 큰 가치를 둡니다.</li>
          <li>안정적인 환경에서의 업무 수행을 선호합니다</li>
          <li>계층적인 조직 문화에서 빛을 발하며 워라벨을 중요하게 생각합니다.</li>
          <li>좋은 동료와 함께 일하는 것을 중요시하며, 회사의 안정성을 중시합니다.</li>
        </ul>
      </TestWrap>
    </Container>
  )
}

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    ul {
/* T3 */
font-family: 'SUITE';
font-style: normal;
font-weight: 600;
font-size: 25px;
line-height: 38px;
color: #000000;
    }

    li {
      margin: 40px 0px;
    }
`;

const TestWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Text1 = styled.div`
/* T2 */
font-family: 'SUITE';
font-style: normal;
font-weight: 800;
font-size: 25px;
line-height: 31px;
text-align: center;

color: #636363;

margin-top: 122px;
margin-bottom: 24px;
`;

const Text2 = styled.div`
/* T0 */
font-family: 'SUITE';
font-style: normal;
font-weight: 700;
font-size: 50px;
line-height: 62px;
text-align: center;

color: #000000;
`;

const Image2 = styled.img`
    width: 546px;
    height: 454px;
`;

