import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { formatDate } from './Utils';
import { db, auth } from '../firebase-config';
import { collection, where, query, getDocs } from 'firebase/firestore';

function VoteResult({ choices, postData, endAt, createdAt, postId }) {
  const voteEnd = new Date(endAt).getTime();
  const timeNow = new Date().getTime();
  const user = auth.currentUser;
  const postStatus = voteEnd > timeNow ? 'ONGOING' : 'COMPLETED';
  const [selectedChoice, setSelectedChoice] = useState(null);
  let isClosed;
  console.log(postId);

  const checkSelectedChoice = async () => {
    try {
      const selectedChoiceQuery = query(
        collection(db, 'users'),
        where('uid', '==', user.uid),
      );
      const userQueryData = await getDocs(selectedChoiceQuery);
      const userDoc = userQueryData.docs[0].data();
      const voteJoinPosts = userDoc.join_posts;
      console.log(voteJoinPosts);

      for (const key in voteJoinPosts) {
        const item = voteJoinPosts[key];
        const foundItem = item && item.postId === postId;
        if (foundItem === true) {
          setSelectedChoice(item.choiceNum);
        }
      }
      console.log('Selected Choice:', selectedChoice);
    } catch (error) {
      console.log(`Something Wrong: ${error.message}`);
    }
    if (postStatus === 'ONGOING') {
      isClosed = false;
    } else {
      isClosed = true;
    }
  };

  useEffect(() => {
    checkSelectedChoice();
  }, []);

  return (
    <ThemeProvider theme={{ theme, fontFamily: 'Noto Sans KR' }}>
      <VoteResultContainer $isClosed={isClosed}>
        <VoteHeader>
          <TitleContainer>
            <ResultTitle>투표 결과</ResultTitle>
            {isClosed && <ClosedBadge>종료</ClosedBadge>}
          </TitleContainer>
          <TimeSpan>
            {formatDate(createdAt)} ~ {formatDate(endAt)}
          </TimeSpan>
        </VoteHeader>
        <HorizontalLine />
        <VoteContentContainer>
          <ul>
            {choices.map((choice, index) => {
              const voteResultItem =
                postData.voteResult && postData.voteResult[choice.choice_num];
              const choiceCount =
                voteResultItem && voteResultItem.choice_count !== undefined
                  ? voteResultItem.choice_count
                  : 0;
              //voteResult에 있는 choice_count값을 누적해서 더함.
              const totalVotes =
                postData.voteResult && typeof postData.voteResult === 'object'
                  ? Object.values(postData.voteResult).reduce(
                      (sum, item) => sum + item.choice_count,
                      0,
                    )
                  : 0;
              //누적값이랑 해당항목 카운트값 나눠서 *100을 해줘 퍼센트 값 구함.
              const choicePercent =
                totalVotes === 0 ? 0 : (choiceCount / totalVotes) * 100;
              return (
                <ResultItem key={choice.choice_num}>
                  <ResultBar
                    $choicePercent={choicePercent}
                    $isSelected={selectedChoice === choice.choice_num}
                  >
                    {choice.choice_num + 1}.{choice.choice_text}
                  </ResultBar>
                  {voteResultItem ? (
                    <ChoicePercent>
                      {choicePercent.toFixed(0)}%/{voteResultItem.choice_count}
                      표
                    </ChoicePercent>
                  ) : (
                    <ChoicePercent>0표</ChoicePercent>
                  )}
                </ResultItem>
              );
            })}
          </ul>
        </VoteContentContainer>
      </VoteResultContainer>
    </ThemeProvider>
  );
}

VoteResult.propTypes = {
  choices: PropTypes.array.isRequired,
  postData: PropTypes.object.isRequired,
  selectedChoice: PropTypes.shape({
    selected_number: PropTypes.number,
  }),

  endAt: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default VoteResult;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const VoteResultContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.medium_purple};
  border-radius: 5px;
  width: 40%;
  background-color: ${(props) => (props.isClosed ? '#ccc' : 'transparent')};
  margin: 20px 0;
`;

const ClosedBadge = styled.div`
  background-color: ${({ theme }) => theme.medium_purple};
  color: #fff;
  padding: 5px;
  width: 50px;
  border-radius: 4px;
  font-size: 12px;
  text-align: center;
  margin-left: 10px;
`;

const HorizontalLine = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.medium_purple};
  margin: 0;
`;

const ResultBar = styled.div`
  background-color: ${({ theme }) => theme.light_purple};
  color: ${({ theme }) => theme.medium_purple};
  width: ${(props) => props.$choicePercent}%;
  border-radius: 5px 0 0 5px; // 왼쪽만 둥글게
  height: 100%;
  padding: 20px;
  white-space: nowrap;
  font-weight: ${(props) => (props.$isSelected ? 'bold' : 'normal')};
  color: ${(props) => (props.$isSelected ? 'black' : '')};
`;

const VoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px;
  margin-left: 30px;
  padding: 5px;
  font-weight: bold;
  color: ${({ theme }) => theme.medium_purple};
`;

const ResultTitle = styled.div`
  color: ${({ theme }) => theme.medium_purple};
  font-size: 20px;
`;

const ResultItem = styled.div`
  border: 1px solid ${({ theme }) => theme.medium_purple};
  color: ${({ theme }) => theme.dark_purple};
  margin: 15px 30px;
  align-items: center;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  width: ${(props) => props.$choicePercent};
`;

const VoteContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const TimeSpan = styled.span`
  color: ${({ theme }) => theme.medium_purple};
  font-weight: bold;
  font-size: 15px;
  margin-right: 20px;
  font-family: 'Noto Sans KR';
`;

const ChoicePercent = styled.span`
  color: ${({ theme }) => theme.medium_purple};
  display: flex;
  justify-content: flex-end;
  width: 120px;
  margin-right: 10px;
  font-family: 'Noto Sans KR';
  font-weight: bold;
`;
