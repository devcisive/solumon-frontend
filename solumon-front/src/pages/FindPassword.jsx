import { useState } from 'react';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';

import Button from '../components/Button';

function FindPassword() {
  const [email, setEmail] = useState('');
  const [sendEmail, setSendEmail] = useState(false);

  const handleFindPasswordButton = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/user/find-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // JSON 형식의 데이터를 전송한다는 헤더 설정
          },
          body: JSON.stringify({ email }), // JSON 형식으로 사용자 이메일을 전송
        },
      );

      if (response.ok) {
        // 요청이 성공적으로 완료된 경우
        const data = await response.json(); // JSON 응답을 파싱
        setSendEmail(true);
      } else {
        // 요청이 실패한 경우
        console.error('요청이 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <PageTitle>비밀번호 찾기</PageTitle>
        <Line></Line>
        <FindPasswordForm name="find-password" method="post">
          <StyledInput
            type="email"
            placeholder="이메일 주소를 입력해주세요."
            onChange={(e) => setEmail(e.target.value)}
            required
          ></StyledInput>
          <InfoText>
            이메일로 전송된 임시 비밀번호로 로그인하여
            <br /> 회원정보에서 비밀번호를 수정할 수 있습니다.
          </InfoText>
          <Button
            type="submit"
            name={'비밀번호 찾기'}
            onClick={handleFindPasswordButton}
            fontSize={'16px'}
            padding={'13px'}
          />
        </FindPasswordForm>
        <Line></Line>
        {sendEmail && (
          <InfoText>
            작성한 이메일 주소로 임시 비밀번호가 전송되었습니다.
          </InfoText>
        )}
      </Wrapper>
    </ThemeProvider>
  );
}

export default FindPassword;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 120px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.dark_purple};
  margin-bottom: 40px;
`;

const Line = styled.hr`
  height: 1px;
  width: 70%;
  background-color: ${({ theme }) => theme.light_purple};
`;

const FindPasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
`;

const StyledInput = styled.input`
  width: 300px;
  color: ${({ theme }) => theme.dark_purple};
  background-color: ${({ theme }) => theme.light_purple};
  font-size: 14px;
  padding: 10px;
  border: none;
  outline: none;
`;

const InfoText = styled.p`
  color: ${({ theme }) => theme.dark_purple};
  background-color: ${({ theme }) => theme.linen};
  font-size: 13px;
  line-height: 1.2rem;
  margin: 10px 0;
  padding: 12px 15px;
  border-radius: 10px;
`;
