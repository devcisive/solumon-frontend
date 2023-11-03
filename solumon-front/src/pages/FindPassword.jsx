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
      const response = await axios.get(
        'http://solumon.site:8080/user/find-password',
        { email: email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        const json = response.data;
        console.log(json);
        setSendEmail(true);
      } else {
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
            📢 이메일로 전송된 임시 비밀번호로 로그인하여
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;회원정보에서 비밀번호를 수정할 수
            있습니다.
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
  width: 330px;
  color: ${({ theme }) => theme.dark_purple};
  background-color: ${({ theme }) => theme.light_purple};
  font-size: 14px;
  padding: 10px;
  border: none;
  outline: none;

  &::placeholder {
    color: #3c3c3c;
  }
`;

const InfoText = styled.p`
  color: ${({ theme }) => theme.dark_purple};
  background-color: ${({ theme }) => theme.linen};
  font-size: 13px;
  line-height: 1.2rem;
  margin: 10px 0;
  padding: 12px 24px;
  border-radius: 10px;
`;
