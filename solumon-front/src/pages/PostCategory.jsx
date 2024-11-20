import { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { auth, db } from '../firebase-config';
import { getDocs, collection, orderBy, query, where } from 'firebase/firestore';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';

import { CiSearch } from 'react-icons/ci';
import { FaArrowLeft } from 'react-icons/fa6';
import SortSelector from '../components/SortSelector';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';

function PostCategory() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [postData, setPostData] = useState([]);
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
    const newOrder =
      sortValue === '최신순'
        ? 'LATEST'
        : sortValue === '채팅 참여 순'
        ? 'MOST_CHAT_PARTICIPANTS'
        : sortValue === '투표 참여 순'
        ? 'MOST_VOTES'
        : 'IMMINENT_CLOSE';

    setSearchParams({
      postType: postType,
      postStatus: postStatus,
      postOrder: newOrder,
      pageNum: currentPage,
    });
  };

  const handlePageChange = (newPage) => {
    setSearchParams({
      postType: postType,
      postStatus: postStatus,
      postOrder: postOrder,
      pageNum: newPage,
    });
  };

  const fetchInterestsData = async (orderByField, order) => {
    if (user) {
      const userQuery = query(
        collection(db, 'users'),
        where('uid', '==', user.uid),
      );

      const querySnapshot = await getDocs(userQuery);
      const userDoc = querySnapshot.docs[0];

      if (!userDoc) return;

      const allData = await fetchOrderedData(orderByField, order);
      const userInterests = userDoc.data().interests || [];

      if (allData.length > 0 && userInterests.length > 0) {
        const interestPosts = allData.filter(
          (post) =>
            post.tags &&
            Array.isArray(post.tags.hashTag) &&
            post.tags.hashTag.some((tag) => userInterests.includes(tag)),
        );

        return interestPosts;
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
    if (postType === 'GENERAL') {
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
    } else {
      if (postOrder === 'LATEST') {
        const data = await fetchInterestsData('created_at', 'desc');
        setPostData(data);
      } else if (postOrder === 'MOST_CHAT_PARTICIPANTS') {
        const data = await fetchInterestsData('total_comment_count', 'desc');
        setPostData(data);
      } else if (postOrder === 'MOST_VOTES') {
        const data = await fetchInterestsData('total_vote_count', 'desc');
        setPostData(data);
      } else {
        const data = await fetchInterestsData('created_at');
        setPostData(data);
      }
    }
  };

  const goBackPage = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchData();
  }, [postType, postStatus, postOrder, currentPage]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <PostSection>
          <TitleWrapper>
            <GoBackArrow title="뒤로가기" onClick={goBackPage} />
            <CategoryTitle>{categoryTitle}</CategoryTitle>
            <Link to={'/search'}>
              <SearchIcon title="검색" />
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
  width: 83vw;
  margin: 40px auto;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const GoBackArrow = styled(FaArrowLeft)`
  color: ${({ theme }) => theme.medium_purple};
  font-size: 24px;
  cursor: pointer;
`;

const CategoryTitle = styled.h1`
  font-size: 28px;
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
  margin-bottom: 20px;
`;
