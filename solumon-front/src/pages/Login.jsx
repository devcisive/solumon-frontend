import { ThemeProvider } from 'styled-components';
import Button from '../components/Button';
import theme from '../style/theme';
import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [passWord, setPassWord] = useState('');
  const LoginSubmit = () => {
    alert('카카오로그인완료');
  };
  // const LoginSubmit2 = () => {
  //   alert('이메일로그인완료');
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', //// JSON 형식의 데이터를 전송한다는 헤더 설정
      },
      body: JSON.stringify({ email, passWord }), // JSON 형식으로 사용자 이메일과 비밀번호를 전송
    });

    if (response.ok) {
      console.log('로그인 성공');
    } else {
      console.error('로그인 실패');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StyledP>로그인</StyledP>
        <Button
          name="카카오로 로그인하기"
          onClick={LoginSubmit}
          bgColor="#FEE500"
          color="black"
          fontSize="20px"
          fontWeight={500}
          padding="10px 105px"
        />

        <StyledSpan>또는 이메일로 로그인</StyledSpan>
        <StyledForm>
          <StyledInput
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일주소를 입력해주세요"
            autoComplete="username"
          ></StyledInput>
          <StyledInput
            type="password"
            value={passWord}
            id="passWord"
            onChange={(e) => setPassWord(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
            autoComplete="current-password"
          ></StyledInput>
          <Button
            name="로그인"
            type="button"
            onClick={handleLogin}
            bgColor={theme.medium_purple}
            color={theme.linen}
            fontSize="20px"
            fontWeight={500}
            padding="10px 105px"
          />
        </StyledForm>
        <StyledLink to="/">
          <PinSearch>비밀번호찾기</PinSearch>
        </StyledLink>
        <StyledHr></StyledHr>
        <TabContainer>
          <StyledLink to="/">
            <SignUp>이메일로 회원가입</SignUp>
          </StyledLink>
          <StyledLink to="/">
            <SignUp>카카오로 회원가입</SignUp>
          </StyledLink>
        </TabContainer>
      </Container>
    </ThemeProvider>
  );
};
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const PinSearch = styled.div`
  width: auto;
  padding: 5px;
  border-bottom: 1px solid #000;
  cursor: pointer;
  margin: 15px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledP = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: ${({ theme }) => theme.dark_purple};
  margin: 70px;
`;
const StyledSpan = styled.span`
  width: 200px;
  position: relative;
  display: inline;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
  background-color: white;
  text-align: center;
  padding: 10px;
  z-index: 10;
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 200%;
    height: 0.5px;
    background-color: ${({ theme }) => theme.medium_purple};
  }

  &::before {
    left: -450px;
  }
  &::after {
    left: 230px;
  }
`;
const StyledHr = styled.hr`
  width: 1130px;
  color: ${({ theme }) => theme.medium_purple};
`;
const StyledInput = styled.input`
  padding: 10px;
  width: 380px;
  background-color: ${({ theme }) => theme.light_purple};
  border: none;
  &::placeholder {
    color: ${({ theme }) => theme.medium_purple};
  }
  &:focus {
    outline: none;
  }

  margin-bottom: 15px;
`;
const TabContainer = styled.div`
  display: flex;
`;
const SignUp = styled.div`
  width: auto;
  padding: 5px;
  border-bottom: 1px solid #000;
  cursor: pointer;
  margin: 30px;
  margin-top: 20px;
`;

export default Login;
