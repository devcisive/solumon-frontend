import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import { ImNotification } from 'react-icons/im';
import device from '../media';

function NoData() {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <p>해당 게시물이 존재하지 않습니다.</p>
        <ImNotification />
      </Wrapper>
    </ThemeProvider>
  );
}

export default NoData;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  color: ${({ theme }) => theme.dark_purple};
  font-size: 20px;
  margin-top: 30px;

  @media ${({ theme }) => device.tablet} {
    font-size: 16px;
  }
`;
