import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { SearchKeyword } from '../recoil/AllAtom';
import { db } from '../firebase-config';
import { getDocs, collection, orderBy, query } from 'firebase/firestore';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';

import PostCard from './PostCard';
import { CiSearch } from 'react-icons/ci';

function SearchBar() {
  const [keyword, setKeyword] = useRecoilState(SearchKeyword);
  const [tagSearchData, setTagSearchData] = useState([]);
  const [titleSearchData, setTitleSearchData] = useState([]);

  const fetchData = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, 'posts-write'), orderBy('created_at', 'desc')),
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

  const filterTagSearchData = async () => {
    const data = await fetchData();

    if (data) {
      const filteredData = data.filter(
        (item) =>
          item.tags &&
          Array.isArray(item.tags.hashTag) &&
          item.tags.hashTag.includes(keyword),
      );

      setTagSearchData(filteredData);
    }
  };

  const filterTitleSearchData = async () => {
    const data = await fetchData();

    if (data) {
      const filteredData = data.filter((item) => item.title.includes(keyword));
      setTitleSearchData(filteredData);
    }
  };

  const SearchClick = () => {};

  useEffect(() => {
    filterTagSearchData();
    filterTitleSearchData();
  }, [keyword]);

  const renderSearchResultSection = (title, searchType, postData) => (
    <SearchResultSection>
      <SectionTitle>{title} 검색결과</SectionTitle>
      <AllPostsLink to={`/search/${searchType}/results/${keyword}`}>
        전체보기 {'>'}
      </AllPostsLink>
      <PostCard postData={postData} postCount={5} />
    </SearchResultSection>
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <SearchContainer>
          <CiSearchIcon onClick={SearchClick} />
          <SearchInput
            autoFocus
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="검색어를 입력하세요"
          ></SearchInput>
        </SearchContainer>
        {keyword && (
          <>
            {renderSearchResultSection('태그', 'TAG', tagSearchData)}
            {renderSearchResultSection('제목', 'CONTENT', titleSearchData)}
          </>
        )}
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
  width: 900px;
`;
const CiSearchIcon = styled(CiSearch)`
  padding: 15px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
const SearchInput = styled.input`
  color: ${({ theme }) => theme.medium_purple};
  width: 200px;
  padding: 15px;
  font-size: 18px;
  border: none;
  outline: none;
  &::placeholder {
    color: #352f44;
  }
`;

const SearchResultSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 60px;
`;

const SectionTitle = styled.h1`
  font-size: 26px;
  font-weight: 600;
  color: ${({ theme }) => theme.dark_purple};
  margin-bottom: 10px;
`;

const AllPostsLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.medium_purple};
  cursor: pointer;
  margin-bottom: 15px;
  align-self: flex-end;
`;
