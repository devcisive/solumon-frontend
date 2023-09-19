import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import { FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';

function NavigationBar() {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Logo>솔루몬</Logo>
        {userInfo && (
          <User>
            <UserName>
              <StyledSpan>{userInfo.name}</StyledSpan>님
            </UserName>
            <ProfileIcon />
          </User>
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
`;
