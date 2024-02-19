import React from 'react';
import styled from 'styled-components';

export default function TypeTestResult2() {

  return (
    <Container>
      <TestWrap>
        <Text1>어려운 환경에서도 빠르게 성장하며 변화와 도전을 두려워하지 않는</Text1>
        <Text2>자작나무</Text2>
        <Image2 src='assets/BirchTree.png' />
        <ul>
          <li>독립적으로 일하는 것을 선호하며, 새로운 도전과 변화를 추구합니다. </li>
          <li>자유로운 조직 문화에서 자신의 능력을 최대로 발휘합니다.</li>
          <li>일이 많더라도 보상이 많으면 괜찮디고 생각합니다.</li>
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

margin-bottom: 24px;
`;

const Image2 = styled.img`
    width: 348px;
    height: 486px;
`;
