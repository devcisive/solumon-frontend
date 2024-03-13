import { useState } from 'react';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../style/theme';
import Button from '../../components/Button';

function SignUpKakao() {
  const kakaoToken = window.localStorage.getItem('kakaoToken');
  const KAKAO_TOKEN = kakaoToken;

  const [userData, setUserData] = useState('name');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('test@kakao.com');

  // 사이트에 카카오 회원가입이 처음일 때 회원가입 하는 함수
  // 이 과정이 완료된 후에는 카카오 로그인을 시도하면
  // Redirect 페이지에서 자동으로 로그인 처리됨
  const handleSignUpButton = async (e) => {
    e.preventDefault();
    if (nickname.length > 0) {
      try {
        const response = await axios.post(
          'http://solumon.site:8080/user/sign-up/kakao',
          {
            kakao_access_token: KAKAO_TOKEN,
            nickname: nickname,
          },
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
        } else {
          console.error('카카오 회원가입 실패');
        }
      } catch (error) {
        console.log(`Something Wrong: ${error.message}`);
      }
    } else {
      alert('닉네임을 입력해 주세요.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <PageTitle>카카오 회원가입</PageTitle>
        <Line></Line>
        <SignInForm name="sign-in-kakao" method="post">
          <StyledInput
            type="text"
            placeholder="닉네임"
            onChange={(e) => setNickname(e.target.value)}
            required
          ></StyledInput>
          <StyledInput
            style={{ marginBottom: '10px' }}
            type="email"
            value={email}
            disabled
          ></StyledInput>
          {userData === nickname ? (
            <CheckMessage>이미 사용중인 닉네임입니다.</CheckMessage>
          ) : (
            ''
          )}
          <Button
            type="submit"
            name={'회원가입'}
            onClick={handleSignUpButton}
            fontSize={'14px'}
            padding={'13px'}
          />
        </SignInForm>
        <Line></Line>
      </Wrapper>
    </ThemeProvider>
  );
}

export default SignUpKakao;

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

const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
`;

const StyledInput = styled.input`
  width: 330px;
  color: ${({ theme }) => theme.dark_purple};
  background-color: ${({ theme }) => theme.light_purple};
  padding: 10px;
  border: none;
  outline: none;

  &::placeholder {
    color: #3c3c3c;
  }
`;

const CheckMessage = styled.p`
  font-size: 14px;
  color: red;
  margin-bottom: 10px;
`;
