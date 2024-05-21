import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import { db } from '../firebase-config';
import { deleteDoc, doc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import { formatDate2 } from './Utils';

const HeaderContent = ({ isLoggedIn, postData }) => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const goBack = () => {
    navigate(-1);
  };

  const handleEditClick = () => {
    console.log(postId);
    navigate(`/edit/${postId}`);
  };

  //  게시물 삭제 delete 요청 코드
  const handleDeleteClick = async () => {
    alert('정말로 이 게시물을 삭제하시겠습니까?');
    try {
      const postDocRef = doc(db, 'posts-write', postId);
      await deleteDoc(postDocRef);
    } catch (error) {
      console.error('오류 발생: ' + error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledHeaderContainer>
        <StyledContainer1>
          <GoBackArrow title="뒤로가기" onClick={goBack} />
          <StyledH1>{postData.title}</StyledH1>
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
        </StyledContainer1>

        <StyledContainer2>
          <WriterSpan>작성자 : {postData.nickname}</WriterSpan>
          <TimeSpan>{formatDate2(postData.created_at)}</TimeSpan>
        </StyledContainer2>
      </StyledHeaderContainer>

      <StyledHr />
    </ThemeProvider>
  );
};

HeaderContent.propTypes = {
  postData: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default HeaderContent;

const StyledHeaderContainer = styled.div`
  width: 58vw;
  min-width: 780px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 80px;
  margin-bottom: 20px;
`;

const StyledContainer1 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const GoBackArrow = styled(FaArrowLeft)`
  /* position: absolute;
  left: 250px;
  top: 160px; */
  color: ${({ theme }) => theme.medium_purple};
  font-size: 26px;
  cursor: pointer;
`;

const StyledH1 = styled.h1`
  font-size: 26px;
  font-weight: bold;
  color: ${({ theme }) => theme.dark_purple};
`;

const StyledContainer2 = styled.div`
  display: flex;
  justify-content: space-between;
`;

const WriterSpan = styled.span`
  color: ${({ theme }) => theme.medium_purple};
  font-size: 18px;
`;

const TimeSpan = styled.span`
  color: ${({ theme }) => theme.medium_purple};
  font-size: 16px;
`;

const StyledHr = styled.hr`
  height: 1px;
  background-color: #ccc;
  margin: 10px 0;
  width: 58vw;
  min-width: 780px;
`;

const BanSpan = styled.span`
  color: ${({ theme }) => theme.dark_purple};
  font-weight: bold;
  border: 1px solid ${({ theme }) => theme.linen};
  border-radius: 10px;
  padding: 10px;
  background-color: ${({ theme }) => theme.linen};
  cursor: pointer;
`;

const EditContainer = styled.div`
  display: flex;
`;

const EditButton = styled.button`
  background-color: ${({ theme }) => theme.medium_purple};
  color: ${({ theme }) => theme.linen};
  border-radius: 5px;
  border: none;
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
