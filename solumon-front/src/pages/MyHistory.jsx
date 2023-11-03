import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';

import TabsComponent from '../components/TabsComponent';
import SortSelector from '../components/SortSelector';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';

function MyHistory() {
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
  const USER_TOKEN = userInfo.accessToken;

  const [postData, setPostData] = useState([]);
  const [postDataLength, setPostDataLength] = useState(0);
  const [selectedTab, setSelectedTab] = useState('진행중인 고민');
  const [currentPage, setCurrentPage] = useState(1);

  let postParticipateType = 'WRITE';
  let postStatus = 'ONGOING';
  let postOrder = 'LATEST';

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
  };

  const onTabChange = (newTab) => {
    if (newTab === '내가 작성한 글') {
      // 클릭한 탭에 따라 쿼리값 변경
      postParticipateType = 'WRITE';
    } else if (newTab === '투표에 참여한 글') {
      postParticipateType = 'VOTE';
    } else {
      postParticipateType = 'CHAT';
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
        `http://solumon.site:8080/user/mylog?postParticipateType=${postParticipateType}&postStatus=${postStatus}&postOrder=${postOrder}&pageNum=${currentPage}`,
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
    console.log(postData);
  }, []);

  useEffect(() => {
    fetchData();
  }, [postParticipateType, postStatus, postOrder, currentPage]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <PostSection>
          <TitleWrapper>
            <CategoryTitle>내가 남긴 기록</CategoryTitle>
          </TitleWrapper>
          <SortWrapper>
            <TabsComponent
              tabLabels={[
                '내가 작성한 글',
                '투표에 참여한 글',
                '채팅에 참여한 글',
              ]}
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

export default MyHistory;

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

const SortWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
