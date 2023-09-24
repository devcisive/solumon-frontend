import { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';

import { BsChatDots } from 'react-icons/bs';
import { VscGraph } from 'react-icons/vsc';

function PostCard() {
  // const [postData, setPostData] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Wrapper>
          <StyledThumbnail src="https://via.placeholder.com/240x130.jpg"></StyledThumbnail>
          <PostPreview>
            <Title>
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </Title>
            <Content>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
              veniam ab reprehenderit earum dignissimos. Delectus molestias nam
              incidunt necessitatibus sequi assumenda, ea perspiciatis unde,
              dolorem, iure quaerat corporis tempore praesentium?
            </Content>
            <PostInfo>
              <Date>2023-09-25</Date>
              <ChatCount>
                <BsChatDots />
                13명 참여
              </ChatCount>
              <VoteCount>
                <VscGraph />
                20명 참여
              </VoteCount>
            </PostInfo>
            <Line></Line>
            <Writer>by. chae</Writer>
          </PostPreview>
        </Wrapper>
      </Container>
    </ThemeProvider>
  );
}

export default PostCard;

const Container = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 50px;
`;

const Wrapper = styled.div`
  width: 240px;
  height: 310px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.linen};
`;

const StyledThumbnail = styled.img`
  border-radius: 10px 10px 0 0;
`;

const PostPreview = styled.div`
  padding: 15px;
`;

const Title = styled.h1`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.dark_purple};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 25px;
`;

const Content = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.dark_purple};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  margin-bottom: 25px;
`;

const PostInfo = styled.div`
  display: flex;
  font-size: 10px;
  color: ${({ theme }) => theme.medium_purple};
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
`;

const Date = styled.span``;

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
  padding: 5px 0;
`;
