import React from 'react';
import styled from 'styled-components';

export default function TypeTestResult5() {

  return (
    <Container>
      <TestWrap>
        <Text1>다양한 환경에서 빠르게 성장하며 유연성을 가진 </Text1>
        <Text2>대나무</Text2>
        <Image2 src='assets/Bamboo.png' />
        <ul>
          <li>그 누구도 따라올 수 없는 독특한 역량과 다재다능한 능력을 가지고 있습니다.</li>
          <li>성장과 도전, 안정성을 모두 중요시합니다,  </li>
          <li>워라벨을 중요하게 생각합니다.</li>
          <li>좋은 동료와 함께 일하는 것을 중요시하며, 체계적인 조직 문화에서 빛을 발합니다</li>
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

margin-top: -50px;
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
    width: 397px;
    height: 527px;
`;

