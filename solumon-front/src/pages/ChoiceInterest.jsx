import { useRecoilValue, useRecoilState } from 'recoil';
import { GeneralUserInfo } from '../recoil/AllAtom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';

import InterestTopic from '../components/InterestTopic';
import Button from '../components/Button';

function ChoiceInterest() {
  const [generalUserInfo, setGeneralUserInfo] = useRecoilState(GeneralUserInfo);
  const navigate = useNavigate();

  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
  const USER_TOKEN = userInfo.accessToken;

  const handleClickSaveButton = async () => {
    console.log(generalUserInfo.interests);
    try {
      const response = await axios.post(
        'http://solumon.site:8080/user/interests',
        {
          interests: generalUserInfo.interests,
        },
        {
          headers: {
            'X-AUTH-TOKEN': USER_TOKEN,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        console.log(response.data);
        window.localStorage.setItem(
          'userInfo',
          JSON.stringify(generalUserInfo),
        );
        navigate('/post-list');
      } else {
        console.error('이메일 정보 전송 X');
      }

      // navigate('/posts/post-list');
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
