import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import { FaUserCircle } from 'react-icons/fa';
import { useState, useEffect } from 'react';

function NavigationBar() {
  const [userInfo, setUserInfo] = useState(null);
  const [userMenuActive, setUserMenuActive] = useState(false);

  const handleProfileIconClick = () => {
    setUserMenuActive(!userMenuActive);
    console.log(userMenuActive);
  };

  // useEffect(() => {
  //   console.log(userMenuActive);
  // }, [userMenuActive]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Logo>솔루몬</Logo>
        {userInfo && (
          <User>
            <UserName>
              <StyledSpan>userInfo.name</StyledSpan>님
            </UserName>
            <ProfileIcon onClick={handleProfileIconClick} />
          </User>
        )}
        {userMenuActive && (
          <UserMenuWrapper>
            <MenuWrapper>
              <Menu>알림</Menu>
              <Menu>회원정보</Menu>
              <Menu>내가 남긴 기록</Menu>
              <Menu>로그아웃</Menu>
              <Menu>회원탈퇴</Menu>
            </MenuWrapper>
          </UserMenuWrapper>
        )}
      </Wrapper>
    </ThemeProvider>
  );
}

export default NavigationBar;

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 55px;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: ${({ theme }) => theme.medium_purple};
`;

const Logo = styled.p`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  font-weight: bold;
  color: ${({ theme }) => theme.linen};
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

const UserName = styled.p``;

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
  top: -35px;
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

const Menu = styled.div`
  padding-left: 12px;
  color: ${({ theme }) => theme.dark_purple};
`;
