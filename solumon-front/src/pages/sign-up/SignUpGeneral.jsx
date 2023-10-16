import { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../style/theme';
import Button from '../../components/Button';

function SignUpGeneral() {
  const [userData, setUserData] = useState(null);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [sendEmailAuthMsg, setSendEmailAuthMsg] = useState(false);
  const [emailAuthNumber, setEmailAuthNumber] = useState(0);
  const [canUseEmail, setCanUseEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [canSignUp, setCanSignUp] = useState([
    {
      emailAuth_button_click: false,
      emailAuth_confirm_button_click: false,
    },
  ]);
  const [id, setId] = useState(3);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      );
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailAuthButton = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/user/send-emailAuth',
        {
          email: email,
        },
      );
      setSendEmailAuthMsg(true);
      setCanSignUp({
        ...canSignUp,
        emailAuth_button_click: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailAuthConfirmButton = (e) => {
    e.preventDefault();
    Number(emailAuthNumber) === 231011
      ? setCanUseEmail('사용 가능한 이메일 입니다.')
      : setCanUseEmail('인증번호가 일치하지 않습니다.');

    setCanSignUp({
      ...canSignUp,
      emailAuth_confirm_button_click: true,
    });
  };

  const handleSignUpButton = async (e) => {
    e.preventDefault();
    if (
      canSignUp.emailAuth_button_click &&
      canSignUp.emailAuth_confirm_button_click
    ) {
      try {
        const response = await axios.post(
          'https://jsonplaceholder.typicode.com/users',
          {
            member_id: id,
            nickname: nickname,
            email: email,
            password: password,
          },
        );

        fetchData();

        // ID 증가
        setId(id + 1);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('이메일 인증 후에 회원가입이 가능합니다.');
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

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
          <EmailAuthWrapper>
            <EmailAuthInput
              type="email"
              placeholder="이메일 주소"
              onChange={(e) => setEmail(e.target.value)}
              required
            ></EmailAuthInput>
            <Button
              type="submit"
              name={'인증'}
              onClick={handleEmailAuthButton}
              fontSize={'14px'}
              padding={'8px 17px'}
            />
          </EmailAuthWrapper>
          {sendEmailAuthMsg && (
            <CheckMessage>이메일로 인증번호가 전송되었습니다.</CheckMessage>
          )}
          <EmailAuthWrapper>
            <EmailAuthInput
              type="number"
              placeholder="인증번호"
              onChange={(e) => setEmailAuthNumber(e.target.value)}
              required
            ></EmailAuthInput>
            <Button
              type="submit"
              name={'확인'}
              onClick={handleEmailAuthConfirmButton}
              fontSize={'14px'}
              padding={'8px 17px'}
            />
          </EmailAuthWrapper>
          {canUseEmail && <CheckMessage>{canUseEmail}</CheckMessage>}
          <StyledInput
            type="password"
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
            required
          ></StyledInput>
          <StyledInput
            style={{ marginBottom: '10px' }}
            type="password"
            placeholder="비밀번호 확인"
            onChange={(e) => setCheckPassword(e.target.value)}
            required
          ></StyledInput>

          {userData === nickname ? (
            <CheckMessage>이미 사용중인 닉네임입니다.</CheckMessage>
          ) : (
            ''
          )}
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
            type="submit"
            value="sign-up-general"
            name={'회원가입'}
            onClick={handleSignUpButton}
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
  margin-top: 80px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 500;
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
  width: 300px;
  color: ${({ theme }) => theme.dark_purple};
  background-color: ${({ theme }) => theme.light_purple};
  padding: 10px;
  border: none;
  outline: none;
`;

const EmailAuthWrapper = styled.div`
  display: flex;
`;

const EmailAuthInput = styled.input`
  width: 250px;
  color: ${({ theme }) => theme.dark_purple};
  background-color: ${({ theme }) => theme.light_purple};
  padding: 7px 0 7px 7px;
  border: none;
  outline: none;
`;

const CheckMessage = styled.p`
  font-size: 14px;
  color: red;
  margin-bottom: 10px;
`;
