import { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';

import SearchBar from '../components/SearchBar';

function Search() {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <SearchBar />
      </Wrapper>
    </ThemeProvider>
  );
}

export default Search;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;
