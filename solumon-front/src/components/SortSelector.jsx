import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import { useState, useEffect } from 'react';

function SortSelector() {
  const [sortStandard, setSortStandard] = useState('최신순');

  useEffect(() => {
    console.log(sortStandard);
  }, [sortStandard]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <StyledSelect
          name="sort"
          onChange={(e) => setSortStandard(e.target.value)}
        >
          <StyledOption value="latest">최신순</StyledOption>
          <StyledOption value="chatCount">채팅 참여 순</StyledOption>
          <StyledOption value="voteCount">투표 참여 순</StyledOption>
          <StyledOption value="deadline">마감 임박 순</StyledOption>
        </StyledSelect>
      </Wrapper>
    </ThemeProvider>
  );
}

export default SortSelector;

const Wrapper = styled.div``;

const StyledSelect = styled.select`
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.dark_purple};
  background-color: ${({ theme }) => theme.light_purple};
`;

const StyledOption = styled.option`
  border: none;
  outline: none;
  & ::selection {
    background-color: transparent;
    color: transparent;
  }
`;
