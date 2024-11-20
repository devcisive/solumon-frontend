import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase-config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../style/theme';
import Button from '../../components/Button';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase-config';

function SignUpGeneral() {
  const [userData, setUserData] = useState(null);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const navigate = useNavigate();

  // 파이어베이스를 사용한 회원가입
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (result) {
        await updateProfile(result.user, { displayName: nickname });
        //사용자 uid와 닉네임 'users'라는 컬렉션에 파이어스토어에 저장
        await addDoc(collection(db, 'users'), {
          uid: result.user.uid,
          nickName: nickname,
        });
        alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <PageTitle>이메일 회원가입</PageTitle>
        <Line></Line>
        <SignInForm name="sign-up-general">
          <StyledInput
            type="text"
            placeholder="닉네임"
            onChange={(e) => setNickname(e.target.value)}
            required
          ></StyledInput>

          <EmailAuthInput
            type="email"
            placeholder="이메일 주소"
            onChange={(e) => setEmail(e.target.value)}
            required
          ></EmailAuthInput>

          <StyledInput
            type="password"
            minlength="8"
            placeholder="비밀번호 (8~20자)"
            onChange={(e) => setPassword(e.target.value)}
            required
          ></StyledInput>
          <InfoText>
            📢 비밀번호 입력 시 영문 대문자 또는 소문자, 숫자,
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp; 특수문자 3가지를 모두 사용해야 합니다.
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(특수문자는 @ # $ % ^ & + = ! 만 사용
            가능)
          </InfoText>
          <StyledInput
            style={{ marginBottom: '10px' }}
            type="password"
            minlength="8"
            placeholder="비밀번호 확인"
            onChange={(e) => setCheckPassword(e.target.value)}
            required
          ></StyledInput>

          {/* {userData === nickname ? (
            <CheckMessage>이미 사용중인 닉네임입니다.</CheckMessage>
          ) : (
            ''
          )} */}
          {email.includes('@')
            ? ''
            : email.length >= 1 && (
                <CheckMessage>잘못된 이메일 주소입니다.</CheckMessage>
              )}
          {password === checkPassword ? (
            ''
          ) : (
            <CheckMessage>비밀번호를 확인해주세요.</CheckMessage>
          )}

          <Button
            type="button"
            value="sign-up-general"
            name={'회원가입'}
            onClick={handleSignUp}
            fontSize={'16px'}
            padding={'10px 13px'}
          />
        </SignInForm>
        <Line></Line>
        {userData &&
          userData.map((user) => (
            <div key={user.member_id}>
              <div>{user.nickname}</div>
            </div>
          ))}
      </Wrapper>
    </ThemeProvider>
  );
}

export default SignUpGeneral;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.dark_purple};
  margin-bottom: 30px;
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

const EmailAuthInput = styled.input`
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

const InfoText = styled.p`
  color: ${({ theme }) => theme.dark_purple};
  background-color: ${({ theme }) => theme.linen};
  font-size: 13px;
  line-height: 1.2rem;
  margin: 10px 0;
  padding: 12px 15px;
  border-radius: 10px;
`;

const CheckMessage = styled.p`
  font-size: 14px;
  color: red;
  margin-bottom: 10px;
`;