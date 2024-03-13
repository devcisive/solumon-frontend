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
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          const updatedReplies = comment.replies.map((reply) => {
            if (reply.id === replyId) {
              return { ...reply, content: editedCommentContent };
            }
            return reply;
          });
          return {
            ...comment,
            replies: updatedReplies,
          };
        }
        return comment;
      });

      await updateDoc(doc(db, 'posts-write', postId), {
        commentList: updatedComments,
      });

      setEditingCommentId(null);
      setEditingReplyId(null);
      setEditedCommentContent('');
    } catch (error) {
      console.error('Error updating: ', error);
    }
  };
  const handleReplyButtonClick = (commentId) => {
    setReplyingCommentId(commentId);
    setReplyContent('');
  };

  // 댓글의 답글 업데이트 함수
  const handleAddReply = async () => {
    try {
      const updatedComments = comments.map((comment) => {
        if (comment.id === replyingCommentId) {
          const updatedReplies = Array.isArray(comment.replies)
            ? [...comment.replies]
            : [];

          //해당댓글에 답글 업데이트
          updatedReplies.push({
            id: generateSequentialId(),
            userId: user.displayName,
            content: replyContent,
            createdAt: new Date().toISOString(),
          });
          return {
            ...comment,
            replies: updatedReplies,
          };
        }
        return comment;
      });

      await updateDoc(doc(db, 'posts-write', postId), {
        commentList: updatedComments,
      });

      setReplyContent('');
      setComments(updatedComments);
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
                <Name>{comment.userId}님</Name>
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
                            <Time>{formatDate(comment.createdAt)}</Time>
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
                        <Time>{formatDate(comment.createdAt)}</Time>
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
                    </ButtonBox>
                    <CancelButton
                      onClick={() => {
                        setReplyContent('');
                        setReplyingCommentId(null);
                      }}
                    >
                      취소
                    </CancelButton>
                  </>
                )}
                {comment.replies && comment.replies.length > 0 && (
                  <RepliesContainer>
                    {comment.replies.map((reply) => (
                      <ReplyBox key={reply.id}>
                        <StyledArrow>
                          <MdSubdirectoryArrowRight />
                          <StyledBox2>
                            <Name>{reply.userId}님</Name>
                            <Content>{reply.content}</Content>
                          </StyledBox2>
                        </StyledArrow>
                        <Time>{formatDate(reply.createdAt)}</Time>
                        {user.displayName === reply.userId && (
                          <>
                            {editingReplyId === reply.id ? (
                              //댓글의 답글 수정할때 수정모드
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
const StyledArrow = styled.div`
  display: flex;
  margin-left: -15px;
`;
const RepliesContainer = styled.div`
  margin-left: 15px;
  margin-top: 20px;
`;
const ReplyBox = styled.div`
  margin-bottom: 15px;
`;
const StyledBox2 = styled.div``;
const ReplyButton = styled.div``;
const ReplyInput = styled.input`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 99.5%;
  height: 50px;
`;
const StyledBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const EditButton = styled.button`
  margin-right: 5px;
  width: 50px;
  padding: 5px;
  background-color: ${({ theme }) => theme.linen};
  border: none;
`;
const Reply = styled.button`
  margin-left: 5px;
  padding: 3px;
  width: 50px;
  border-radius: 5px;
  background-color: #f5f5f5;
`;
const CancelButton = styled.button`
  padding: 5px;
  width: 50px;
  border: none;
  background-color: ${({ theme }) => theme.light_purple};
`;
const StyledContainer = styled.div``;
const Container = styled.div`
  display: flex;
  width: 50%;
  margin: auto;
  justify-content: flex-start;
  flex-direction: column;
`;

const Name = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
`;
const Content = styled.p`
  margin-bottom: 5px;
  margin-top: 20px;
`;
const Time = styled.p``;
const CommentBox = styled.div`
  border-bottom: 1px solid #ccc;
  width: 100%;
  margin: 10px;
  padding: 10px;
  padding-left: 0;
`;

const EditInput = styled.input`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 99.5%;
  height: 50px;
`;
