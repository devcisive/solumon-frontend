import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionsContainer, Section } from 'react-fullpage';
import styled, { ThemeProvider, keyframes } from 'styled-components';
import theme from '../style/theme';

import { BiSolidChevronDownCircle } from 'react-icons/bi';

const Start = () => {
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo')) || [];
  const USER_TOKEN = userInfo.accessToken;

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  useEffect(() => {
    USER_TOKEN && navigate('/post-list');
  }, []);

  let options = {
    anchors: [
      'sectionOne',
      'sectionTwo',
      'sectionThree',
      'sectionFour',
      'sectionFive',
    ],
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <SectionsContainer {...options}>
          <Section>
            <Column1>
              <StyledH1>
                혼자 결정하기 어려운 고민들을 함께 나누어보세요!
                <StyledBiSolidChevronDownCircle />
              </StyledH1>
            </Column1>
          </Section>
          <Section>
            <Column2>
              <CardContainer>
                <CardTitle>친구 생일선물좀 골라줄래?</CardTitle>
                <StyledHeader>
                  <CardId>작성자:치즈</CardId>
                  <CardTime>2023-10-10</CardTime>
                </StyledHeader>
                <StyledHr></StyledHr>
                <CardContent>
                  <ContentP>1.백화점상품권</ContentP>
                  <ContentP>2.레스토랑식사권</ContentP>
                </CardContent>
                <CardChat>
                  <ChatBox1>난 1번!</ChatBox1>
                  <ChatBox2>
                    난 2번. 레스토랑은 자주 가지 않으니깐 이럴때 가면 좋을
                    것같아
                  </ChatBox2>
                  <StyledBox>
                    <ChatBox3>다들 의견 고마워!</ChatBox3>
                  </StyledBox>
                </CardChat>
              </CardContainer>
              <StyledH2>
                결정이 어려운 고민에 대해 글을 작성하고 다른사람들과 대화해
                보세요.
              </StyledH2>
            </Column2>
          </Section>
          <Section>
            <Column3>
              <ColumnImg src="/image/사진1.png"></ColumnImg>
              <StyledH3>누군가의 결정에 도움을 줄 수 있습니다.</StyledH3>
            </Column3>
          </Section>
          <Section>
            <Column4>
              <ColumnImg src="/image/사진2.png"></ColumnImg>
              <StyledH3>
                결정하기 어려운 문제가 있을때 비슷한 고민을 찾아보고 의견을
                참고해도 좋겠죠?
              </StyledH3>
            </Column4>
          </Section>
          <Section>
            <Column5>
              <StyledH5>
                솔루몬에 가입해서 더 많은 고민들을 공유해 보세요.
                <LoginButton onClick={handleLogin}>
                  로그인 / 회원가입
                </LoginButton>
              </StyledH5>
            </Column5>
          </Section>
        </SectionsContainer>
      </ThemeProvider>
    </>
  );
};

export default Start;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0); 
  }
`;
const fadeOut = keyframes`
  from {
    opacity: 0;
    transform: translateX(0px);
  }
  to {
    opacity: 1;
    transform: translateX(-100px); 
  }
`;
const Column1 = styled.div`
  color: ${({ theme }) => theme.dark_purple};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;
const StyledBiSolidChevronDownCircle = styled(BiSolidChevronDownCircle)`
  font-size: 60px;
  margin-top: 300px;
`;
const Column2 = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const StyledHr = styled.hr`
  width: 400px;
  color: ${({ theme }) => theme.medium_purple};
`;

const CardContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.linen};
  background-color: ${({ theme }) => theme.linen};
  width: 400px;
  height: 400px;
  border-radius: 10px;
  z-index: -1;
  margin-right: 100px;
`;
const CardTitle = styled.div`
  color: ${({ theme }) => theme.dark_purple};
  font-weight: bold;
  font-size: 20px;
  margin: 10px;
`;
const StyledHeader = styled.div`
  display: flex;
  margin: 10px;
  justify-content: space-between;
`;
const CardId = styled.span`
  color: ${({ theme }) => theme.medium_purple};
`;
const CardTime = styled.span`
  color: ${({ theme }) => theme.medium_purple};
`;
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  font-color: ${({ theme }) => theme.dark_purple};
`;
const ContentP = styled.p`
  font-size: 15px;
  margin-bottom: 15px;
`;
const CardChat = styled.div`
  display: block;
`;
const ChatBox1 = styled.div`
  animation: ${fadeIn} 2s ease-out;
  border: 1px solid ${({ theme }) => theme.light_purple};
  background-color: ${({ theme }) => theme.light_purple};
  border-radius: 5px;
  padding: 10px;
  margin: 15px;
  width: 60px;
`;
const ChatBox2 = styled.div`
  border: 1px solid ${({ theme }) => theme.light_purple};
  background-color: ${({ theme }) => theme.light_purple};
  border-radius: 5px;
  animation: ${fadeIn} 2s ease-out;
  padding: 10px;
  margin: 15px;
  width: auto;
`;
const StyledBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const ChatBox3 = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.light_purple};
  background-color: ${({ theme }) => theme.light_purple};
  border-radius: 5px;
  justify-content: flex-end;
  padding: 10px;
  margin: 15px;
  margin-top: 0;
  width: 130px;
  animation: ${fadeOut} 2s ease-out;
`;
const Column3 = styled.div`
  color: ${({ theme }) => theme.medium_purple};
  font-size: 20px;
  display: flex;
  height: 100%;
  align-items: center;
  margin: auto;
  justify-content: center;
`;
const Column4 = styled.div`
  font-size: 20px;
  display: flex;
  height: 100%;
  align-items: center;
  margin: auto;
  justify-content: center;
`;

const Column5 = styled.div`
  color: ${({ theme }) => theme.medium_purple};
  display: flex;
`;
const StyledH1 = styled.h1`
  color: ${({ theme }) => theme.dark_purple};
  font-weight: bold;
  font-size: 28px;
  margin: auto;
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
`;
const StyledH2 = styled.h1`
  color: ${({ theme }) => theme.dark_purple};
  font-weight: bold;
  font-size: 28px;
  line-height: 50px;
  align-items: center;
  display: flex;

  flex-direction: column;
  width: 480px;
  justify-content: center;
  min-height: 100vh;
`;
const StyledH3 = styled.h1`
  color: ${({ theme }) => theme.dark_purple};
  font-weight: bold;
  font-size: 28px;
  margin-left: 20px;
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  width: 500px;
  line-height: 50px;
`;
const StyledH5 = styled.h1`
  color: ${({ theme }) => theme.dark_purple};
  font-weight: bold;
  font-size: 28px;
  margin: auto;
  align-items: center;
  display: flex;
  margin-bottom: 100px;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
`;
const LoginButton = styled.button`
  color: ${({ theme }) => theme.linen};
  width: 300px;
  padding: 20px;
  font-size: 15px;
  border-radius: 10px;
  margin-top: 100px;
  background-color: ${({ theme }) => theme.medium_purple};
`;

// 컬럼 3번 //
const ColumnImg = styled.img`
  width: 500px;
`;
