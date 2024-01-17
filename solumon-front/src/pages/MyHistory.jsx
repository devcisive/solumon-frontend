import { useState, useEffect } from 'react';
import { auth, db } from '../firebase-config';
import { getDocs, collection, orderBy, query, where } from 'firebase/firestore';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';

import TabsComponent from '../components/TabsComponent';
import SortSelector from '../components/SortSelector';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';

function MyHistory() {
  const user = auth.currentUser;
  const [postData, setPostData] = useState([]);
  const [selectedTab, setSelectedTab] = useState('진행중인 고민');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSortChange = async (sortValue) => {
    if (sortValue === '최신순') {
      const data = await customData('created_at', 'desc');
      setPostData(data);
    } else if (sortValue === '채팅 참여 순') {
      const data = await customData('total_comment_count', 'desc');
      setPostData(data);
    } else if (sortValue === '투표 참여 순') {
      const data = await customData('total_vote_count', 'desc');
      setPostData(data);
    } else {
      const data = await customData('created_at');
      setPostData(data);
    }
  };

  const onTabChange = (newTab) => {};

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const customData = async (orderByField, order) => {
    if (user) {
      const uid = user.uid;
      const allData = await fetchOrderedData(orderByField, order);

      if (allData.length > 0 && uid) {
        const myPosts = allData.filter((post) => post.uid === uid);
        return myPosts;
      }
    }
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

  const fetchData = async () => {
    const data = await customData('created_at', 'desc');
    setPostData(data);
  };

  useEffect(() => {
    fetchData();
    console.log(postData);
  }, []);

  // useEffect(() => {
  //   fetchData();
  // }, [postParticipateType, postStatus, postOrder, currentPage]);

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
          totalPages={Math.ceil(postData.length / 10)}
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
