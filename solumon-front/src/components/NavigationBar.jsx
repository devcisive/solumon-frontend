import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import Button from './Button';
import { FaUserCircle } from 'react-icons/fa';

function NavigationBar() {
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo')) || 0;
  const nickname = userInfo.nickname;
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleProfileIconClick = () => {
    setUserMenuActive(!userMenuActive);
  };

  const handleLogout = () => {
    setOpenModal(true);
  };

  const handleLogoutConfirmButton = async () => {
    try {
      await auth.signOut();

      console.log('로그아웃 성공');
      setOpenModal(false);
      window.localStorage.removeItem('userInfo');
      setUserMenuActive(false);
      navigate('/login');
    } catch (error) {
      console.log(`Something Wrong: ${error.message}`);
    }
  };

  const handleCancelButton = () => {
    setOpenModal(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Logo to={userInfo.accessToken ? '/post-list' : '/login'}>
          <img src="/image/logo.png"></img>
        </Logo>
        {userInfo ? (
          <User>
            <UserName onClick={handleProfileIconClick}>
              <StyledSpan>{nickname}</StyledSpan>님
            </UserName>
            <ProfileIcon onClick={handleProfileIconClick} />
          </User>
        ) : (
          <></>
        )}
        {userMenuActive && (
          <UserMenuWrapper>
            <MenuWrapper>
              {/* <MenuContainer> */}
              <Menu to={'/notification'}>알림</Menu>
              {/* <Badge>N</Badge>
              </MenuContainer> */}

              <Menu to={'/user'}>회원정보</Menu>
              <Menu to={'/my-history'}>내가 남긴 기록</Menu>
              <Menu onClick={handleLogout}>로그아웃</Menu>
              <Menu to={'/withdraw'}>회원탈퇴</Menu>
            </MenuWrapper>
          </UserMenuWrapper>
        )}
        {openModal && (
          <ModalWrapper>
            <StyledH1>솔루몬을 로그아웃 하시겠습니까?</StyledH1>
            <ButtonWrapper>
              <Button
                type="button"
                name={'로그아웃'}
                onClick={handleLogoutConfirmButton}
                fontSize={'16px'}
                padding={'10px 22px'}
                borderRadius={'10px'}
              />
              <Button
                type="button"
                name={'취소'}
                onClick={handleCancelButton}
                fontSize={'16px'}
                padding={'10px 22px'}
                borderRadius={'10px'}
              />
            </ButtonWrapper>
          </ModalWrapper>
        )}
      </Wrapper>
    </ThemeProvider>
  );
}

export default NavigationBar;

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 80px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 10;
  background-color: ${({ theme }) => theme.medium_purple};
`;

const Logo = styled(Link)`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  font-weight: bold;
  color: ${({ theme }) => theme.linen};
  text-decoration: none;
  cursor: pointer;
`;

const User = styled.p`
  position: absolute;
  right: 30px;
  color: ${({ theme }) => theme.linen};
  display: flex;
  align-items: center;
  gap: 20px;
`;

const UserName = styled.p`
  cursor: pointer;
`;

const StyledSpan = styled.span`
  font-weight: 500;
  margin-right: 3px;
`;

const ProfileIcon = styled(FaUserCircle)`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.linen};
  cursor: pointer;
`;

const UserMenuWrapper = styled.div`
  position: absolute;
  top: -26px;
  right: -58px;
  display: flex;
  width: 130px;
  height: 170px;
  border-radius: 10px 0 10px 10px;
  background-color: ${({ theme }) => theme.linen};
  margin: 100px;
  padding: 0 5px;

  &::before {
    content: '';
    border-left: 20px solid;
    /* border-right: 12px solid; */
    border-bottom: 20px solid;
    border-color: transparent transparent ${({ theme }) => theme.linen}
      transparent;
    position: absolute;
    bottom: 170px;
    right: 0;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

const Menu = styled(Link)`
  padding-left: 12px;
  color: ${({ theme }) => theme.dark_purple};
  text-decoration: none;
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Badge = styled.div`
  padding: 3px 4px;
  border-radius: 50%;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  background-color: red;
  color: white;
  margin-left: 5px;
`;

const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 20%);
  z-index: 10;
  width: 50%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.dark_purple};
  background-color: ${({ theme }) => theme.light_purple};
  border-radius: 15px;
`;

const StyledH1 = styled.h1`
  color: ${({ theme }) => theme.dark_purple};
  font-size: 26px;
  font-weight: 500;
  margin-top: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 60px;
`;
