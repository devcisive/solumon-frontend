import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase-config';
import { getDocs, collection, orderBy, query, where } from 'firebase/firestore';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';

import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { CiSearch } from 'react-icons/ci';
import PostCard from '../components/PostCard';

function PostList() {
  const user = auth.currentUser;
  const [latestPostData, setLatestPostData] = useState([]);
  const [chatCountPostData, setChatCountPostData] = useState([]);
  const [voteCountPostData, setVoteCountPostData] = useState([]);
  const [myInterest, setMyInterest] = useState([]);
  const [interestPostData, setInterestPostData] = useState([]);
  const navigate = useNavigate();

  const HandleButtonClick = () => {
    navigate('/post-write');
  };

  const fetchInterestsData = async () => {
    if (user) {
      const userQuery = query(
        collection(db, 'users'),
        where('uid', '==', user.uid),
      );

      const querySnapshot = await getDocs(userQuery);
      const userDoc = querySnapshot.docs[0];

      if (userDoc) {
        setMyInterest(userDoc.data().interests);
      }

      const allData = await fetchOrderedData('created_at', 'desc');

      if (allData.length > 0 && myInterest.length > 0) {
        const interestPosts = allData.filter(
          (post) =>
            post.tags &&
            Array.isArray(post.tags.hashTag) &&
            post.tags.hashTag.some((tag) => myInterest.includes(tag)),
        );

        setInterestPostData(interestPosts);
      }
    }
  };

  const fetchOrderedData = async (orderByField, order) => {
    const querySnapshot = await getDocs(
      query(collection(db, 'posts-write'), orderBy(orderByField, order)),
    );
    const dataList = querySnapshot.docs.map((doc) => ({
      postId: doc.id,
      ...doc.data(),
    }));
    return dataList;
  };

  useEffect(() => {
    const fetchAllData = async () => {
      await fetchInterestsData();
      const latestData = await fetchOrderedData('created_at', 'desc');
      const chatCountData = await fetchOrderedData(
        'total_comment_count',
        'desc',
      );
      const voteCountData = await fetchOrderedData('total_vote_count', 'desc');

      setLatestPostData(latestData);
      setChatCountPostData(chatCountData);
      setVoteCountPostData(voteCountData);
    };

    fetchAllData();
  }, [user]);

  useEffect(() => {
    // myInterest가 변경되면 별도의 useEffect를 사용하여 관심분야 데이터를 다시 가져옴
    if (user && myInterest.length > 0) {
      fetchInterestsData();
    }
  }, [user, myInterest]);

  const renderPostSection = (title, orderField, postData) => (
    <PostSection>
      <SectionTitle>{title}</SectionTitle>
      <AllPostsLink
        to={`/posts?postType=GENERAL&postStatus=ONGOING&postOrder=${orderField}&pageNum=1`}
      >
        전체보기 {'>'}
      </AllPostsLink>
      <PostCard postData={postData} postCount={5} />
    </PostSection>
  );

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <WriteContainer>
          <WriteButton onClick={HandleButtonClick}>
            <StyledHiOutlinePencilSquare /> 글쓰기
          </WriteButton>
        </WriteContainer>
        <Link to={'/search'}>
          <SearchIcon />
        </Link>

        <PostSection>
          <SectionTitle>관심주제와 관련된 고민들</SectionTitle>
          <AllPostsLink
            to={
              '/posts?postType=INTEREST&postStatus=ONGOING&postOrder=LATEST&pageNum=1'
            }
          >
            전체보기 {'>'}
          </AllPostsLink>
          <PostCard postData={interestPostData} postCount={5} />
        </PostSection>

        {renderPostSection(
          '아직 결정하지 못한 고민들',
          'LATEST',
          latestPostData,
        )}
        {renderPostSection(
          '채팅 참여자가 많은 고민들',
          'MOST_CHAT_PARTICIPANTS',
          chatCountPostData,
        )}
        {renderPostSection(
          '투표 참여자가 많은 고민들',
          'MOST_VOTES',
          voteCountPostData,
        )}
      </Wrapper>
    </ThemeProvider>
  );
}

export default PostList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchIcon = styled(CiSearch)`
  width: 28px;
  height: 28px;
  color: ${({ theme }) => theme.dark_purple};
  float: right;
  margin-top: 20px;
  margin-right: 115px;
`;

const PostSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px auto;
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

const WriteContainer = styled.div`
  display: flex;
  width: 1280px;
  justify-content: flex-end;
  margin: 20px auto;
  margin-bottom: 0px;
`;

const WriteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.medium_purple};
  color: white;
  padding: 12px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: bold;
  width: 200px;
`;

const StyledHiOutlinePencilSquare = styled(HiOutlinePencilSquare)`
  font-size: 30px;
  margin-right: 10px;
`;
