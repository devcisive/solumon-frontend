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
        <StyledSelect1
          name="sort"
          onChange={(e) => setSortStandard(e.target.value)}>
          <StyledOption>최신순</StyledOption>
          <StyledOption>채팅 참여 순</StyledOption>
          <StyledOption>투표 참여 순</StyledOption>
          <StyledOption>마감 임박 순</StyledOption>
        </StyledSelect1>
        <StyledSelect2 name="sort">
          <StyledOption value="latest">최신순</StyledOption>
          <StyledOption value="chatCount">채팅 참여 순</StyledOption>
          <StyledOption value="voteCount">투표 참여 순</StyledOption>
          <StyledOption value="deadline">마감 임박 순</StyledOption>
        </StyledSelect2>
      </Wrapper>
    </ThemeProvider>
  );
}

export default SortSelector;

const Wrapper = styled.div`
  margin: 200px 500px;
`;

const StyledSelect1 = styled.select`
  padding: 5px 10px;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.dark_purple};
  /* color: ${({ theme }) => theme.dark_purple};
  background-color: ${({ theme }) => theme.light_purple}; */
  background-color: ${({ theme }) => theme.linen};
`;

const StyledSelect2 = styled.select`
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
