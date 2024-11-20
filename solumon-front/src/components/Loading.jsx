import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import { MoonLoader } from 'react-spinners';

function Loading() {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <StyledH1>
          로딩중 입니다. <br />
          잠시만 기다려 주세요
        </StyledH1>
        <MoonLoader color="#292435" size={40} speedMultiplier={0.6} />
      </Wrapper>
    </ThemeProvider>
  );
}

export default Loading;

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const StyledH1 = styled.h1`
  color: ${({ theme }) => theme.dark_purple};
  font-size: 28px;
  text-align: center;
`;
