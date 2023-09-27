import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../style/theme';
import Button from '../../components/Button';

function SignUpGeneral() {
  const [userData, setUserData] = useState('name');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const handleCertificationButton = () => {};

  const handleConfirmButton = () => {};

  const handleSignUpButton = () => {};

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <PageTitle>이메일 회원가입</PageTitle>
        <Line></Line>
        <SignInForm name="sign-in-general" method="post">
          <StyledInput
            type="text"
            placeholder="닉네임"
            onChange={(e) => setNickname(e.target.value)}
          ></StyledInput>
          <CertificationWrapper>
            <CertificationInput
              type="email"
              placeholder="이메일 주소"
              onChange={(e) => setEmail(e.target.value)}
            ></CertificationInput>
            <Button
              type="submit"
              name={'인증'}
              onClick={handleCertificationButton}
              fontSize={'14px'}
              padding={'8px 17px'}
            />
          </CertificationWrapper>
          <CertificationWrapper>
            <CertificationInput
              type="number"
              placeholder="인증번호"
            ></CertificationInput>
            <Button
              type="submit"
              name={'확인'}
              onClick={handleConfirmButton}
              fontSize={'14px'}
              padding={'8px 17px'}
            />
          </CertificationWrapper>
          <StyledInput
            type="password"
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
          ></StyledInput>
          <StyledInput
            style={{ marginBottom: '10px' }}
            type="password"
            placeholder="비밀번호 확인"
            onChange={(e) => setCheckPassword(e.target.value)}
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

const CertificationWrapper = styled.div`
  display: flex;
`;

const CertificationInput = styled.input`
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
