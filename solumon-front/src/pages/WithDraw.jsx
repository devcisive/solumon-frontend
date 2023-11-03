import { useState } from 'react';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';

import Button from '../components/Button';

function WithDraw() {
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
  const USER_TOKEN = userInfo.accessToken;

  const [password, setPassword] = useState();
  const [openModal, setOpenModal] = useState(false);

  const handleWithDrawConfirmButton = async () => {
    try {
      const response = await axios.delete(
        'http://solumon.site:8080/user/withdraw',
        { password: password },
        {
          headers: {
            'X-AUTH-TOKEN': USER_TOKEN,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        const json = response.data;
        setOpenModal(false);
        alert(json.nickname, '님의 탈퇴가 완료되었습니다.');
        alert;
      } else {
        console.error('로딩 실패');
      }
    } catch (error) {
      console.log(`Something Wrong: ${error.message}`);
    }
  };

  const handleCancelButton = () => {
    setOpenModal(false);
  };

  const handleWithDrawButton = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  return (
    <ThemeProvider theme={theme}>
      {openModal ? (
        <ModalWrapper>
          <StyledH1>솔루몬을 탈퇴하시겠습니까?</StyledH1>
          <ButtonWrapper>
            <Button
              type="button"
              name={'탈퇴'}
              onClick={handleWithDrawConfirmButton}
              fontSize={'16px'}
              padding={'10px 22px'}
              borderRadius={'10px'}
            />
            <Button
              type="button"
              name={'취소'}
              onClick={handleCancelButton}
              fontSize={'16px'}
              padding={'10px 22px'}
              borderRadius={'10px'}
            />
          </ButtonWrapper>
        </ModalWrapper>
      ) : (
        <Wrapper>
          <PageTitle>회원 탈퇴</PageTitle>
          <Line></Line>
          <InfoText>본인 확인을 위한 비밀번호를 입력해주세요.</InfoText>
          <WithDrawForm name="user-withdraw" method="post">
            <StyledInput
              type="password"
              placeholder="비밀번호"
              onChange={(e) => setPassword(e.target.value)}
              required
            ></StyledInput>

            <Button
              type="button"
              name={'탈퇴하기'}
              onClick={handleWithDrawButton}
              fontSize={'16px'}
              padding={'13px'}
            />
          </WithDrawForm>
          <Line></Line>
        </Wrapper>
      )}
    </ThemeProvider>
  );
}

export default WithDraw;

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

const InfoText = styled.p`
  color: ${({ theme }) => theme.dark_purple};
  font-size: 16px;
  margin-top: 20px;
  /* background-color: ${({ theme }) => theme.linen};
  padding: 12px 15px;
  border-radius: 10px; */
`;

const WithDrawForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
`;

const StyledInput = styled.input`
  width: 300px;
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

const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 50%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.dark_purple};
  background-color: ${({ theme }) => theme.light_purple};
  border-radius: 15px;
`;

const StyledH1 = styled.h1`
  color: ${({ theme }) => theme.dark_purple};
  font-size: 26px;
  font-weight: 500;
  margin-top: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 60px;
`;
