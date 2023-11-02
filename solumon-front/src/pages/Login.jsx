import { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { GeneralUserInfo } from '../recoil/AllAtom';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';

import Button from '../components/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [generalUserInfo, setGeneralUserInfo] = useRecoilState(GeneralUserInfo);
  const navigate = useNavigate();

  const REST_API_KEY = '478ce5c02a05e42ebd74f42edf66e003'; //REST API KEY
  const REDIRECT_URI = 'http://localhost:5173/user/start/kakao'; //Redirect URI
  // auth 요청 URL
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleKakaoLoginButton = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://solumon.site:8080/user/sign-in/general',
        { email: email, password: password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        console.log(response.data);
        console.log('로그인 성공');

        setGeneralUserInfo({
          accessToken: response.data.access_token,
          firstLogIn: response.data.is_first_log_in,
          memberId: response.data.member_id,
          nickname: response.data.nickname,
        });
      } else {
        console.error('로그인 실패');
      }
    } catch (error) {
      console.error('오류 발생: ' + error.message);
    }
  };

  useEffect(() => {
    // generalUserInfo가 업데이트될 때 호출됨
    if (generalUserInfo.accessToken) {
      if (generalUserInfo.first_log_in) {
        window.localStorage.setItem(
          'userInfo',
          JSON.stringify(generalUserInfo),
        );
        navigate('/user/interests');
      } else {
        window.localStorage.setItem(
          'userInfo',
          JSON.stringify(generalUserInfo),
        );
        navigate('/user/interests');
      }
    }

    // generalUserInfo의 userToken 값을 기반으로 페이지 이동
    // if (generalUserInfo.userToken) {
    //   navigate('/user/interests');
    // } else {
    //   navigate('/post-list');
    // }
  }, [generalUserInfo, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StyledP>로그인</StyledP>
        <KakaoLoginImg
          src="/kakao_login.png"
          alt="카카오 로그인"
          onClick={handleKakaoLoginButton}
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
            required
          ></StyledInput>
          <StyledInput
            type="password"
            value={password}
            id="passWord"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
            autoComplete="current-password"
            required
          ></StyledInput>
          <Button
            name={'로그인'}
            type="button"
            onClick={handleLogin}
            fontSize={'16px'}
            padding={'10px'}
          />
        </StyledForm>
        <StyledLink to="/user/find-password">
          <PinSearch>비밀번호찾기</PinSearch>
        </StyledLink>
        <StyledHr></StyledHr>
        <TabContainer>
          <StyledLink to="/user/sign-up/general">
            <SignUp>이메일로 회원가입</SignUp>
          </StyledLink>
        </TabContainer>
      </Container>
    </ThemeProvider>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const KakaoLoginImg = styled.img`
  width: 350px;
  cursor: pointer;
`;

const PinSearch = styled.div`
  width: auto;
  padding: 5px;
  border-bottom: 1px solid #000;
  cursor: pointer;
  margin-top: 25px;
`;

const StyledP = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.dark_purple};
  margin-bottom: 60px;
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
  margin-top: 15px;
`;

const StyledInput = styled.input`
  padding: 10px;
  width: 330px;
  background-color: ${({ theme }) => theme.light_purple};
  border: none;
  &::placeholder {
    color: #3c3c3c;
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
  margin-top: 15px;
`;
