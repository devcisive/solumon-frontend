import { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import Button from '../components/Button';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../firebase-config';

const Login = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [userInfo, setUserInfo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.firstLogIn !== undefined) {
      window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
      navigate('/post-list');
    }
  }, [userInfo, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('일반로그인');
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword,
      );
      //파이어베이스 스토어에서 'users'컬렉션을 쿼리설정해 , uid 필드가 result.user.uid 같은 문서 찾기
      const userQuery = query(
        collection(db, 'users'),
        where('uid', '==', result.user.uid),
      );
      //getDocs 를 사용하여 원하는 데이터 반환
      const userQueryData = await getDocs(userQuery);

      //우리가 찾는 uid 값과 같은 문서가있다면 닉네임 추출
      if (userQueryData.docs) {
        const userDoc = userQueryData.docs[0];
        const userNickName = userDoc.data().nickName;
        const isFirstLogin = result.user.createdAt === result.user.lastLoginAt;

        setUserInfo({
          accessToken: result.user.accessToken,
          firstLogIn: isFirstLogin,
          memberId: result.user.uid,
          nickname: userNickName,
          interests: [],
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    console.log('구글로그인');
    try {
      const result = await signInWithPopup(auth, provider);
      const isFirstLogin =
        result.user.metadata.createdAt === result.user.metadata.lastLoginAt;

      console.log(result);
      setUserInfo({
        accessToken: result.user.accessToken,
        firstLogIn: isFirstLogin,
        memberId: result.user.uid,
        nickname: result.user.displayName,
        interests: [],
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <GoogleLoginImg
          src="/google_login.png"
          alt="구글 로그인"
          onClick={handleGoogleLogin}
        />
        <StyledSpan>또는 이메일로 로그인</StyledSpan>
        <StyledForm>
          <StyledInput
            type="email"
            id="email"
            value={loginEmail}
            onChange={(event) => setLoginEmail(event.target.value)}
            placeholder="이메일주소를 입력해주세요"
            autoComplete="username"
            required
          ></StyledInput>
          <StyledInput
            type="password"
            value={loginPassword}
            id="passWord"
            onChange={(event) => setLoginPassword(event.target.value)}
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
const GoogleLoginImg = styled.img`
  width: 300px;
  cursor: pointer;
  height: 60px;
`;

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

const PinSearch = styled.div`
  width: auto;
  padding: 5px;
  border-bottom: 1px solid #000;
  cursor: pointer;
  margin-top: 25px;
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
