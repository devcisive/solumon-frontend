import { useState, useEffect, useRef } from 'react';
import * as Stomp from '@stomp/stompjs';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import axios from 'axios';

const Chat = ({ postId }) => {
  const [message, setMessage] = useState('');
  const [messageLists, setMessageLists] = useState([]);
  const stompClient = useRef(null);
  const chatContainerRef = useRef(null);
  const [lastChatMessageId, setLastChatMessageId] = useState(null);
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
  const USER_TOKEN = userInfo.accessToken;
  const MEMBER_ID = userInfo.memberId;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const headers = {
        'X-AUTH-TOKEN': USER_TOKEN,
        withCredentials: true,
        lastChatMessageId: lastChatMessageId,
      };

      const response = await axios.get(
        `http://solumon.site:8080/posts/${postId}`,
        {
          headers,
        },
      );

      const newMessages = response.data.last_chat_messages.content.flat();

      if (lastChatMessageId === null) {
        setMessageLists(newMessages);
      } else {
        setMessageLists((prevMessages) => [...newMessages, ...prevMessages]);
      }

      // Update lastChatMessageId for the next fetch
      setLastChatMessageId(
        newMessages.length > 0 ? newMessages[0].message_id : 0,
      );
      console.log(lastChatMessageId);
    } catch (error) {
      console.error('데이터를 불러오는 중 에러 발생:', error);
    }
  };
  useEffect(() => {
    // Scroll to the top when messageLists changes (initial load and new messages)
    const handleScroll = () => {
      if (chatContainerRef.current) {
        const scrolledToTop =
          chatContainerRef.current.scrollTop === 0 &&
          chatContainerRef.current.scrollHeight > 0;

        if (scrolledToTop) {
          fetchData();
        }
      }
    };
    if (chatContainerRef.current) {
      chatContainerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const websocket = new WebSocket(`ws://13.124.61.246:8080/ws-stomp`);
    stompClient.current = new Stomp.Client({
      webSocketFactory: () => websocket,
      connectHeaders: {
        'X-AUTH-TOKEN': USER_TOKEN,
      },
      debug: function (str) {
        console.log(str);
      },
    });

    stompClient.current.onConnect = () => {
      console.log('STOMP 연결 성공');
      stompClient.current.subscribe(`/sub/chat/${postId}`, (message) => {
        displayMessage(message);
      });
    };

    stompClient.current.onStompError = (frame) => {
      console.error('STOMP 연결 에러:', frame);
    };

    stompClient.current.activate();

    return () => {
      stompClient.current.deactivate();
    };
  }, []);

  const displayMessage = function (message) {
    if (message.body !== null) {
      let msg = JSON.parse(message.body);
      if (msg.contents && msg.created_at && msg.member_id) {
        setMessageLists((prevMessageLists) => [...prevMessageLists, msg]);
      }
    }
    console.log(`메세지 리스트`, messageLists);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message.trim() === '') return;
    if (stompClient.current && stompClient.current.connected) {
      const newMessage = {
        contents: message,
      };
      stompClient.current.publish({
        destination: `/pub/chat/${postId}`,
        body: JSON.stringify(newMessage.contents),
      });
      setMessage('');
    } else {
      console.error('WebSocket 연결이 아직 완료되지 않았습니다.');
    }
  };

  const isMyMessage = (message) => {
    return message.member_id === MEMBER_ID;
  };
  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date
      .getHours()
      .toString()
      .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

    return formattedDate;
  };
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ChatContainer ref={chatContainerRef}>
          {messageLists.map((message, index) => (
            <ChatBox key={index} user={isMyMessage(message)}>
              <ChatName>{message.nickname}</ChatName>
              <StyledDiv user={isMyMessage(message)}>
                <ChatCard user={isMyMessage(message)}>
                  {message.contents}
                </ChatCard>
                <ChatTime>{formatDate(message.created_at)}</ChatTime>
              </StyledDiv>
            </ChatBox>
          ))}
        </ChatContainer>
        <ChatInputContainer>
          <ChatInput
            type="text"
            value={message}
            onChange={handleMessageChange}
            placeholder="채팅 메시지를 입력하세요"
          />
          <ChatButton onClick={sendMessage}>전송</ChatButton>
        </ChatInputContainer>
      </Container>
    </ThemeProvider>
  );
};

Chat.propTypes = {
  postId: PropTypes.string.isRequired,
  accessToken: PropTypes.string,
  lastChat: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number.isRequired,
      member_id: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      contents: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Chat;
const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ user }) => (user ? 'flex-end' : 'flex-start')};
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 15px;
`;
const ChatName = styled.div`
  margin: 0 10px;
  font-weight: bold;
  font-size: 13px;
`;
const StyledDiv = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: ${({ user }) => (user ? 'row-reverse' : 'row')};
`;
const ChatTime = styled.div`
  display: flex;
  margin-bottom: 5px;
`;
const ChatContainer = styled.div`
  border: 1px solid #ccc;
  width: 94%;
  display: flex;
  flex-direction: column;
  height: 400px;
  overflow-y: auto;
`;
const ChatCard = styled.div`
  background-color: ${({ user, theme }) =>
    user ? theme.light_purple : theme.linen};
  color: #352f44;
  display: flex;
  border-radius: 8px;
  padding: 10px;
  margin: 5px;
  width: auto;
  padding: 15px;
`;

const Container = styled.div`
  margin-left: 30px;
  margin-top: 20px;
`;
const ChatInputContainer = styled.div`
  margin: 0;
`;

const ChatButton = styled.button`
  margin-top: 30px;
  margin-bottom: 30px;
  width: 12%;
  border-radius: 5px;
  margin-left: 20px;
  background-color: ${({ theme }) => theme.medium_purple};
  color: white;
  padding: 15px;
  font-size: 15px;
`;
const ChatInput = styled.input`
  border-radius: 5px;
  width: 80%;
  height: 40px;
  border: 1px solid #ccc;
  padding: 5px;
`;
