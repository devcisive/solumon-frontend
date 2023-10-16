import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import PropTypes from 'prop-types';

const Votes = ({ vote, handleChoiceClick, postData, createdAt }) => {
  const { end_at } = vote;

  return (
    <ThemeProvider theme={theme}>
      <VoteContainer>
        <VoteHeader>
          <span>투표</span>
          <TimeSpan>
            {createdAt}~{end_at}
          </TimeSpan>
        </VoteHeader>
        <HorizontalLine />
        <VoteContentContainer>
          <ul>
            {postData.vote.choices.map((choice) => (
              <VoteContent
                key={choice.choice_num}
                onClick={() => handleChoiceClick(choice.choice_num)}
              >
                {choice.choice_num}. {choice.choice_text}
              </VoteContent>
            ))}
          </ul>
        </VoteContentContainer>
      </VoteContainer>
    </ThemeProvider>
  );
};
Votes.propTypes = {
  createdAt: PropTypes.string.isRequired,
  vote: PropTypes.shape({
    result_access_status: PropTypes.bool.isRequired,
    end_at: PropTypes.string.isRequired,
  }).isRequired,
  handleChoiceClick: PropTypes.func.isRequired,
  postData: PropTypes.object.isRequired, // postData 객체를 전달받아야 합니다.
};

export default Votes;
const TimeSpan = styled.div``;
const VoteContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.medium_purple};
  border-radius: 5px;
  width: 60%;
`;
const VoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;

  font-weight: bold;
  color: ${({ theme }) => theme.medium_purple};
`;
const HorizontalLine = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.medium_purple};
  margin: 0;
`;
const VoteContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const VoteContent = styled.div`
  border: 1px solid ${({ theme }) => theme.medium_purple};
  color: ${({ theme }) => theme.medium_purple};
  margin: 10px;
  padding: 15px;
  border-radius: 5px;
  font-size: 13px;
  font-weight: 400;
`;
