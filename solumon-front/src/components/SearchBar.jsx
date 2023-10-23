import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { SearchKeyword } from '../recoil/AllAtom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';

import PostCard from './PostCard';
import { CiSearch } from 'react-icons/ci';

const postSearchType = [
  {
    searchType: 'CONTENT',
    title: '제목 및 본문',
  },
  {
    searchType: 'TAG',
    title: '태그',
  },
];

function SearchBar() {
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
  const USER_TOKEN = userInfo.accessToken;

  const [keyword, setKeyword] = useRecoilState(SearchKeyword);
  const [searchData, setSearchData] = useState([]);

  const fetchSearchData = async () => {
    try {
      const promises = postSearchType.map(async (type) => {
        try {
          const response = await axios.get(
            `http://solumon.site:8080/posts/search?keyWord=${keyword}&postStatus=ONGOING&postOrder=LATEST&searchType=${type.searchType}&pageNum=1`,
            {
              headers: {
                'X-AUTH-TOKEN': USER_TOKEN,
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            },
          );

          if (response.status === 200) {
            const jsonData = response.data;
            setSearchData((prevData) => ({
              ...prevData,
              [type.searchType]: jsonData.content,
            }));
          } else {
            console.log('검색 실패');
          }
        } catch (error) {
          console.log(`Something Wrong: ${error.message}`);
        }
      });

      await Promise.all(promises)
        .then(() => {
          console.log(searchData);
        })
        .catch((error) => {
          console.log(`Error loading data: ${error}`);
        });
    } catch (error) {
      console.log(`Something went wrong outside of the map: ${error}`);
    }
  };

  const SearchClick = () => {};

  useEffect(() => {
    fetchSearchData();
  }, [keyword, postSearchType]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <SearchContainer>
          <CiSearchIcon onClick={SearchClick} />
          <SearchInput
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="검색어를 입력하세요"
          ></SearchInput>
        </SearchContainer>
        {keyword &&
          postSearchType.map((item, idx) => (
            <SearchResultSection key={idx}>
              <SectionTitle>{item.title} 검색결과</SectionTitle>
              <AllPostsLink to={`/search/${item.searchType}/results`}>
                전체보기 {'>'}
              </AllPostsLink>
              <PostCard
                postData={searchData}
                postOrder={item.searchType}
                postCount={5}
              />
            </SearchResultSection>
          ))}
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
