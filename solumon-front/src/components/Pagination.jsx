import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import PropTypes from 'prop-types';

function Pagination({ totalPages, currentPage, onPageChange }) {
  const currentPageGroup = Math.ceil(currentPage / 5);
  const startPage = (currentPageGroup - 1) * 5 + 1;
  const endPage = Math.min(currentPageGroup * 5, totalPages);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  return (
    <ThemeProvider theme={theme}>
      {totalPages > 0 && (
        <PaginationWrapper>
          <PrevPage
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            {'<'}
          </PrevPage>
          {pageNumbers.map((pageNumber) => (
            <PageItem
              key={pageNumber}
              active={pageNumber === currentPage}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </PageItem>
          ))}
          <NextPage
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            {'>'}
          </NextPage>
        </PaginationWrapper>
      )}
    </ThemeProvider>
  );
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;

const PaginationWrapper = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  list-style: none;
`;

const PageItem = styled.li`
  padding: 10px 10px;
  color: ${({ theme }) => theme.dark_purple};
  background-color: ${({ active, theme }) =>
    active ? theme.light_purple : 'transparent'};
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.light_purple};
  }
`;

const PrevPage = styled.li`
  cursor: pointer;
`;

const NextPage = styled.li`
  cursor: pointer;
`;
