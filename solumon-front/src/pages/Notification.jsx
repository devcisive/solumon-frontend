import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';

import { AiOutlineCheckCircle } from 'react-icons/ai';

function Notification() {
  const [notiList, setNotiList] = useState([]);
  const [checkNoti, setCheckNoti] = useState(0);
  const [deleteNoti, setDeleteNoti] = useState(false);

  const fetchNotiData = async () => {};

  const handleCheckNoti = async () => {};

  const handleDeleteAllNoti = async () => {};

  return (
    <ThemeProvider theme={theme}>
      {notiList.length > 0 ? (
        <Wrapper>
          <Title>알림</Title>
          <TextButton onClick={handleDeleteAllNoti}>전체 삭제</TextButton>
          <NotiContainer>
            {notiList.map((notification) => (
              <NotificationBox
                key={notification.noti_id}
                // to={`/postsDetail/${notification.post_id}`}
                checkNoti={checkNoti}
                deleteNoti={deleteNoti}
                notification={notification}
                onClick={() => handleCheckNoti(notification.noti_id)}
              >
                {notification.type === 'ADD_CHAT' ? (
                  <Message>
                    {"'"}
                    {notification.post_title}
                    {"'"} 글에 새로운 채팅이 등록되었습니다.
                  </Message>
                ) : (
                  <Message>
                    {"'"}
                    {notification.post_title}
                    {"'"} 글의 투표가 종료되었습니다.
                  </Message>
                )}
                <Date>{notification.sent_at.slice(0, 10)}</Date>
              </NotificationBox>
            ))}
          </NotiContainer>
        </Wrapper>
      ) : (
        <NoNoti>
          <StyledIcon />
          새로운 알림이 없습니다
        </NoNoti>
      )}
    </ThemeProvider>
  );
}

export default Notification;

const Wrapper = styled.div`
  width: 940px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translate(-50%, 0);
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.dark_purple};
  font-size: 28px;
  font-weight: 600;
  align-self: flex-start;
  /* margin-left: 300px; */
  margin-bottom: 15px;
`;

const TextButton = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.dark_purple};
  align-self: flex-end;
  margin-bottom: 20px;
  cursor: pointer;
`;

const NotiContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NotificationBox = styled(Link)`
  width: 900px;
  padding: 15px 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.linen};
  opacity: ${({ checkNoti, notification }) =>
    checkNoti === notification.noti_id ? '60%' : '100%'};
  text-decoration: none;

  display: ${({ deleteNoti }) => (deleteNoti ? 'none' : 'flex')};
  justify-content: space-between;
`;

const Message = styled.span`
  color: ${({ theme }) => theme.dark_purple};
`;

const Date = styled.span`
  color: ${({ theme }) => theme.medium_purple};
  font-size: 14px;
`;

const NoNoti = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 26px;
  font-weight: 600;
  color: ${({ theme }) => theme.dark_purple};

  gap: 20px;
`;

const StyledIcon = styled(AiOutlineCheckCircle)`
  width: 40px;
  height: 40px;
`;
