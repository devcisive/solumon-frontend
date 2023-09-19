import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';

function NavigationBar() {
  return (
    <ThemeProvider theme={theme}>
      <StyledDiv>
        <Title>Example</Title>
      </StyledDiv>
    </ThemeProvider>
  );
}

export default NavigationBar;

const StyledDiv = styled.div`
  margin-top: 100px;
  width: 300px;
  height: 300px;
  background-color: ${({ theme }) => theme.linen};
`;

const Title = styled.h1`
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.medium_purple};
`;
