import { useRecoilValue } from 'recoil';
import { UserInterestTopic } from '../recoil/AllAtom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';

import InterestTopic from '../components/InterestTopic';
import Button from '../components/Button';

function ChoiceInterest() {
  const userInterestTopic = useRecoilValue(UserInterestTopic);
  const navigate = useNavigate();

  // // 테스트를 위한 임시
  // const fetchUserInterestData = async () => {
  //   try {
  //     const response = await axios.get(
  //       'https://jsonplaceholder.typicode.com/user/interests',
  //     );
  //     console.log(response.body);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleClickSaveButton = async () => {
    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/user/interests',
        {
          member_id: userInterestTopic.member_id,
          interests: userInterestTopic.interests,
        },
      );
      // fetchUserInterestData();
      // navigate('/posts/post-list');
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickBackButton = () => {
    navigate('/');
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
