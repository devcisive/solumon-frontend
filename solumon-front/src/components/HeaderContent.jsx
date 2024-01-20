import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { db } from '../firebase-config';
import { deleteDoc, doc } from 'firebase/firestore';

const HeaderContent = ({ isLoggedIn, postData }) => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const goBack = () => {
    navigate('/post-list');
  };
  const handleEditClick = () => {
    console.log(postId);
    navigate(`/edit/${postId}`);
  };

  //  게시물 삭제 delete 요청 코드 //
  const deletePost = async () => {
    try {
      const postDocRef = doc(db, 'posts-write', postId);
      await deleteDoc(postDocRef);
    } catch (error) {
      console.error('오류 발생: ' + error);
    }
  };

  const handleDeleteClick = () => {
    if (window.confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
      deletePost();
    }
    navigate('/post-list');
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };
  HeaderContent.propTypes = {
    postData: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  };
  return (
    <ThemeProvider theme={theme}>
      <StyledHeaderContainer>
        <StyledContainer1>
          <StyledIoIosArrowBack onClick={goBack} />
          <StyledH1>{postData.title}</StyledH1>
        </StyledContainer1>
        {isLoggedIn ? (
          <EditContainer>
            <EditButton onClick={handleEditClick}>수정</EditButton>
            <DeleteButton onClick={handleDeleteClick}>삭제</DeleteButton>
          </EditContainer>
        ) : (
          <BanSpan onClick={() => navigate(`/ban/${postData.uid}`)}>
            📢신고하기
          </BanSpan>
        )}
      </StyledHeaderContainer>
      <StyledContainer2>
        <WriterSpan>작성자 : {postData.nickname}</WriterSpan>
        <TimeSpan>{formatDate(postData.created_at)}</TimeSpan>
      </StyledContainer2>
      <StyledHr />
    </ThemeProvider>
  );
};

export default HeaderContent;
const StyledContainer1 = styled.div`
  display: flex;
  width: 70%;
`;
const StyledIoIosArrowBack = styled(IoIosArrowBack)`
  font-size: 30px;
  cursor: pointer;
  transform: translateX(-40px);
`;
const StyledHr = styled.hr`
  height: 1px;
  background-color: #ccc;
  margin: 10px 0;
  width: 60%;
`;
const StyledH1 = styled.h1`
  font-size: 30px;
  font-weight: bold;
  color: ${({ theme }) => theme.dark_purple};
`;
const StyledHeaderContainer = styled.div`
  display: flex;
  margin: 20px;
  margin-top: 100px;
  width: 73%;
  justify-content: center;
`;
const StyledContainer2 = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
  margin-left: -20px;
  width: 55%;
`;
const BanSpan = styled.span`
  color: ${({ theme }) => theme.dark_purple};
  font-weight: bold;
  margin-right: 80px;
  border: 1px solid ${({ theme }) => theme.linen};
  border-radius: 10px;
  padding: 10px;
  background-color: ${({ theme }) => theme.linen};
`;
const WriterSpan = styled.span`
  color: ${({ theme }) => theme.medium_purple};
  font-weight: bold;
  font-size: 18px;
`;
const TimeSpan = styled.span`
  color: ${({ theme }) => theme.medium_purple};
  font-weight: bold;
  font-size: 18px;
`;
const EditContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 60px;
`;

const EditButton = styled.button`
  background-color: ${({ theme }) => theme.medium_purple};
  color: ${({ theme }) => theme.linen};
  border-radius: 5px;
  padding: 3px;
  cursor: pointer;
  width: 60px;
  margin-right: 1px;
`;
const DeleteButton = styled.button`
  border: none;
  border-radius: 5px;
  padding: 3px;
  cursor: pointer;
  width: 60px;
`;
