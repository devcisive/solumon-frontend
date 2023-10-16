import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import PropTypes from 'prop-types';

function VoteResult({ choices, postData, selectedChoice }) {
  const isClosed = !postData.vote.result_access_status;

  return (
    <ThemeProvider theme={theme}>
      <VoteResultContainer isClosed={isClosed}>
        <VoteHeader>
          <TitleContainer>
            <ResultTitle>투표 결과</ResultTitle>
            {isClosed && <ClosedBadge>종료</ClosedBadge>}
          </TitleContainer>

          <TimeSpan>
            {postData.created_at}~{postData.vote.end_at}
          </TimeSpan>
        </VoteHeader>
        <HorizontalLine />
        <VoteContentContainer>
          <ul>
            {choices.map((choice) => (
              <ResultItem key={choice.choice_num}>
                <ResultBar
                  $choicePercent={choice.choice_percent}
                  $isSelected={
                    choice.choice_num === selectedChoice?.selected_number
                  }
                >
                  {choice.choice_num}.{choice.choice_text}
                </ResultBar>
                <ChoicePercent>
                  {choice.choice_percent}/{choice.choice_count}표
                </ChoicePercent>
              </ResultItem>
            ))}
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
};

export default VoteResult;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;
const VoteResultContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.medium_purple};
  border-radius: 5px;
  width: 60%;
  background-color: ${(props) => (props.isClosed ? '#ccc' : 'transparent')};
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
  width: ${(props) => props.$choicePercent};
  border-radius: 5px 0 0 5px; // 왼쪽만 둥글게
  height: 100%;
  padding: 15px;
  white-space: nowrap;
  font-weight: ${(props) => (props.$isSelected ? 'bold' : 'normal')};
`;
const VoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;

  font-weight: bold;
  color: ${({ theme }) => theme.medium_purple};
`;

const ResultTitle = styled.div`
  color: ${({ theme }) => theme.medium_purple};
`;
const ResultItem = styled.div`
  border: 1px solid ${({ theme }) => theme.medium_purple};
  color: ${({ theme }) => theme.medium_purple};
  margin: 10px;
  align-items: center;
  border-radius: 5px;
  font-size: 13px;
  font-weight: 400;
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
  font-size: 13px;
`;
const ChoicePercent = styled.span`
  color: ${({ theme }) => theme.medium_purple};
  padding: 15px;
`;
