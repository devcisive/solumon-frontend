import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import PropTypes from 'prop-types';

function Badge({ end_at }) {
  const isVoteExpired = (endDate) => {
    const currentTime = new Date().getTime();
    const voteEndTime = new Date(endDate).getTime();
    return currentTime > voteEndTime;
  };

  return (
    <ThemeProvider theme={theme}>
      {end_at && isVoteExpired(end_at) ? (
        <Wrapper>
          <StyledSpan>투표종료</StyledSpan>
        </Wrapper>
      ) : (
        <></>
      )}
    </ThemeProvider>
  );
}

Badge.propTypes = {
  end_at: PropTypes.string.isRequired,
};

export default Badge;

const Wrapper = styled.div``;

const StyledSpan = styled.span`
  color: ${({ theme }) => theme.dark_purple};
  background-color: ${({ theme }) => theme.light_purple};
  font-weight: 600;
  border-radius: 10px;
  padding: 2px 4px;
`;
