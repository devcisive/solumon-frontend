import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { SearchKeyword } from '../recoil/AllAtom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import PropTypes from 'prop-types';

import { CiSearch } from 'react-icons/ci';
import TabsComponent from '../components/TabsComponent';
import SortSelector from '../components/SortSelector';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';

function SearchResult() {
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
  const USER_TOKEN = userInfo.accessToken;

  const { searchType } = useParams();
  const searchKeyword = useRecoilValue(SearchKeyword);
  const [postData, setPostData] = useState([]);
  const [postDataLength, setPostDataLength] = useState(0);
  const [selectedTab, setSelectedTab] = useState('진행중인 고민');
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

  const onTabChange = (newTab) => {
    if (newTab === '진행중인 고민') {
      // 클릭한 탭에 따라 쿼리값 변경
      postStatus = 'ONGOING';
    } else {
      postStatus = 'COMPLETED';
    }
    // 클릭된 탭에 따라 어떤 데이터를 불러올지 결정
    setSelectedTab(newTab);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://solumon.site:8080/posts/search?keyWord=${searchKeyword}&postStatus=ONGOING&postOrder=LATEST&searchType=${searchType}&pageNum=${currentPage}`,
        {
          headers: {
            'X-AUTH-TOKEN': USER_TOKEN,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        const json = response.data;
        setPostDataLength(json.totalElements);
        setPostData(json.content);
      } else {
        console.error('로딩 실패');
      }
    } catch (error) {
      console.log(`Something Wrong: ${error.message}`);
    }
  };

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
            <TabsComponent
              tabLabels={['진행중인 고민', '결정이 완료된 고민']}
              defaultTab={0}
              onClick={onTabChange}
            />
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
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
