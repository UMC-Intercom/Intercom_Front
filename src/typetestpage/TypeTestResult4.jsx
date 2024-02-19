import React from 'react';
import styled from 'styled-components';

export default function TypeTestResult4() {

  return (
    <Container>
      <TestWrap>
        <Text1>거친 환경에서도 독립적으로 성장하며 생존하는 능력을 가진</Text1>
        <Text2>선인장</Text2>
        <Image2 src='assets/Cactus.png' />
        <ul>
          <li>독립적으로 일하는 것을 선호하며, 안정적인 환경에서의 업무 수행을 중요시합니다. </li>
          <li>계층적인 조직 문화에서 자신의 능력을 최대로 발휘하며, 높은 보상을 받는 것을 선호합니다. </li>
          <li>연봉이 높을수록 업무에서 만나는 어려움을 더 잘 극복한다고 느낍니다.</li>
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
    width: 283px;
    height: 397px;
`;
