import { useState } from 'react';
import {
  updateDoc,
  doc,
  arrayUnion,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import PropTypes from 'prop-types';
import { generateSequentialId } from './Utils';

const CommentForm = ({ postId, postData }) => {
  const user = auth.currentUser;
  console.log(user);
  const [comment, setComment] = useState('');

  // 댓글 참여 확인하는 함수 ( users 컬렉션에 postID 저장)
  const updateReplyJoin = async () => {
    try {
      const userQuery = query(
        collection(db, 'users'),
        where('uid', '==', user.uid),
      );
      const querySnapshot = await getDocs(userQuery);
      const userDoc = querySnapshot.docs[0];
      if (userDoc) {
        //중복확인 postId 한번만 저장.
        const replyJoinPosts = userDoc.data().reply_posts || [];
        const isDuplicateVote = replyJoinPosts.some(
          (item) => item.postId === postId,
        );
        //처음 댓글 다는 경우, join-posts 값 업데이트
        if (!isDuplicateVote) {
          const updatedJoinPosts = [...replyJoinPosts, { postId }];
          await updateDoc(doc(db, 'users', userDoc.id), {
            reply_posts: updatedJoinPosts,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      return;
    }
    try {
      const newComment = {
        id: generateSequentialId(),
        userId: user.displayName,
        content: comment,
        createdAt: new Date().toISOString(),
      };
      await updateReplyJoin();
      await updateDoc(doc(db, 'posts-write', postId), {
        commentList: arrayUnion(newComment),
        total_comment_count: (postData.total_comment_count || 0) + 1,
      });
      setComment('');
    } catch (error) {
      console.error('Error adding comment: ', error);
    }
  };

  CommentForm.propTypes = {
    postId: PropTypes.string.isRequired,
    postData: PropTypes.shape({
      total_comment_count: PropTypes.number,
    }).isRequired,
  };

  return (
    <ThemeProvider theme={theme}>
      <Form onSubmit={handleSubmit}>
        <CommentBox
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력하세요"
        ></CommentBox>
        <Button type="submit" onClick={handleSubmit}>
          등록
        </Button>
      </Form>
    </ThemeProvider>
  );
};

export default CommentForm;

const Form = styled.form`
  display: flex;
  margin: 20px 0 10px 0;
  align-items: center;
  justify-content: center;
`;

const CommentBox = styled.input`
  width: 46vw;
  height: 45px;
  font-size: 16px;
  padding-left: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.div`
  height: 45px;
  display: flex;
  align-items: center;
  margin-left: 15px;
  padding: 1px 20px;
  font-size: 16px;
  color: white;
  background-color: ${({ theme }) => theme.medium_purple};
  border-radius: 5px;
  cursor: pointer;
`;
