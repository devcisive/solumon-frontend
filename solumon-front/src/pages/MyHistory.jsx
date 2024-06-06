import { useState, useEffect } from 'react';
import { auth, db } from '../firebase-config';
import { getDocs, collection, orderBy, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';

import { FaArrowLeft } from 'react-icons/fa6';
import TabsComponent from '../components/TabsComponent';
import SortSelector from '../components/SortSelector';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';

function MyHistory() {
  const user = auth.currentUser;
  const [postData, setPostData] = useState([]);
  const [type, setType] = useState('uid');
  const [selectedTab, setSelectedTab] = useState('내가 작성한 글');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const goBackPage = () => {
    navigate(-1);
  };

  const onTabChange = async (newTab) => {
    if (newTab === '내가 작성한 글') {
      // 클릭한 탭에 따라 쿼리값 변경
      setType('uid');
    } else if (newTab === '투표에 참여한 글') {
      setType('join_posts');
    } else {
      setType('reply_posts');
    }
    // 클릭된 탭에 따라 어떤 데이터를 불러올지 결정
    setSelectedTab(newTab);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // 현재 로그인한 유저의 정보가 있는 users 컬렉션을 가져옴
  const getCurrentUser = async () => {
    try {
      //파이어베이스 스토어에서 'users'컬렉션을 쿼리설정해 , uid 필드가 result.user.uid 같은 문서 찾기
      const userQuery = query(
        collection(db, 'users'),
        where('uid', '==', user.uid),
      );
      //getDocs 를 사용하여 원하는 데이터 반환
      const userQueryData = await getDocs(userQuery);
      const userDoc = userQueryData.docs[0];

      if (userDoc !== null) {
        const userData = userDoc.data();
        return userData;
      }
    } catch (error) {
      console.log(`Something Wrong: ${error.message}`);
    }
  };

  const customData = async (orderByField, order, participants) => {
    if (user) {
      const userData = await getCurrentUser();
      const allData = await fetchOrderedData(orderByField, order);

      if (userData && allData.length > 0) {
        let myPosts;
        if (type === 'uid') {
          myPosts = allData.filter(
            (post) => post.uid === userData[participants],
          );

          return myPosts;
        } else if (type === 'join_posts' || type === 'reply_posts') {
          // join_posts = [{postId: 12}, {postId: 34}]
          const participantPostIds = userData[participants].map(
            (participant) => participant.postId,
          );
          myPosts = allData.filter((post) =>
            participantPostIds.includes(post.postId),
          );

          return myPosts;
        }
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
    const data = await customData('created_at', 'desc', type);
    setPostData(data);
  };

  useEffect(() => {
    fetchData();
  }, [type]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <PostSection>
          <TitleWrapper>
            <GoBackArrow title="뒤로가기" onClick={goBackPage} />
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
  gap: 20px;
  margin-bottom: 30px;
`;

const GoBackArrow = styled(FaArrowLeft)`
  color: ${({ theme }) => theme.medium_purple};
  font-size: 24px;
  cursor: pointer;
`;

const CategoryTitle = styled.h1`
  font-size: 26px;
  font-weight: 600;
  color: ${({ theme }) => theme.dark_purple};
`;

const SortWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
