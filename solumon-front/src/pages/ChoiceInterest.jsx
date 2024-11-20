import { useRecoilValue, useRecoilState } from 'recoil';
import { GeneralUserInfo } from '../recoil/AllAtom';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase-config';
import {
  updateDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
} from 'firebase/firestore';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';

import InterestTopic from '../components/InterestTopic';
import Button from '../components/Button';

function ChoiceInterest() {
  const [generalUserInfo, setGeneralUserInfo] = useRecoilState(GeneralUserInfo);
  const navigate = useNavigate();

  const handleClickSaveButton = async () => {
    console.log(generalUserInfo.interests);
    try {
      const user = auth.currentUser;

      //파이어베이스 스토어에서 'users'컬렉션을 쿼리설정한 다음 uid 필드가 result.user.uid와(현재 유저의 uid와) 같은 문서 찾기
      const userQuery = query(
        collection(db, 'users'),
        where('uid', '==', user.uid),
      );

      const querySnapshot = await getDocs(userQuery);
      const userDoc = querySnapshot.docs[0];

      if (userDoc) {
        // users collection중 현재 로그인한 유저의 userDoc.id값과 일치한 문서를 찾아 업데이트함
        await updateDoc(doc(db, 'users', userDoc.id), {
          interests: generalUserInfo.interests,
        });

        navigate('/post-list');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickBackButton = () => {
    navigate('/post-list');
  };

  // 첫 로그인 시에만 이 페이지로 이동

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Title>관심 주제를 선택해주세요.(최대 5개)</Title>
        <InterestTopic />
        <ButtonWrapper>
          <Button
            onClick={handleClickSaveButton}
            name={'저장'}
            fontSize={'18px'}
            padding={'7px 18px'}
            borderRadius={'10px'}
          />
          <Button
            onClick={handleClickBackButton}
            name={'취소'}
            fontSize={'18px'}
            padding={'7px 18px'}
            borderRadius={'10px'}
          />
        </ButtonWrapper>
      </Wrapper>
    </ThemeProvider>
  );
}

export default ChoiceInterest;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.dark_purple};
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 60px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
`;
