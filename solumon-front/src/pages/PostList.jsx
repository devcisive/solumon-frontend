import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import device from '../media';

import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { CiSearch } from 'react-icons/ci';
import PostCard from '../components/PostCard';
import useFetchOrderedData from '../hooks/useFetchOrderedData';
import useFetchInterestsData from '../hooks/useFetchInterestsData';

function PostList() {
  const user = auth.currentUser;
  const latestPostData = useFetchOrderedData('created_at', 'desc');
  const chatCountPostData = useFetchOrderedData('total_comment_count', 'desc');
  const voteCountPostData = useFetchOrderedData('total_vote_count', 'desc');
  const interestPostData = useFetchInterestsData(user);
  const navigate = useNavigate();

  const HandleButtonClick = () => {
    navigate('/post-write');
  };

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
      {/* 여기서 device를 theme 객체 내에 포함하지 않고 바로 전달 */}
      <Wrapper>
        <WriteContainer>
          <WriteButton onClick={HandleButtonClick}>
            <StyledHiOutlinePencilSquare /> 글쓰기
          </WriteButton>
        </WriteContainer>
        <StyledLink to={'/search'}>
          <SearchIcon />
        </StyledLink>

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

        {renderPostSection('최근 올라온 고민들', 'LATEST', latestPostData)}
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

const WriteContainer = styled.div`
  display: flex;
  width: 83vw;
  justify-content: flex-end;
  margin: 20px auto;
  margin-bottom: 0px;

  @media ${({ theme }) => device.mobile} {
    justify-content: center;
  }
`;

const WriteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.medium_purple};
  border: none;
  color: white;
  padding: 12px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: bold;
  width: 180px;
  cursor: pointer;
`;

const StyledHiOutlinePencilSquare = styled(HiOutlinePencilSquare)`
  font-size: 30px;
  margin-right: 10px;
`;

const StyledLink = styled(Link)`
  display: flex;
  width: 83vw;
  justify-content: flex-end;
  margin: auto;
  margin-top: 15px;

  @media ${({ theme }) => device.mobile} {
    justify-content: center;
  }
`;

const SearchIcon = styled(CiSearch)`
  width: 28px;
  height: 28px;
  color: ${({ theme }) => theme.dark_purple};
`;

const PostSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 35px auto;
  width: 83vw;
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

  @media ${({ theme }) => device.tablet} {
    align-self: flex-start;
  }
`;
