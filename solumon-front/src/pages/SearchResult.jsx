import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { SearchKeyword } from '../recoil/AllAtom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import PropTypes from 'prop-types';

import { CiSearch } from 'react-icons/ci';
import SortSelector from '../components/SortSelector';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';

function SearchResult() {
  const { searchType } = useParams();
  const searchKeyword = useRecoilValue(SearchKeyword);
  const [postData, setPostData] = useState([]);
  const [postDataLength, setPostDataLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  let postType = 'GENERAL';
  let postStatus = 'ONGOING';
  let postOrder = 'LATEST';

  let categoryTitle = '';

  if (searchType === 'CONTENT') {
    categoryTitle = '제목 및 본문 검색결과';
  } else {
    categoryTitle = '태그 검색결과';
  }

  const handleSortChange = (sortValue) => {
    if (sortValue === '최신순') {
      postOrder = 'LATEST';
    } else if (sortValue === '채팅 참여 순') {
      postOrder = 'MOST_CHAT_PARTICIPANTS';
    } else if (sortValue === '투표 참여 순') {
      postOrder = 'MOST_VOTES';
    } else {
      postOrder = 'IMMINENT_CLOSE';
    }
    console.log(sortValue);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const fetchData = async () => {};

  useEffect(() => {
    fetchData();
  }, [searchType, searchKeyword, postType, postStatus, postOrder, currentPage]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <PostSection>
          <TitleWrapper>
            <CategoryTitle>{categoryTitle}</CategoryTitle>
            <Link to={'/search'}>
              <SearchIcon />
            </Link>
          </TitleWrapper>
          <SortWrapper>
            <SortSelector
              sortLabels={[
                '최신순',
                '채팅 참여 순',
                '투표 참여 순',
                '마감 임박 순',
              ]}
              defaultSort={0}
              onClick={handleSortChange}
            />
          </SortWrapper>
          <PostCard postData={postData} />
        </PostSection>
        <Pagination
          totalPages={Math.ceil(postDataLength / 10)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Wrapper>
    </ThemeProvider>
  );
}

export default SearchResult;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px auto;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CategoryTitle = styled.h1`
  font-size: 26px;
  font-weight: 600;
  color: ${({ theme }) => theme.dark_purple};
  margin-bottom: 10px;
`;

const SearchIcon = styled(CiSearch)`
  width: 28px;
  height: 28px;
  color: ${({ theme }) => theme.dark_purple};
`;

const SortWrapper = styled.div`
  display: flex;
  align-self: flex-end;
  justify-content: space-between;
  margin-bottom: 20px;
`;
