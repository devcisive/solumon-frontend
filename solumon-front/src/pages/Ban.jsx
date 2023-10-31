import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import { PiSirenFill } from 'react-icons/pi';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { GeneralUserInfo } from '../recoil/AllAtom';
import { useParams } from 'react-router-dom';

const Ban = () => {
  const navigate = useNavigate();
  const { memberId } = useParams();
  const [selectedReason, setSelectedReason] = useState('');
  const [additionalComment, setAdditionalComment] = useState('');
  const userInfo = useRecoilState(GeneralUserInfo);
  const accessToken = userInfo[0].accessToken;


  const handleReasonChange = (event) => {
    setSelectedReason(event.target.value);
  };
  const handleCommentChange = (event) => {
    setAdditionalComment(event.target.value); // 추가 의견 업데이트
  };
  const data = {
    reported_member_id:memberId,
    report_type: selectedReason, // 선택된 라디오 버튼 값으로 reportType 설정
    report_content: additionalComment,
  };
  console.log(data)

  // 신고 POST 요청 코드 //
  const BanSubmit = async(e) => {
    e.preventDefault();
    const headers = {
      'X-AUTH-TOKEN': accessToken,
      'withCredentials': true
    };
        try{
            const response = await axios.post(
              `http://solumon.site:8080/user/report`,
             data,
              {
                headers,
                withCredentials: true
                },
            )
            
            if (response.status === 200) {
              console.log('신고 접수');
              alert('신고가 성공적으로 접수되었습니다.');
              navigate(`/post-list`);
             } else {
                console.error('신고 실패');
              }
            }
             catch (error) {
              console.error('오류 발생: ' + error);
            }
          }
  
  return (
    <>
      <Container>
        <ThemeProvider theme={theme}>
          <BanTitle>해당 사용자를 신고하시겠습니까?</BanTitle>
          <BanReason>
            신고사유
            <StyledPiSirenFill />
          </BanReason>
          <LabelContainer>
            <StyledLabel>
              <StyledInput
                type="radio"
                name="reportReason"
                value="SEXUAL_CONTENT"
                checked={selectedReason === 'SEXUAL_CONTENT'}
                onChange={handleReasonChange}
              />
              음란성/선정성
            </StyledLabel>
            <StyledLabel>
              <StyledInput
                type="radio"
                name="reportReason"
                value="HARASSMENT"
                checked={selectedReason === 'HARASSMENT'}
                onChange={handleReasonChange}
              />
              욕설/인신공격
            </StyledLabel>
            <StyledLabel>
              <StyledInput
                type="radio"
                name="reportReason"
                value="ADVERTISEMENT"
                checked={selectedReason === 'ADVERTISEMENT'}
                onChange={handleReasonChange}
              />
              광고
            </StyledLabel>
            <StyledLabel>
              <StyledInput
                type="radio"
                name="reportReason"
                value="OTHER"
                checked={selectedReason === ' OTHER'}
                onChange={handleReasonChange}
              />
              기타
            </StyledLabel>
          </LabelContainer>

          <StyledTextarea
            value={additionalComment}
            onChange={handleCommentChange}
            placeholder="의견을 입력하세요"
          />
          <ButtonContainer>
            <BanButton onClick={BanSubmit}>신고하기</BanButton>
          </ButtonContainer>
        </ThemeProvider>
      </Container>
    </>
  );
};

export default Ban;
const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  width: 60%;
  min-height: 100vh;
  flex-direction: column;
  color: ${({ theme }) => theme.medium_purple};
`;
const StyledLabel = styled.label`
  display: flex;
  align-items: center;
`;
const BanTitle = styled.div`
  color: ${({ theme }) => theme.dark_purple};
  font-weight: bold;
  font-size: 25px;
  width: 60%;
`;
const BanReason = styled.div`
  color: ${({ theme }) => theme.dark_purple};
  display: flex;
  margin: 30px;
  width: 60%;
  margin-left: 0;
  font-weight: bold;
`;
const LabelContainer = styled.div`
  display: flex;
  width: 60%;
  flex-direction: column;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const BanButton = styled.button`
  background-color: ${({ theme }) => theme.medium_purple};
  color: ${({ theme }) => theme.linen};
  width: 25%;
  padding: 15px;
  margin-top: 30px;
  border-radius: 5px;
`;
const StyledPiSirenFill = styled(PiSirenFill)`
  color: red;
`;
const StyledTextarea = styled.textarea`
  width: 50%;
  height: 100px;
  margin-top: 10px;
  border: 2px solid ${({ theme }) => theme.medium_purple};
  border-radius: 5px;
  padding: 8px;
  resize: none;
`;
const StyledInput = styled.input.attrs({ type: 'radio' })`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid ${({ theme }) => theme.linen};
  border-radius: 50%;
  position: relative;
  background-color: ${({ theme }) => theme.linen};
  outline: none;
  font-color: ${({ theme }) => theme.medium_purple};
  margin: 10px;

  &:checked::before {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    background-color: ${({ theme }) => theme.medium_purple};
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
