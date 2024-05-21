import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import device from '../media';
import PropTypes from 'prop-types';

import Button from './Button';

function Modal({ message, onConfirm, onCancel, btnCount }) {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <StyledP>{message}</StyledP>
        {btnCount === 1 ? (
          <ButtonWrapper>
            <Button
              type="button"
              name={'확인'}
              onClick={onConfirm}
              fontSize={'16px'}
              padding={'10px 22px'}
              borderRadius={'10px'}
            />
          </ButtonWrapper>
        ) : (
          <ButtonWrapper>
            <Button
              type="button"
              name={'로그아웃'}
              onClick={onConfirm}
              fontSize={'16px'}
              padding={'10px 22px'}
              borderRadius={'10px'}
            />
            <Button
              type="button"
              name={'취소'}
              onClick={onCancel}
              fontSize={'16px'}
              padding={'10px 22px'}
              borderRadius={'10px'}
            />
          </ButtonWrapper>
        )}
      </Wrapper>
    </ThemeProvider>
  );
}

Modal.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  btnCount: PropTypes.number,
};

export default Modal;

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  z-index: 15;
  width: 50%;
  min-width: 500px;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.dark_purple};
  background-color: ${({ theme }) => theme.light_purple};
  border-radius: 15px;
`;

const StyledP = styled.p`
  color: ${({ theme }) => theme.dark_purple};
  font-size: 26px;
  margin-top: 20px;

  @media ${({ theme }) => device.tablet} {
    font-size: 24px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 60px;

  @media ${({ theme }) => device.tablet} {
    gap: 15px;
  }
`;
