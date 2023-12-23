import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { db } from '../firebase-config';
import { getDocs, collection, orderBy, query } from 'firebase/firestore';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';

import { CiSearch } from 'react-icons/ci';
import TabsComponent from '../components/TabsComponent';
import SortSelector from '../components/SortSelector';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';

function PostCategory() {
  const [postData, setPostData] = useState([]);
  const [selectedTab, setSelectedTab] = useState('진행중인 고민');
  const [searchParams, setSearchParams] = useSearchParams();

  let postType = searchParams.get('postType');
  let postStatus = searchParams.get('postStatus');
  let postOrder = searchParams.get('postOrder');
  let currentPage = parseInt(searchParams.get('pageNum')) || 1; // 현재 페이지 가져오기

  let categoryTitle = '';
  const categoryPrefix = postType === 'INTEREST' ? '[관심주제] ' : '';

  if (
    (postType === 'GENERAL' || postType === 'INTEREST') &&
    postStatus !== 'COMPLETED'
  ) {
    if (postOrder === 'MOST_CHAT_PARTICIPANTS') {
      categoryTitle = categoryPrefix + '채팅 참여자가 많은 고민';
    } else if (postOrder === 'MOST_VOTES') {
      categoryTitle = categoryPrefix + '투표 참여자가 많은 고민';
    } else if (postStatus === 'ONGOING') {
      if (postOrder === 'LATEST') {
        categoryTitle = categoryPrefix + '아직 결정하지 못한 고민';
      } else if (postOrder === 'IMMINENT_CLOSE') {
        categoryTitle = categoryPrefix + '결정 시간이 임박한 고민';
      }
    }
  } else if (
    (postType === 'INTEREST' || postType === 'GENERAL') &&
    postStatus === 'COMPLETED' &&
    postOrder === 'LATEST'
  ) {
    categoryTitle = categoryPrefix + '결정이 완료된 고민';
  }

  const handleSortChange = (sortValue) => {
    if (sortValue === '최신순') {
      setSearchParams({
        postType: postType,
        postStatus: postStatus,
        postOrder: 'LATEST',
        pageNum: currentPage,
      });
    } else if (sortValue === '채팅 참여 순') {
      setSearchParams({
        postType: postType,
        postStatus: postStatus,
        postOrder: 'MOST_CHAT_PARTICIPANTS',
        pageNum: currentPage,
      });
    } else if (sortValue === '투표 참여 순') {
      setSearchParams({
        postType: postType,
        postStatus: postStatus,
        postOrder: 'MOST_VOTES',
        pageNum: currentPage,
      });
    } else {
      setSearchParams({
        postType: postType,
        postStatus: postStatus,
        postOrder: 'IMMINENT_CLOSE',
        pageNum: currentPage,
      });
    }
    console.log(sortValue);
  };

  const onTabChange = (newTab) => {
    if (newTab === '진행중인 고민') {
      // 클릭한 탭에 따라 쿼리값 변경
      setSearchParams({
        postType: postType,
        postStatus: 'ONGOING',
        postOrder: postOrder,
        pageNum: currentPage,
      });
    } else {
      setSearchParams({
        postType: postType,
        postStatus: 'COMPLETED',
        postOrder: postOrder,
        pageNum: currentPage,
      });
    }
    // 클릭된 탭에 따라 어떤 데이터를 불러올지 결정
    setSelectedTab(newTab);
  };

  const handlePageChange = (newPage) => {
    setSearchParams({
      postType: postType,
      postStatus: postStatus,
      postOrder: postOrder,
      pageNum: newPage,
    });
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
    if (postOrder === 'LATEST') {
      const data = await fetchOrderedData('created_at', 'desc');
      setPostData(data);
    } else if (postOrder === 'MOST_CHAT_PARTICIPANTS') {
      const data = await fetchOrderedData('total_comment_count', 'desc');
      setPostData(data);
    } else if (postOrder === 'MOST_VOTES') {
      const data = await fetchOrderedData('total_vote_count', 'desc');
      setPostData(data);
    } else {
      const data = await fetchOrderedData('created_at');
      setPostData(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [postType, postStatus, postOrder, currentPage]);

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
          <PostCard
            postData={postData}
            postCount={10}
            currentPage={currentPage}
          />
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

export default PostCategory;

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
