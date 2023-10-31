import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BsChatSquareDots } from 'react-icons/bs';
import { PiChartBarHorizontalFill } from 'react-icons/pi';
import VoteResult from '../components/VoteResult';
import HeaderContent from '../components/HeaderContent';
import Votes from '../components/votes';
import { useRecoilState } from 'recoil';
import { GeneralUserInfo } from '../recoil/AllAtom';
import axios from 'axios';
import Chat from '../components/Chat';

const PostDetail = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState(null); // 데이터를 저장할 상태 변수
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const userInfo = useRecoilState(GeneralUserInfo);
  const accessToken = userInfo[0].accessToken;
  const memberId = userInfo[0].memberId;
  
  
  useEffect(() => {
    const fetchData = async () => {
      try{
        const headers = {
          'X-AUTH-TOKEN': accessToken,
          'withCredentials': true
        };
        const response = await axios.get(
          `http://solumon.site:8080/posts/${postId}`,
          {
            headers,
          }
          )
          
          console.log(response)
          if (response.status === 200) {
            console.log(response.data);
            console.log('전달 성공');
            setPostData(response.data)
            if (memberId===response.data.writer_member_id) {
              setIsLoggedIn(true);
            } else {
              setIsLoggedIn(false);
            }
       } else {
          console.error('전달 실패');
        }
      } catch (error) {
        console.error('오류 발생: ' + error);
        
      }
    }
    fetchData();
    },[memberId, postId, accessToken,selectedChoice])
    
    if (!postData) {
      return <div>Loading...</div>; // 데이터가 로드되지 않았을 때 
    }
  //투표 함수(투표항목선택)
  const handleChoiceClick = (choiceNum) => {
    if (isLoggedIn) {
      if (memberId === postData.writer_member_id) {
        alert('자신의 게시물에는 투표할 수 없습니다.');
      }
     }else {
      const selectedChoiceInfo = {
        selected_num: choiceNum,
      };
      setSelectedChoice(selectedChoiceInfo);
      console.log('등록 데이터:', selectedChoiceInfo);
      const headers = {
        'X-AUTH-TOKEN': accessToken,
        'withCredentials': true
      };
      //투표한 항목 서버전달코드 //
      try{
              const response = axios.post(
                `http://solumon.site:8080/posts/${postId}/vote`,
                selectedChoiceInfo,
                {
                  headers,
                  withCredentials: true
                },
                )
                
                if (response.status === 200) {
                  console.log(response.data);
                  console.log('투표 완료');
                alert('투표가 완료되었습니다.');  
               } else {
                  console.error('투표 실패');
                }
              }
              catch (error) {
                console.error('오류 발생: ' + error);
              }
            } 
          };
          
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
              <ImgBox src={image.image} alt={`이미지 ${index + 1}`} key={index} />
            ))}
          </ImageContainer>
          <ContentBox>
          {postData.contents}
          </ContentBox>
        </ContentDiv>
        {/* 투표진행중 & 투표참여했을때 또는 내가쓴글 */}
        {postData.ongoing ? (
        // 투표 진행 중인 경우
        postData.vote.join ? (
          // 투표에 참여한 경우
          <VoteResult
            choices={postData.vote.choices}
            postData={postData}
            selectedChoice={selectedChoice}
            endAt={postData.end_at}
            createdAt={postData.created_at}
          />
        ) : (
          // 투표에 참여하지 않은 경우
          <Votes
            handleChoiceClick={handleChoiceClick}
            createdAt={postData.created_at}
            endAt={postData.end_at}
            vote={postData.vote}
            choices={postData.vote.choices}
          />
        )
      ) : (
        // 투표 종료 , 내가 참여했을때의 경우
        postData.vote.join ? (
          <VoteResult
            choices={postData.vote.choices}
            postData={postData}
            endAt={postData.end_at}
            createdAt={postData.created_at}
            selectedChoice={selectedChoice}
          />
        ) : (
        // 투표 종료, 내가 참여하지 않았을때
          <VoteResult
            choices={postData.vote.choices}
            postData={postData}
            endAt={postData.end_at}
            createdAt={postData.created_at}
            selectedChoice={selectedChoice}
          />
        )
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
           {postData.chat_count}명참여
        </VoteCount>
        <ChatCount>
          <PiChartBarHorizontalFill />
          {postData.vote_count}명참여
        </ChatCount>
      </CountContainer>
      <ChatBox>
      <Chat/>
    
      </ChatBox>
    </ThemeProvider>
  );
};


export default PostDetail;
const ChatBox = styled.div`
width:60%;
height:600px;
margin:auto;
`
const ContentBox = styled.div`
margin-left:25px;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
`;
const ImgBox = styled.img`
width:550px;
height:500px;
margin-bottom:20px;
margin-left:25px;
marin:auto
`;

const ContentDiv = styled.div`
  margin: 30px;
  width: 60%;
  font-size: 20px;
  font-weight:600;
  
`;

const TagContainer = styled.div`
  display: flex;
  margin: auto;
  width: 58%;
`;
const TagBox = styled.div`
  color: ${({ theme }) => theme.medium_purple};
  font-size: 20px;
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
  width: 58%;
  margin-top: 15px;
  margin-bottom:10px;
`;
const VoteCount = styled.div`
  display: flex;
  font-size: 15px;
  margin-right: 10px;
  color: ${({ theme }) => theme.medium_purple};

`;

const ChatCount = styled.div`
  display: flex;
  color: ${({ theme }) => theme.medium_purple};
  font-size: 15px;
`;
//수정모드일때 화면 스타일 컴포넌트

const ImageContainer = styled.div`
  position: relative;
  margin-right: 5px;
`;
