import React from 'react';
import styled from 'styled-components';

export default function TypeTestResult3() {

  return (
    <Container>
      <TestWrap>
        <Text1>다른 식물과 공생하며 함께 성장하는 것을 선호하는</Text1>
        <Text2>버드나무</Text2>
        <Image2 src='assets/BudTree.png' />
        <ul>
          <li>팀워크를 중요시하며, 새로운 도전과 변화를 즐깁니다. </li>
          <li>자유로운 조직 문화에서 빛을 발하며, 워라벨을 중요하게 생각합니다</li>
          <li>좋은 동료와 함께 일하는 것을 중요시합니다</li>
          <li>성장과 도전의 기회를 추구합니다.</li>
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

margin-bottom:61px;
`;

const Image2 = styled.img`
    width: 548px;
    height: 367px;
`;

