import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

const HeaderContent = ({
  userNickname,
  postData,
  handleEditClick,
  handleDeleteClick,
}) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <ThemeProvider theme={theme}>
      <StyledHeaderContainer>
        <StyledContainer1>
          <StyledIoIosArrowBack onClick={goBack} />
          <StyledH1>{postData.title}</StyledH1>
        </StyledContainer1>
        {userNickname === postData.nickname ? (
          <EditContainer>
            <EditButton onClick={handleEditClick}>수정하기</EditButton>
            <DeleteButton onClick={handleDeleteClick}>삭제하기</DeleteButton>
          </EditContainer>
        ) : (
          <BanSpan
            onClick={() => navigate(`/user/${postData.nickname}/report`)}
          >
            신고하기
          </BanSpan>
        )}
      </StyledHeaderContainer>
      <StyledContainer2>
        <WriterSpan>작성자:{postData.nickname}</WriterSpan>
        <TimeSpan>{postData.created_at}</TimeSpan>
      </StyledContainer2>
    </ThemeProvider>
  );
};

HeaderContent.propTypes = {
  userNickname: PropTypes.string.isRequired,
  postData: PropTypes.object.isRequired,
  handleEditClick: PropTypes.func.isRequired,

  handleDeleteClick: PropTypes.func.isRequired,
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
  width: 70%;
  align-items: center;
`;
const StyledContainer2 = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
  width: 60%;
`;
const BanSpan = styled.span`
  color: ${({ theme }) => theme.dark_purple};
  font-weight: bold;
`;
const WriterSpan = styled.span`
  color: ${({ theme }) => theme.medium_purple};
  font-weight: bold;
  font-size: 13px;
`;
const TimeSpan = styled.span`
  color: ${({ theme }) => theme.medium_purple};
  font-weight: bold;
  font-size: 13px;
`;
const EditContainer = styled.div`
  display: flex;
  width: 23%;
  justify-content: flex-end;
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
