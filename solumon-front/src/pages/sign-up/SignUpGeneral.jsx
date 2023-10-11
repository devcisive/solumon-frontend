import { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../style/theme';
import Button from '../../components/Button';

function SignUpGeneral() {
  const [userData, setUserData] = useState(null);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [id, setId] = useState(3);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const fetchData = async () => {
    const response = await axios({
      url: 'https://jsonplaceholder.typicode.com/users',
      method: 'get',
    });
    setUserData(response.body);
    console.log(userData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/users',
        {
          member_id: id,
          nickname: nickname,
          email: email,
        },
      );

      fetchData();
      // 응답 데이터를 userData 상태에 저장
      // setUserData(response.data);
      // console.log(userData);

      // ID 증가
      setId(id + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCertificationButton = () => {};

  const handleConfirmButton = () => {};

  const handleSignUpButton = () => {};

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <PageTitle>이메일 회원가입</PageTitle>
        <Line></Line>
        <SignInForm
          name="sign-in-general"
          method="post"
          onSubmit={handleSubmit}
        >
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
            value="sign-up"
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
