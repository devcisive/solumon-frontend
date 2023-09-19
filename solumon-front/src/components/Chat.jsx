import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import PropTypes from 'prop-types';

const Chat = ({ message, user }) => {
  return (
    <ThemeProvider theme={theme}>
      <ChatContainer user={user}>
        <ChatCard user={user}>{message}</ChatCard>
      </ChatContainer>
    </ThemeProvider>
  );
};

Chat.propTypes = {
  message: PropTypes.string.isRequired,
  user: PropTypes.bool.isRequired,
};
export default Chat;
const ChatContainer = styled.div`
  display: flex;
  justify-content: ${({ user }) => (user ? 'flex-start' : 'flex-end')};
`;

const ChatCard = styled.div`
  background-color: ${({ user, theme }) =>
    user ? theme.linen : theme.light_purple};
  color: #352f44;
  border-radius: 8px;
  padding: 10px;
  margin: 5px;
  width: auto;
  padding: 15px;
}
`;

// &::before {
//   content: '';
//   position: absolute;
//   width: 0;
//   height: 0;
//   border-style: solid;
//   border-width: 10px;
//   border-color: transparent transparent transparent
//     ${({ user, theme }) => (user ? theme.linen : theme.light_purple)};

//   ${({ user }) => (user ? 'left: -10px;' : 'right: -20px;')}
//   top: 50%;
//   transform: translateY(-50%) rotate(90deg); 일단보류...
