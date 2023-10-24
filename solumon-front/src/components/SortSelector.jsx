import { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import PropTypes from 'prop-types';
function SortSelector({ sortLabels, defaultSort, onClick }) {
  const [sortValue, setSortValue] = useState(sortLabels[defaultSort]);

  const handleChangeSortStandard = (e) => {
    const newValue = e.target.value;
    setSortValue(newValue);
    onClick(newValue); // 새로운 탭을 클릭할 때 콜백 함수 호출
  };

  useEffect(() => {
    console.log(sortValue);
  }, [sortValue]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <StyledSelect value={sortValue} onChange={handleChangeSortStandard}>
          {sortLabels.map((label, idx) => (
            <StyledOption key={idx}>{label}</StyledOption>
          ))}
        </StyledSelect>
      </Wrapper>
    </ThemeProvider>
  );
}

SortSelector.propTypes = {
  sortLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultSort: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

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
