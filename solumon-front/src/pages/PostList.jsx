import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';

import PostCard from '../components/PostCard';

const postInfoList = [
  {
    title: '아직 결정하지 못한 고민들',
    postOrder: 'latest',
    link: '/posts?postType=general&postStatus=ongoing&postOrder=latest&page=1',
  },
  {
    title: '채팅 참여자가 많은 고민들',
    postOrder: 'mostChatParticipants',
    link: '/posts?postType=general&postStatus=ongoing&postOrder=mostChatParticipants&page=1',
  },
  {
    title: '투표 참여자가 많은 고민들',
    postOrder: 'mostVotes',
    link: '/posts?postType=general&postStatus=ongoing&postOrder=mostVotes&page=1',
  },
];

function PostList() {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(); // 초기 렌더링 시 한 번 호출
  }, []);

  useEffect(() => {
    // postInfoList 배열의 아이템이 변경될 때마다 fetchData 호출
    fetchData();
  }, [postInfoList]);

  const fetchData = () => {
    const fetchDataPromises = postInfoList.map((item) =>
      fetch(
        `https://jsonplaceholder.typicode.com/posts?postType=general&postStatus=ongoing&postOrder=${item.postOrder}`,
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok (${response.status})`);
          }
          return response.json();
        })
        .then((json) => {
          // 해당 item에 대한 데이터를 설정
          setPostData((prevData) => ({
            ...prevData,
            [item.postOrder]: json,
          }));
        })
        .catch((error) => {
          console.log(`Something Wrong: ${error}`);
        }),
    );

    // 모든 fetchData 프로미스를 병렬로 실행
    Promise.all(fetchDataPromises)
      .then(() => {
        console.log('데이터 로드 완료');
        setLoading(false); // 데이터 로드 완료 후 loading 상태를 false로 변경
      })
      .catch((error) => {
        console.log(`Error loading data: ${error}`);
        setLoading(false); // 에러 발생 시에도 loading 상태를 false로 변경
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        {postInfoList.map((item, idx) => (
          <PostSection key={idx}>
            <SectionTitle>{item.title}</SectionTitle>
            <AllPostsLink to={item.link}>전체보기 {'>'}</AllPostsLink>
            {loading ? ( // 데이터 로딩 중인 경우
              <p>Loading...</p>
            ) : (
              <PostCard postData={postData[item.postOrder]} postCount={5} />
            )}
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
