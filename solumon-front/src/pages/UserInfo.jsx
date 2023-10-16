import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { UserInterestTopic } from '../recoil/AllAtom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';

import Button from '../components/Button';

function UserInfo() {
  const [userData, setUserData] = useState({});
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [interests, setInterests] = useRecoilState(UserInterestTopic);

  let interestsTopic = interests.interests.join(', ');

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/user',
      );
      setUserData(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveButton = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        'https://jsonplaceholder.typicode.com/user',
        {
          nickname: nickname || userData.nickname,
          password: password,
          new_password1: newPassword,
          new_password2: checkPassword,
          interests: interests.interests,
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <PageTitle>회원 정보</PageTitle>
        <Line></Line>
        <SignInForm name="sign-up-general">
          <InputWrapper>
            <StyledInputLabel htmlFor="nickname">닉네임</StyledInputLabel>
            <StyledInput
              name="nickname"
              type="text"
              onChange={(e) => setNickname(e.target.value)}
              value={userData.nickname}
            ></StyledInput>
          </InputWrapper>

          <InputWrapper>
            <StyledInputLabel htmlFor="email">이메일</StyledInputLabel>
            <StyledInput
              name="email"
              type="email"
              value={userData.email}
              disabled
            ></StyledInput>
          </InputWrapper>

          <InputWrapper>
            <StyledInputLabel htmlFor="password">
              현재 비밀번호
            </StyledInputLabel>
            <StyledInput
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            ></StyledInput>
          </InputWrapper>

          <InputWrapper>
            <StyledInputLabel htmlFor="new-password">
              새 비밀번호
            </StyledInputLabel>
            <StyledInput
              name="new-password"
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
            ></StyledInput>
          </InputWrapper>

          <InputWrapper>
            <StyledInputLabel htmlFor="new-password-check">
              새 비밀번호 확인
            </StyledInputLabel>
            <StyledInput
              name="new-password-check"
              type="password"
              onChange={(e) => setCheckPassword(e.target.value)}
            ></StyledInput>
          </InputWrapper>

          <InputWrapper>
            <StyledInputLabel htmlFor="interests-topic">
              관심주제
            </StyledInputLabel>
            <StyledLink
              to={'/user/interests'}
              style={{ marginBottom: '10px' }}
              onChange={(e) => setInterests(e.target.value)}
            >
              {interests && interestsTopic}
            </StyledLink>
          </InputWrapper>

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
          {newPassword === checkPassword ? (
            ''
          ) : (
            <CheckMessage>비밀번호를 확인해주세요.</CheckMessage>
          )}

          <Button
            type="submit"
            value="save-user-info"
            name={'저장'}
            onClick={handleSaveButton}
            fontSize={'16px'}
            padding={'10px 13px'}
          />
        </SignInForm>
        <Line></Line>
      </Wrapper>
    </ThemeProvider>
  );
}

export default UserInfo;

const Wrapper = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledInputLabel = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.dark_purple};
  width: 108px;
  text-align: right;
  margin-right: 15px;
`;

const StyledInput = styled.input`
  width: 300px;
  color: ${({ theme }) => theme.dark_purple};
  background-color: ${({ theme }) => theme.light_purple};
  padding: 10px;
  border: none;
  outline: none;
`;

const StyledLink = styled(Link)`
  width: 300px;
  height: 16px;
  color: ${({ theme }) => theme.dark_purple};
  background-color: ${({ theme }) => theme.light_purple};
  padding: 10px;
  text-decoration: none;
  font-size: 14px;
  border: none;
`;

const CheckMessage = styled.p`
  font-size: 14px;
  color: red;
  margin-bottom: 10px;
`;
