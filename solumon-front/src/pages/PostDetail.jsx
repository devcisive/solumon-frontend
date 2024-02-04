import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BsChatSquareDots } from 'react-icons/bs';
import { PiChartBarHorizontalFill } from 'react-icons/pi';
import VoteResult from '../components/VoteResult';
import HeaderContent from '../components/HeaderContent';
import Votes from '../components/votes';
import CommentForm from '../components/CommentForm';
import { db, auth } from '../firebase-config';
import {
  getDoc,
  doc,
  updateDoc,
  collection,
  where,
  query,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import CommentList from '../components/CommentList';

const PostDetail = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState(null); // 데이터를 저장할 상태 변수
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const userInfo = window.localStorage.getItem('userInfo');
  const userInfoParse = userInfo ? JSON.parse(userInfo) : null;
  const memberId = userInfoParse.memberId;
  const [postStatus, setPostStatus] = useState('ONGOING');
  const user = auth.currentUser;
  const [join, setJoin] = useState(false);

  const fetchData = async () => {
    try {
      const postDocRef = doc(db, 'posts-write', postId);
      onSnapshot(postDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setPostData(data);
          const voteEnd = new Date(data.vote.end_at).getTime();
          const timeNow = new Date().getTime();
          const newPostStatus = voteEnd > timeNow ? 'ONGOING' : 'COMPLETED';
          setPostStatus(newPostStatus);
        } else {
          console.error('문서가 존재하지 않습니다.');
        }
      });
    } catch (error) {
      console.error('오류 발생: ' + error);
    }
  };

  // 투표를 했는지 유무 판단하여 votes,voteResult 둘중의 컴포넌트 렌더링하기위해 join 값 저장
  const checkVoteJoin = async () => {
    try {
      if (user) {
        // user 객체가 null이 아닌 경우에만 진행
        const userQuery = query(
          collection(db, 'users'),
          where('uid', '==', user.uid),
        );
        const userQueryData = await getDocs(userQuery);
        const userDoc = userQueryData.docs[0].data();
        const voteJoinPosts = userDoc.join_posts;
        console.log(voteJoinPosts);

        await Promise.all(
          voteJoinPosts.map(async (item) => {
            if (item.postId === postId) {
              setJoin(true);
              console.log(`투표했을때 조인값`, join);
            }
          }),
        );
      } else {
        console.log(`유저값이 없어요`);
      }
    } catch (error) {
      console.log(`Something Wrong: ${error.message}`);
    }
  };

  const listenVoteResult = () => {
    const voteResultRef = collection(db, 'posts-write', postId, 'voteResult');
    onSnapshot(voteResultRef, (snapshot) => {
      if (!snapshot.empty) {
        const voteResults = snapshot.docs.map((doc) => doc.data());
        console.log('투표 결과가 업데이트되었습니다.', voteResults);
        setPostData((prevData) => ({
          ...prevData,
          voteResult: voteResults,
        }));
      }
    });
  };

  //투표시 해당 투표항목 choice_count와 총 투표 수 업데이트 함수
  const handleVoteUpdate = async (postDocRef, choiceIndex) => {
    try {
      // 현재 투표 항목 정보 가져오기
      const postDocSnapshot = await getDoc(postDocRef);
      if (postDocSnapshot.exists()) {
        const postData = postDocSnapshot.data();
        // 새로운 count 계산
        const currentChoice = postData?.voteResult?.[choiceIndex];
        const newCount = currentChoice ? currentChoice.choice_count + 1 : 1;
        console.log(newCount);
        // 투표 항목 업데이트
        await updateDoc(postDocRef, {
          [`voteResult.${choiceIndex}.choice_count`]: newCount,
          total_vote_count: (postData.total_vote_count || 0) + 1,
        });

        alert('투표가 완료되었습니다.');
        listenVoteResult(postDocRef);
      }
    } catch (error) {
      console.error('오류 발생: ' + error);
    }
  };

  useEffect(() => {
    if (postData) {
      setIsLoggedIn(memberId && memberId === postData.uid);
      listenVoteResult();
    }
  }, [postData, postId]);

  useEffect(() => {
    fetchData();
    checkVoteJoin();
  }, []);

  if (!postData) {
    return <div>Loading...</div>; // 데이터가 로드되지 않았을 때
  }
  // 투표시 해당유저 users 컬렉션에 해당 게시물 postId 저장하여 중복투표 방지 및 투표 유무 확인할 수 있는함수
  const updateVoteJoin = async (choiceNum) => {
    try {
      //파이어베이스 스토어에서 'users'컬렉션을 쿼리설정한 다음 uid 필드가 result.user.uid와(현재 유저의 uid와) 같은 문서 찾기
      const userQuery = query(
        collection(db, 'users'),
        where('uid', '==', user.uid),
      );

      const querySnapshot = await getDocs(userQuery);
      const userDoc = querySnapshot.docs[0];
      if (userDoc) {
        //중복확인
        const voteJoinPosts = userDoc.data().join_posts || [];
        const isDuplicateVote = voteJoinPosts.some(
          (item) => item.postId?.null === postId,
        );
        //중복 투표가 아닌 경우에만 join-posts 값 업데이트
        if (!isDuplicateVote) {
          const updatedJoinPosts = [...voteJoinPosts, { postId, choiceNum }];
          await updateDoc(doc(db, 'users', userDoc.id), {
            join_posts: updatedJoinPosts,
          });
          checkVoteJoin();
          return true;
        } else {
          // 중복 투표일 경우 알림
          alert('이미 투표한 게시물입니다.');
          return false;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  //투표 함수(투표항목선택)
  const handleChoiceClick = async (choiceNum) => {
    if (isLoggedIn) {
      if (memberId === postData.uid) {
        alert('자신의 게시물에는 투표할 수 없습니다.');
      }
    } else {
      try {
        console.log(choiceNum);
        await setSelectedChoice(choiceNum);
        const postDocRef = doc(db, 'posts-write', postId);
        // 현재 투표 항목의 정보 가져오기
        const postDocSnapshot = await getDoc(postDocRef);
        if (postDocSnapshot.exists()) {
          const postData = postDocSnapshot.data();
          const choiceIndex = postData?.vote?.choices.findIndex(
            (choice) => choice.choice_num === choiceNum,
          );
          // choiceIndex가 -1이 아니라면 해당 항목을 찾았음
          if (choiceIndex !== -1) {
            const isVoteCompleted = await updateVoteJoin(choiceNum);
            //isVoteCompleted 값이 true 경우에만 투표 진행
            if (isVoteCompleted) {
              await handleVoteUpdate(postDocRef, choiceNum);
            }
          }
          console.log(`마지막`, selectedChoice);
        }
      } catch (error) {
        console.error('오류 발생: ' + error);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <HeaderContent postData={postData} isLoggedIn={isLoggedIn} />
        <ContentDiv>
          <ImageContainer>
            {postData.images.map((image, index) => (
              <ImgBox
                src={image.image}
                alt={`이미지 ${index + 1}`}
                key={index}
              />
            ))}
          </ImageContainer>
          <ContentBox>{postData.contents}</ContentBox>
        </ContentDiv>

        {/* 투표진행중 & 투표참여했을때 또는 내가쓴글 */}
        {isLoggedIn && memberId === postData.uid ? (
          // 내가 작성한 게시물인 경우
          <VoteResult
            choices={postData.vote.choices}
            postData={postData}
            voteResult={postData.voteResult}
            endAt={postData.vote.end_at}
            createdAt={postData.created_at}
            postId={postId}
          />
        ) : // 다른 경우
        postStatus === 'ONGOING' ? (
          // 투표 진행 중인 경우
          join ? (
            // 투표진행중 & 투표에 참여한 경우
            <VoteResult
              choices={postData.vote.choices}
              postData={postData}
              voteResult={postData.voteResult}
              endAt={postData.vote.end_at}
              createdAt={postData.created_at}
              postId={postId}
            />
          ) : (
            // 투표진행중 & 투표에 참여하지 않은 경우
            <Votes
              handleChoiceClick={handleChoiceClick}
              createdAt={postData.created_at}
              endAt={postData.vote.end_at}
              vote={postData.vote}
              choices={postData.vote.choices}
            />
          )
        ) : // 투표 종료인 경우
        join ? (
          // 투표에 참여한 경우
          <VoteResult
            choices={postData.vote.choices}
            postData={postData}
            endAt={postData.vote.end_at}
            createdAt={postData.created_at}
            selectedChoice={selectedChoice}
            postId={postId}
          />
        ) : (
          // 투표에 참여하지 않은 경우
          <VoteResult
            choices={postData.vote.choices}
            postData={postData}
            endAt={postData.vote.end_at}
            createdAt={postData.created_at}
            selectedChoice={selectedChoice}
            postId={postId}
          />
        )}
      </Container>
      <TagContainer>
        {postData.tags.hashTag.map((tag, index) => (
          <TagBox key={index}>#{tag}</TagBox>
        ))}
      </TagContainer>
      <CountContainer>
        <VoteCount>
          <BsChatSquareDots />
          {postData.total_comment_count}명참여
        </VoteCount>
        <ChatCount>
          <PiChartBarHorizontalFill />
          {postData.total_vote_count}명참여
        </ChatCount>
      </CountContainer>
      <CommentForm postId={postId} postData={postData} />
      <CommentList postId={postId} />
    </ThemeProvider>
  );
};

export default PostDetail;

const ContentBox = styled.div`
  margin-left: 40px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
`;

const ImgBox = styled.img`
  width: 550px;
  height: 500px;
  margin-bottom: 20px;
  margin-left: 25px;
`;

const ContentDiv = styled.div`
  margin: 30px;
  width: 60%;
  font-size: 20px;
  font-weight: 600;
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
  margin-bottom: 10px;
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
