import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import PropTypes from 'prop-types';
import { formatDate } from './Utils';

const Votes = ({ handleChoiceClick, createdAt, endAt, choices }) => {
  return (
    <ThemeProvider theme={theme}>
      <VoteContainer>
        <VoteHeader>
          <StyledSpan>투표</StyledSpan>
          <TimeSpan>
            {formatDate(createdAt)}~{formatDate(endAt)}
          </TimeSpan>
        </VoteHeader>
        <HorizontalLine />
        <VoteContentContainer>
          <ul>
            {choices.map((choice) => (
              <VoteContent
                key={choice.choice_num}
                onClick={() => handleChoiceClick(choice.choice_num)}
              >
                {choice.choice_num + 1}. {choice.choice_text}
              </VoteContent>
            ))}
          </ul>
        </VoteContentContainer>
      </VoteContainer>
    </ThemeProvider>
  );
};
Votes.propTypes = {
  choices: PropTypes.array.isRequired,
  createdAt: PropTypes.string.isRequired,
  endAt: PropTypes.string.isRequired,

  handleChoiceClick: PropTypes.func.isRequired,
};

export default Votes;
const StyledSpan = styled.span`
  font-size: 25px;
`;
const TimeSpan = styled.div``;
const VoteContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.medium_purple};
  border-radius: 5px;
  width: 55%;
`;
const VoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
  padding: 10px;
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
  padding: 20px;
  border-radius: 5px;
  font-size: 17px;
  font-weight: 400;
`;
