import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import { PiSirenFill } from 'react-icons/pi';
import { useState } from 'react';

const Ban = () => {
  const [selectedReason, setSelectedReason] = useState('');
  const [additionalComment, setAdditionalComment] = useState(''); // 선택된 신고사유 상태 추가

  const handleReasonChange = (event) => {
    setSelectedReason(event.target.value);
  };
  const handleCommentChange = (event) => {
    setAdditionalComment(event.target.value); // 추가 의견 업데이트
  };
  const BanSubmit = () => {
    const data = {
      reportType: selectedReason, // 선택된 라디오 버튼 값으로 reportType 설정
      reportContent: additionalComment,
    };

    const Url = 'https://jsonplaceholder.typicode.com/user/:nickname/report';
    // POST 요청 설정
    fetch(Url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        // 서버 응답을 처리
        alert('신고가 성공적으로 접수되었습니다.');
      })
      .catch((error) => {
        // 오류 처리
        alert('오류가 발생했습니다: ' + error.message);
      });
  };

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
                value=" OTHER"
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
