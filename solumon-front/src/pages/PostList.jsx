import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';

import PostCard from '../components/PostCard';

const postInfoList = [
  {
    title: '아직 결정하지 못한 고민들',
    postOrder: 'LATEST',
    link: '/posts?postType=GENERAL&postStatus=ONGOING&postOrder=LATEST&pageNum=1',
  },
  {
    title: '채팅 참여자가 많은 고민들',
    postOrder: 'MOST_CHAT_PARTICIPANTS',
    link: '/posts?postType=GENERAL&postStatus=ONGOING&postOrder=MOST_CHAT_PARTICIPANTS&pageNum=1',
  },
  {
    title: '투표 참여자가 많은 고민들',
    postOrder: 'MOST_VOTES',
    link: '/posts?postType=GENERAL&postStatus=ONGOING&postOrder=MOST_VOTES&pageNum=1',
  },
];

function PostList() {
  const [postData, setPostData] = useState([]);

  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
  const USER_TOKEN = userInfo.accessToken;

  const fetchData = () => {
    const fetchDataPromises = postInfoList.map((item) =>
      axios
        .get(
          `http://solumon.site:8080/posts?postType=GENERAL&postStatus=ONGOING&postOrder=${item.postOrder}&pageNum=1`,
          {
            headers: {
              'X-AUTH-TOKEN': USER_TOKEN,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        )
        .then((response) => {
          const json = response.data;

          // 불러온 postData는 아래와 같은 형식으로 저장됨
          // {LATEST: [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]},
          // {MOST_CHAT_PARTICIPANTS: [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]},
          // {MOST_VOTES: [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]},
          setPostData((prevData) => ({
            ...prevData,
            [item.postOrder]: json.content,
          }));
        })
        .catch((error) => {
          console.log(`Something Wrong: ${error.message}`);
        }),
    );

    // 모든 fetchData 프로미스를 병렬로 실행
    Promise.all(fetchDataPromises)
      .then(() => {
        console.log('데이터 로드 완료');
        console.log(postData);
      })
      .catch((error) => {
        console.log(`Error loading data: ${error}`);
      });
  };

  useEffect(() => {
    fetchData(); // 초기 렌더링 시 한 번 호출
  }, []);

  useEffect(() => {
    // postInfoList 배열의 아이템이 변경될 때마다 fetchData 호출
    fetchData();
  }, [postInfoList]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        {postInfoList.map((item, idx) => (
          <PostSection key={idx}>
            <SectionTitle>{item.title}</SectionTitle>
            <AllPostsLink to={item.link}>전체보기 {'>'}</AllPostsLink>
            <PostCard
              // 특정 카테고리에 해당하는 데이터를 map으로 할당하기 위해 postOrder를 props로 넘김
              postData={postData}
              postOrder={item.postOrder}
              postCount={5}
            />
          </PostSection>
        ))}
      </Wrapper>
    </ThemeProvider>
  );
}

export default PostList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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
