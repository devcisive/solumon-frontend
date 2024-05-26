import { onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useEffect } from 'react';
import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import { formatDate, generateSequentialId } from './Utils';
import { MdSubdirectoryArrowRight } from 'react-icons/md';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState('');
  const user = auth.currentUser;
  const [replyingCommentId, setReplyingCommentId] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [editingReplyId, setEditingReplyId] = useState(null);

  const fetchComments = () => {
    try {
      const postDocRef = doc(db, 'posts-write', postId);

      onSnapshot(postDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data().commentList || [];
          setComments(data);
          console.log(comments);
        } else {
          console.error('Document does not exist!');
        }
      });
    } catch (error) {
      console.error('Error fetching comments: ', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  // 수정버튼 클릭시 수정모드가능하게 만드는 함수
  const handleEditButtonClick = (commentId, replyId, content) => {
    if (replyId) {
      setEditingCommentId(null);
      setEditingReplyId(replyId);
    } else {
      setEditingCommentId(commentId);
      setEditingReplyId(null);
    }
    setEditedCommentContent(content);
  };

  // 댓글 삭제 기능 함수
  const handleDeleteButtonClick = async (commentId, replyId) => {
    try {
      let updatedComments = [...comments];
      console.log(replyId);
      if (replyId) {
        updatedComments = comments.map((comment) => {
          if (comment.id === commentId) {
            const updatedReplies = comment.replies.filter(
              (reply) => reply.id !== replyId,
            );
            return {
              ...comment,
              replies: updatedReplies,
            };
          }
          return comment;
        });
      } else {
        updatedComments = comments.filter(
          (comment) => comment.id !== commentId,
        );
      }

      await updateDoc(doc(db, 'posts-write', postId), {
        commentList: updatedComments,
      });
    } catch (error) {
      console.error('Error deleting: ' + error);
    }
  };

  //댓글 취소 가능하게 만드는 함수
  const handelCancelButtonClick = async () => {
    setEditingCommentId(null);
    setEditedCommentContent('');
    setEditingReplyId('');
  };

  const handleSaveEditButtonClick = async (commentId, replyId) => {
    try {
      // 수정된 댓글 또는 답글의 내용을 업데이트
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId && replyId) {
          // 본인이 작성한 답글을 수정할 때
          const updatedReplies = comment.replies.map((reply) => {
            if (reply.id === replyId) {
              // 수정된 내용을 새로운 내용으로 업데이트
              return { ...reply, content: editedCommentContent };
            }
            return reply;
          });
          return {
            ...comment,
            replies: updatedReplies,
          };
        } else if (comment.id === commentId) {
          // 본인이 작성한 댓글 수정할 때
          return {
            ...comment,
            content: editedCommentContent,
          };
        }
        return comment;
      });

      console.log(updatedComments);
      // 데이터베이스에 수정된 내용을 저장
      await updateDoc(doc(db, 'posts-write', postId), {
        commentList: updatedComments,
      });

      // 수정 모드 해제
      setEditingCommentId(null);
      setEditingReplyId(null);
      // 수정된 내용을 초기화하여 입력 필드 비우기
      setEditedCommentContent('');
    } catch (error) {
      console.error('Error updating: ', error);
    }
  };

  // 답글 작성 버튼 클릭시 동작하는 함수
  const handleReplyButtonClick = (commentId) => {
    setReplyingCommentId(commentId);
    setReplyContent('');
  };

  // 댓글의 답글 추가 함수
  const handleAddReply = async () => {
    try {
      const addComments = comments.map((comment) => {
        if (comment.id === replyingCommentId) {
          const addReplies = Array.isArray(comment.replies)
            ? [...comment.replies]
            : [];

          //해당댓글에 답글 추가
          addReplies.push({
            id: generateSequentialId(),
            userId: user.displayName,
            content: replyContent,
            createdAt: new Date().toISOString(),
          });
          return {
            ...comment,
            replies: addReplies,
          };
        }
        return comment;
      });

      await updateDoc(doc(db, 'posts-write', postId), {
        commentList: addComments,
      });

      setReplyContent('');
      setReplyingCommentId(null);
      setComments(addComments);
    } catch (error) {
      console.error('답글 추가 오류: ', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledContainer>
        <Container>
          {comments &&
            comments.map((comment) => (
              <CommentBox key={comment.id}>
                <CommentInfo>
                  <Name>{comment.userId}님</Name>
                  <Time>{formatDate(comment.createdAt)}</Time>
                </CommentInfo>

                {user.displayName === comment.userId && (
                  // 수정하려는 댓글의 아이디와 로그인한 유저의 아이디가 같을때 (수정, 삭제버튼 표시)
                  <>
                    {editingCommentId === comment.id ? (
                      //댓글 수정모드
                      <>
                        <EditInput
                          type="text"
                          value={editedCommentContent}
                          onChange={(e) =>
                            setEditedCommentContent(e.target.value)
                          }
                        />
                        <ButtonBox>
                          <EditButton
                            onClick={() =>
                              handleSaveEditButtonClick(comment.id)
                            }
                          >
                            저장
                          </EditButton>
                          <CancelButton onClick={handelCancelButtonClick}>
                            취소
                          </CancelButton>
                        </ButtonBox>
                      </>
                    ) : (
                      <>
                        <Content>{comment.content}</Content>
                        <StyledArea>
                          <StyledBox>
                            <Reply
                              onClick={() => handleReplyButtonClick(comment.id)}
                            >
                              답글
                            </Reply>
                          </StyledBox>
                          <ButtonBox>
                            <EditButton
                              onClick={() =>
                                handleEditButtonClick(
                                  comment.id,
                                  null,
                                  comment.content,
                                )
                              }
                            >
                              수정
                            </EditButton>
                            <CancelButton
                              onClick={() =>
                                handleDeleteButtonClick(comment.id)
                              }
                            >
                              삭제
                            </CancelButton>
                          </ButtonBox>
                        </StyledArea>
                      </>
                    )}
                  </>
                )}
                {user.displayName !== comment.userId && (
                  <>
                    {/* 해당댓글의 아이디와 로그인유저의 아이디가 다를경우 답글 버튼만 표시 */}
                    <Content>{comment.content}</Content>
                    <StyledArea>
                      <StyledBox>
                        <Reply
                          onClick={() => handleReplyButtonClick(comment.id)}
                        >
                          답글
                        </Reply>
                      </StyledBox>
                    </StyledArea>
                  </>
                )}
                {replyingCommentId === comment.id && (
                  <>
                    <ReplyInput
                      type="text"
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                    />
                    <ButtonBox>
                      <ReplyButton onClick={() => handleAddReply(comment.id)}>
                        답글작성
                      </ReplyButton>
                      <CancelButton
                        onClick={() => {
                          setReplyContent('');
                          setReplyingCommentId(null);
                        }}
                      >
                        취소
                      </CancelButton>
                    </ButtonBox>
                  </>
                )}
                {comment.replies && comment.replies.length > 0 && (
                  <RepliesContainer>
                    {comment.replies.map((reply) => (
                      <ReplyBox key={reply.id}>
                        <StyledArrow>
                          <MdSubdirectoryArrowRight />
                          <StyledBox2>
                            <CommentInfo>
                              <Name>{reply.userId}님</Name>
                              <Time>{formatDate(reply.createdAt)}</Time>
                            </CommentInfo>
                            <Content>{reply.content}</Content>
                          </StyledBox2>
                        </StyledArrow>
                        {user.displayName === reply.userId && (
                          <>
                            {editingReplyId === reply.id ? (
                              //댓글의 답글 수정할때 수정모드
                              <>
                                <ReplyInput
                                  type="text"
                                  value={editedCommentContent}
                                  onChange={(e) =>
                                    setEditedCommentContent(e.target.value)
                                  }
                                />
                                <ButtonBox>
                                  <EditButton
                                    onClick={() =>
                                      handleSaveEditButtonClick(
                                        comment.id,
                                        reply.id,
                                      )
                                    }
                                  >
                                    저장
                                  </EditButton>
                                  <CancelButton
                                    onClick={handelCancelButtonClick}
                                  >
                                    취소
                                  </CancelButton>
                                </ButtonBox>
                              </>
                            ) : (
                              <>
                                <ButtonBox>
                                  <EditButton
                                    onClick={() =>
                                      handleEditButtonClick(
                                        comment.id,
                                        reply.id,
                                        reply.content,
                                      )
                                    }
                                  >
                                    수정
                                  </EditButton>
                                  <CancelButton
                                    onClick={() =>
                                      handleDeleteButtonClick(
                                        comment.id,
                                        reply.id,
                                      )
                                    }
                                  >
                                    삭제
                                  </CancelButton>
                                </ButtonBox>
                              </>
                            )}
                          </>
                        )}
                      </ReplyBox>
                    ))}
                  </RepliesContainer>
                )}
              </CommentBox>
            ))}
        </Container>
      </StyledContainer>
    </ThemeProvider>
  );
};

export default CommentList;

const StyledContainer = styled.div`
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  margin: auto;
  justify-content: flex-start;
  flex-direction: column;
`;

const CommentBox = styled.div`
  border-bottom: 1px solid #ccc;
  width: 100%;
  margin: 10px 0 10px 0;
  padding: 10px 0 10px 0;
`;

const CommentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Name = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Time = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.medium_purple};
`;

const Content = styled.p`
  margin-bottom: 8px;
  margin-top: 15px;
  line-height: 24px;
`;

const EditInput = styled.input`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 99.5%;
  height: 50px;
  text-indent: 10px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledArrow = styled.div`
  display: flex;
  margin-left: -15px;
`;

const RepliesContainer = styled.div`
  margin-left: 15px;
  margin-top: 20px;
`;

const ReplyBox = styled.div`
  margin-bottom: 5px;
`;

const StyledBox2 = styled.div``;

const ReplyInput = styled.input`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 99.5%;
  height: 50px;
  text-indent: 10px;
`;

const Reply = styled.button`
  margin-top: 5px;
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.dark_purple};
  background-color: ${({ theme }) => theme.linen};
  cursor: pointer;
`;

const ReplyButton = styled.div`
  color: ${({ theme }) => theme.dark_purple};
  font-weight: 600;
  cursor: pointer;

  &::after {
    content: '';
    width: 1px;
    height: 15px;
    background-color: ${({ theme }) => theme.dark_purple};
    display: inline-block;
    margin: 0 5px 0 5px;
    position: relative;
    top: 1.7px;
  }
`;

const CancelButton = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.dark_purple};
  cursor: pointer;
`;

const EditButton = styled.button`
  font-size: 14px;
  background-color: transparent;
  padding: 0;
  color: ${({ theme }) => theme.dark_purple};
  border: none;
  cursor: pointer;

  &::after {
    content: '';
    width: 1px;
    height: 15px;
    background-color: ${({ theme }) => theme.dark_purple};
    display: inline-block;
    margin: 0 5px 0 5px;
    position: relative;
    top: 1.8px;
  }
`;
