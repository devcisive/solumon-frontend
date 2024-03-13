import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../firebase-config';
import { getDocs, collection, orderBy, query } from 'firebase/firestore';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';

import { CiSearch } from 'react-icons/ci';
import SortSelector from '../components/SortSelector';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';

function SearchResult() {
  const { searchType } = useParams();
  const { keyword } = useParams();
  const [searchData, setSearchData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  let categoryTitle = '';

  if (searchType === 'CONTENT') {
    categoryTitle = '제목 검색결과';
  } else {
    categoryTitle = '태그 검색결과';
  }

  const handleSortChange = async (sortValue) => {
    if (searchType === 'CONTENT') {
      if (sortValue === '최신순') {
        filterTitleSearchData('created_at', 'desc');
      } else if (sortValue === '채팅 참여 순') {
        filterTitleSearchData('total_comment_count', 'desc');
      } else if (sortValue === '투표 참여 순') {
        filterTitleSearchData('total_vote_count', 'desc');
      } else {
        filterTitleSearchData('created_at');
      }
    } else {
      if (sortValue === '최신순') {
        filterTagSearchData('created_at', 'desc');
      } else if (sortValue === '채팅 참여 순') {
        filterTagSearchData('total_comment_count', 'desc');
      } else if (sortValue === '투표 참여 순') {
        filterTagSearchData('total_vote_count', 'desc');
      } else {
        filterTagSearchData('created_at');
      }
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const fetchOrderedData = async (orderByField, order) => {
    const querySnapshot = await getDocs(
      query(collection(db, 'posts-write'), orderBy(orderByField, order)),
    );

    const dataList = [];
    querySnapshot.forEach((doc) => {
      dataList.push({
        postId: doc.id,
        ...doc.data(),
      });
    });

    return dataList;
  };

  const filterTagSearchData = async (orderByField, order) => {
    const data = await fetchOrderedData(orderByField, order);

    if (data.length > 0) {
      const filteredData = data.filter(
        (item) =>
          item.tags &&
          Array.isArray(item.tags.hashTag) &&
          item.tags.hashTag.includes(keyword),
      );
      setSearchData(filteredData);
    }
  };

  const filterTitleSearchData = async (orderByField, order) => {
    const data = await fetchOrderedData(orderByField, order);

    if (data.length > 0) {
      const filteredData = data.filter((item) => item.title.includes(keyword));
      setSearchData(filteredData);
    }
  };

  useEffect(() => {
    if (searchType === 'CONTENT') {
      filterTitleSearchData('created_at', 'desc');
    } else {
      filterTagSearchData('created_at', 'desc');
    }
  }, []);

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
          <PostCard
            postData={searchData}
            postCount={10}
            currentPage={currentPage}
          />
        </PostSection>
        <Pagination
          totalPages={Math.ceil(searchData.length / 10)}
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
