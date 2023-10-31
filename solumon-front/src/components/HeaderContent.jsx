import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { useRecoilState } from 'recoil';
import { GeneralUserInfo } from '../recoil/AllAtom';
import axios from 'axios';

const HeaderContent = ({
  isLoggedIn,
  postData,
}) => {
  const userInfo = useRecoilState(GeneralUserInfo);
  const accessToken = userInfo[0].accessToken;
  const navigate = useNavigate();
  const goBack = () => {
    navigate('/post-list');
  };
  const handleEditClick =()=>{
    console.log(postData.post_id)
    navigate(`/edit/${postData.post_id}`)
  }

  const headers = {
    'X-AUTH-TOKEN': accessToken,
  };
  // console.log(headers)
  //  게시물 삭제 delete 요청 코드 //
  const deletePost = async() => {
    console.log(postData.post_id)
      try{
          const response = await axios.delete(
            `http://solumon.site:8080/posts/${postData.post_id}`,
            {
              headers,
              withCredentials: true
            },
          )
          if (response.status === 200) {
            console.log(response.data);
            console.log('삭제 성공');
            navigate('/post-list'); 
           } else {
              console.error('삭제 실패');
            }
          } catch (error) {
            console.error('오류 발생: ' + error);
          }
        }
      

  const handleDeleteClick = () => {
    if (window.confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
      deletePost();
    }
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
        {isLoggedIn && postData ? (
  <EditContainer>
    <EditButton onClick={handleEditClick}>수정하기</EditButton>
    <DeleteButton onClick={handleDeleteClick}>삭제하기</DeleteButton>
  </EditContainer>
) : (
  <BanSpan
  onClick={() => navigate(`/ban/${postData.writer_member_id}`)}
  >
    📢신고하기
  </BanSpan>
)}
      </StyledHeaderContainer>
      <StyledContainer2>
        <WriterSpan>작성자 : {postData.nickname}</WriterSpan>
        <TimeSpan>{formatDate(postData.created_at)}</TimeSpan>
      </StyledContainer2>
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
  margin-right: 40px;
  cursor: pointer;
`;
const StyledH1 = styled.h1`
  font-size: 30px;
  font-weight: bold;
  color: ${({ theme }) => theme.dark_purple};
`;
const StyledHeaderContainer = styled.div`
  display: flex;
  margin: 20px;
  width: 80%;
  justify-content: center;
 
`;
const StyledContainer2 = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
  margin-left:-20px;
  width: 55%;
`;
const BanSpan = styled.span`
  color: ${({ theme }) => theme.dark_purple};
  font-weight: bold;
  margin-right:80px;
  border:1px solid ${({ theme }) => theme.linen};
  border-radius:10px;
  padding:10px;
  background-color:${({ theme }) => theme.linen};
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
  margin-right:60px;
`;

const EditButton = styled.button`
  background-color: ${({ theme }) => theme.medium_purple};
  color: ${({ theme }) => theme.linen};
  border-radius: 5px;
  padding: 3px;
  cursor: pointer;
`;
const DeleteButton = styled.button`
  border: none;
  border-radius: 5px;
  padding: 3px;
  cursor: pointer;
`;
