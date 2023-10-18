import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BsChatSquareDots } from 'react-icons/bs';
import { PiChartBarHorizontalFill } from 'react-icons/pi';
import VoteResult from '../components/VoteResult';
import HeaderContent from '../components/HeaderContent';
import Votes from '../components/votes';


const PostDetail = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState(null); // 데이터를 저장할 상태 변수
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    // 사용자 인증 토큰 가져오기
    const token = localStorage.getItem('authToken'); 
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(true);
    }
 //상세페이지 정보 get으로 받아오기
    fetch(`http://solumon.site:8080/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setPostData(data.post);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  },[postId]);

  if (!postData) {
    return <div>Loading...</div>; // 데이터가 로드되지 않았을 때 
  }
  //투표 함수(투표항목선택)
  const handleChoiceClick = (choiceNum) => {
    if (isLoggedIn) {
      const selectedChoiceInfo = {
        selected_number: choiceNum,
      };
      setSelectedChoice(selectedChoiceInfo);
      console.log('등록 데이터:', selectedChoiceInfo);
      // 투표한 정보를 서버로 전송
      fetch(`http://solumon.site:8080/posts/${postId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify(selectedChoiceInfo),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('서버 응답 데이터:', data);
        })
        .catch((error) => {
          console.error('서버 요청 오류:', error);
        });
    } else {
      alert('로그인이 필요합니다.'); // 사용자에게 알림
    }
  };
  
console.log(isLoggedIn)


  return (
    <ThemeProvider theme={theme}>
      <Container>
        <HeaderContent
          postData={postData}
          isLoggedIn={isLoggedIn}
        />
        <ContentDiv>
          <ImageContainer>
            {postData.images.map((image, index) => (
              <img src={image} alt={`이미지 ${index + 1}`} key={index} />
            ))}
          </ImageContainer>
          {postData.contents}
        </ContentDiv>
        {postData.vote.result_access_status ? (
          selectedChoice ? ( // selectedChoice가 존재하면 voteresult를 렌더링
            <VoteResult
              choices={postData.vote.choices}
              postData={postData}
              $selectedChoice={selectedChoice}
            />
          ) : (
            <Votes
              vote={postData.vote}
              handleChoiceClick={handleChoiceClick}
              postData={postData}
              createdAt={postData.created_at}
            />
          )
        ) : (
          <>
            <VoteResult
              choices={postData.vote.choices}
              postData={postData}
              selectedChoice={selectedChoice}
            />
          </>
        )}
      </Container>
      <TagContainer>
        {postData.tags.map((tag, index) => (
          <TagBox key={index}>#{tag.tag}</TagBox>
        ))}
      </TagContainer>
      <CountContainer>
        <VoteCount>
          <BsChatSquareDots />
          13명참여
        </VoteCount>
        <ChatCount>
          <PiChartBarHorizontalFill />
          15명참여
        </ChatCount>
      </CountContainer>
    </ThemeProvider>
  );
};

export default PostDetail;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
`;

const ContentDiv = styled.div`
  margin: 30px;
  width: 60%;
  font-size: 15px;
`;

const TagContainer = styled.div`
  display: flex;
  margin: auto;
  width: 60%;
`;
const TagBox = styled.div`
  color: ${({ theme }) => theme.medium_purple};
  font-size: 13px;
  margin: 2px;
  margin-top: 30px;
  margin-left: 5px;
  border: 1px solid #ccc;
  padding: 5px;
  background-color: ${({ theme }) => theme.light_purple};
  color: ${({ theme }) => theme.dark_purple};
  font-weight: 500;
  border-radius: 5px;
`;
const CountContainer = styled.div`
  display: flex;
  margin: auto;
  width: 60%;
  margin-top: 15px;
`;
const VoteCount = styled.div`
  display: flex;
  font-size: 13px;
  margin-right: 10px;
  color: ${({ theme }) => theme.medium_purple};
`;

const ChatCount = styled.div`
  display: flex;
  color: ${({ theme }) => theme.medium_purple};
  font-size: 13px;
`;
//수정모드일때 화면 스타일 컴포넌트

const ImageContainer = styled.div`
  position: relative;
  margin-right: 5px;
`;
