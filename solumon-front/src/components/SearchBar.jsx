import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import { CiSearch } from 'react-icons/ci';

function SearchBar() {
  const [search, setSearch] = useState('');
  const onChange = (e) => {
    setSearch(e.target.value);
  };
  const SearchClick = () => {
    alert('검색버튼 클릭');
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <SearchContainer>
          <CiSearchIcon onClick={SearchClick} />
          <SearchInput
            value={search}
            onChange={onChange}
            placeholder="검색어를 입력하세요"
          ></SearchInput>
        </SearchContainer>
      </ThemeProvider>
    </>
  );
}

export default SearchBar;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.medium_purple};
  border-radius: 8px;
  width: 500px;
  height: 45px;
`;
const CiSearchIcon = styled(CiSearch)`
  padding: 10px;
  padding-right: 5px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
const SearchInput = styled.input`
  color: ${({ theme }) => theme.medium_purple};
  width: 200px;
  height: 20px;
  padding: 10px;
  font-size: 18px;
  border: none;
  outline: none;
  &::placeholder {
    color: #352f44;
  }
`;
