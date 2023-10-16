import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import PropTypes from 'prop-types';

import { CiSearch } from 'react-icons/ci';
import TabsComponent from '../components/TabsComponent';
import SortSelector from '../components/SortSelector';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';

function PostCategory() {
  const [postData, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('진행중인 고민');
  const [searchParams, setSearchParams] = useSearchParams();

  const postType = searchParams.get('postType');
  let postStatus = searchParams.get('postStatus');
  const postOrder = searchParams.get('postOrder');
  const currentPage = parseInt(searchParams.get('page')) || 1; // 현재 페이지 가져오기

  const postPerPage = 10; // 한 페이지당 렌더링할 게시글 수
  const indexOfLastPost = currentPage * postPerPage; // 한 페이지의 마지막 게시글의 인덱스
  const indexOfFirstPost = indexOfLastPost - postPerPage; // 한 페이지의 첫 번째 게시글의 인덱스
  const currentPosts = postData.slice(indexOfFirstPost, indexOfLastPost); // 해당 페이지에서 보여줄 데이터 나누기

  let categoryTitle = '';
  const categoryPrefix = postType === 'interest' ? '[관심주제] ' : '';

  if (
    (postType === 'general' || postType === 'interest') &&
    postStatus !== 'completed'
  ) {
    if (postOrder === 'mostChatParticipants') {
      categoryTitle = categoryPrefix + '채팅 참여자가 많은 고민';
    } else if (postOrder === 'mostVotes') {
      categoryTitle = categoryPrefix + '투표 참여자가 많은 고민';
    } else if (postStatus === 'ongoing') {
      if (postOrder === 'latest') {
        categoryTitle = categoryPrefix + '아직 결정하지 못한 고민';
      } else if (postOrder === 'imminentDeadline') {
        categoryTitle = categoryPrefix + '결정 시간이 임박한 고민';
      }
    }
  } else if (
    (postType === 'interest' || postType === 'general') &&
    postStatus === 'completed' &&
    postOrder === 'latest'
  ) {
    categoryTitle = categoryPrefix + '결정이 완료된 고민';
  }

  const onTabChange = (newTab) => {
    if (newTab === '진행중인 고민') {
      // 클릭한 탭에 따라 쿼리값 변경
      setSearchParams({
        postType: postType,
        postStatus: 'ongoing',
        postOrder: postOrder,
        page: currentPage,
      });
    } else {
      setSearchParams({
        postType: postType,
        postStatus: 'completed',
        postOrder: postOrder,
        page: currentPage,
      });
    }
    // 클릭된 탭에 따라 어떤 데이터를 불러올지 결정
    setSelectedTab(newTab);
  };

  const onPageChange = (newPage) => {
    setSearchParams({
      postType: postType,
      postStatus: postStatus,
      postOrder: postOrder,
      page: newPage,
    });
  };

  const fetchData = () => {
    fetch(
      `https://jsonplaceholder.typicode.com/posts?postType=${postType}&postStatus=${postStatus}&postOrder=${postOrder}&page=${currentPage}`,
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setPostData(json);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(`Something Wrong: ${error}`);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [postType, postStatus, postOrder, currentPage]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        {isLoading ? (
          <div>로딩 중입니다.</div>
        ) : (
          <>
            <PostSection>
              <TitleWrapper>
                <CategoryTitle>{categoryTitle}</CategoryTitle>
                <Link to={'/posts/search'}>
                  <SearchIcon />
                </Link>
              </TitleWrapper>
              <SortWrapper>
                <TabsComponent
                  tabLabels={['진행중인 고민', '결정이 완료된 고민']}
                  defaultTab={0}
                  onClick={onTabChange}
                />
                <SortSelector />
              </SortWrapper>
              <PostCard postData={currentPosts} />
            </PostSection>
            <Pagination
              totalPages={Math.ceil(postData.length / postPerPage)}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </>
        )}
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
  margin-bottom: 10px;
`;
