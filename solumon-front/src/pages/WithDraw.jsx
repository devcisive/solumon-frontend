import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase-config';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import {
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
} from 'firebase/firestore';

function WithDraw() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo')) || 0;
  const nickName = userInfo.nickname || null;
  const navigate = useNavigate();

  const handleWithDrawConfirmButton = async () => {
    const user = auth.currentUser;
    const authInfo = EmailAuthProvider.credential(email, password);

    try {
      //회원탈퇴시 사용자가 입력한 이메일과 비밀번호로 사용자 다시확인
      await reauthenticateWithCredential(user, authInfo);

      //파이어스토어 저장했던 정보 삭제코드
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userQuery = query(
        collection(db, 'users'),
        where('uid', '==', result.user.uid),
      );
      //getDocs를 사용하여 원하는 데이터 반환
      const userQueryData = await getDocs(userQuery);
      if (!userQueryData.empty) {
        const userDocRef = userQueryData.docs[0].ref;
        //파이어스토어 문서 정보 삭제
        await deleteDoc(userDocRef);
      }
      // 파이어베이스에서 사용자 정보삭제
      await user.delete();
      setOpenModal(false);
      alert(`${nickName}님의 탈퇴가 완료되었습니다.`);
      navigate('/login');
    } catch (error) {
      console.error(`오류발생: ${error.message}`);
    }
  };

  const handleCancelButton = () => {
    setOpenModal(false);
  };

  const handleWithDrawButton = (e) => {
    e.preventDefault();
    if (!password || !email) {
      // 이메일과 비밀번호가 입력되지 않은 경우
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }
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
              type="email"
              placeholder="이메일"
              onChange={(e) => setEmail(e.target.value)}
              required
            ></StyledInput>
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
