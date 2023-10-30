import { Link } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import PropTypes from 'prop-types';

import { BsChatDots } from 'react-icons/bs';
import { VscGraph } from 'react-icons/vsc';

function PostCard({ postData, postCount, postOrder }) {
  const postInfo = postData[postOrder] || [];

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Container>
          {postData && postCount
            ? postInfo.slice(0, postCount).map((post) => (
                <CardWrapper
                  key={post.post_id}
                  to={`/postsDetail/${post.post_id}`}
                >
                  <StyledThumbnail
                    src={
                      post.image_url ||
                      'https://via.placeholder.com/240x130.jpg'
                    }
                  ></StyledThumbnail>
                  <PostPreview>
                    <Title>{post.title}</Title>
                    <Content>{post.contents}</Content>
                    <PostInfo>
                      <Date>{post.created_at.slice(0, 10)}</Date>
                      <CountWrapper>
                        <ChatCount>
                          <BsChatDots />
                          {post.chat_count}명 참여
                        </ChatCount>
                        <VoteCount>
                          <VscGraph />
                          {post.vote_count}명 참여
                        </VoteCount>
                      </CountWrapper>
                    </PostInfo>
                    <Line></Line>
                    <Writer>by. {post.nickname}</Writer>
                  </PostPreview>
                </CardWrapper>
              ))
            : postData
            ? postData.map((post) => (
                <CardWrapper
                  key={post.post_id}
                  to={`/postsDetail/${post.post_id}`}
                >
                  <StyledThumbnail
                    src={
                      post.image_url ||
                      'https://via.placeholder.com/240x130.jpg'
                    }
                  ></StyledThumbnail>
                  <PostPreview>
                    <Title>{post.title}</Title>
                    <Content>{post.contents}</Content>
                    <PostInfo>
                      <Date>{post.created_at.slice(0, 10)}</Date>
                      <CountWrapper>
                        <ChatCount>
                          <BsChatDots />
                          {post.chat_count}명 참여
                        </ChatCount>
                        <VoteCount>
                          <VscGraph />
                          {post.vote_count}명 참여
                        </VoteCount>
                      </CountWrapper>
                    </PostInfo>
                    <Line></Line>
                    <Writer>by. {post.nickname}</Writer>
                  </PostPreview>
                </CardWrapper>
              ))
            : postInfo.length === 0 && (
                <div>해당 데이터가 존재하지 않습니다.</div>
              )}
        </Container>
      </Wrapper>
    </ThemeProvider>
  );
}

PostCard.propTypes = {
  postData: PropTypes.array.isRequired,
  postCount: PropTypes.number,
  postOrder: PropTypes.string,
};

export default PostCard;

const Wrapper = styled.div`
  width: 1280px;
  /* min-height: 640px; */
`;

const Container = styled.div`
  float: left;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const CardWrapper = styled(Link)`
  width: 240px;
  min-height: 310px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.linen};
  text-decoration: none;
`;

const StyledThumbnail = styled.img`
  width: 240px;
  height: 130px;
  border-radius: 10px 10px 0 0;
`;

const PostPreview = styled.div`
  padding: 15px;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.dark_purple};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 25px;
`;

const Content = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.dark_purple};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  margin-bottom: 30px;
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: ${({ theme }) => theme.medium_purple};
  gap: 10px;
  margin-bottom: 10px;
`;

const Date = styled.span``;

const CountWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const ChatCount = styled.span`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const VoteCount = styled.span`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const Line = styled.hr`
  color: ${({ theme }) => theme.light_purple};
`;

const Writer = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.dark_purple};
  padding: 2px 0;
`;
