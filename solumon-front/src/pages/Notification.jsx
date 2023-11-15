import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';

import { AiOutlineCheckCircle } from 'react-icons/ai';

function Notification() {
  const [notiList, setNotiList] = useState([]);
  const [checkNoti, setCheckNoti] = useState([]);
  const [deleteNoti, setDeleteNoti] = useState(false);

  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
  const USER_TOKEN = userInfo.accessToken;

  const fetchNotiData = async () => {
    try {
      const response = await axios.get(
        `http://solumon.site:8080/user/noti?pageNum=1`,
        {
          headers: {
            'X-AUTH-TOKEN': USER_TOKEN,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        const json = response.data;
        console.log(json);
        setNotiList(json.notifications);

        // // 임시로 담아둔 부분
        // setNotiList([
        //   {
        //     noti_id: 1,
        //     post_id: 1,
        //     post_title: '게시글 제목',
        //     is_read: true,
        //     type: 'ADD_CHAT',
        //     sent_at: '2023-07-24T23:00:22',
        //   },
        //   {
        //     noti_id: 2,
        //     post_id: 2,
        //     post_title: '게시글 제목',
        //     is_read: false,
        //     type: 'CLOSED_POST',
        //     sent_at: '2023-07-24T23:00:34',
        //   },
        //   {
        //     noti_id: 3,
        //     post_id: 3,
        //     post_title: '게시글 제목2',
        //     is_read: false,
        //     type: 'CLOSED_POST',
        //     sent_at: '2023-07-24T23:00:34',
        //   },
        // ]);
        console.log(notiList);
      } else {
        console.error('로딩 실패');
      }
    } catch (error) {
      console.log(`Something Wrong: ${error.message}`);
    }
  };

  const handleCheckNoti = async (notiId) => {
    try {
      const response = await axios.get(
        `http://solumon.site:8080/user/noti/${notiId}`,
        {
          headers: {
            'X-AUTH-TOKEN': USER_TOKEN,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        setCheckNoti((prevCheckNoti) => {
          const updatedCheckNoti = Array.isArray(prevCheckNoti)
            ? [...prevCheckNoti]
            : [];
          if (!updatedCheckNoti.includes(notiId)) {
            updatedCheckNoti.push(notiId);
          }
          return updatedCheckNoti;
        });

        console.log(checkNoti);
      } else {
        console.error('삭제 실패');
      }
    } catch (error) {
      console.log(`Something Wrong: ${error.message}`);
    }
  };

  const handleDeleteAllNoti = async () => {
    try {
      const response = await axios.delete(
        `http://solumon.site:8080/user/noti`,
        {
          headers: {
            'X-AUTH-TOKEN': USER_TOKEN,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        console.log(response);
        setDeleteNoti(true);
        setNotiList([]);
      }
    } catch (error) {
      console.log(`Something Wrong: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchNotiData();
  }, []);

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
                to={`/postsDetail/${notification.post_id}`}
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
    checkNoti.includes(notification.noti_id) ? '60%' : '100%'};
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
