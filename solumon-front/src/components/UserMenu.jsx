import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import PropTypes from 'prop-types';

function UserMenu({ isActive }) {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper isActive={isActive}>
        <MenuWrapper>
          <Menu>알림</Menu>
          <Menu>회원정보</Menu>
          <Menu>내가 남긴 기록</Menu>
          <Menu>로그아웃</Menu>
          <Menu>회원탈퇴</Menu>
        </MenuWrapper>
      </Wrapper>
    </ThemeProvider>
  );
}

UserMenu.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default UserMenu;

const Wrapper = styled.div`
  position: relative;
  display: ${(props) => (props.isActive ? 'flex' : 'none')};
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

// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';

// export default function UserMenu() {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div>
//       <Button
//         id="demo-positioned-button"
//         aria-controls={open ? 'demo-positioned-menu' : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? 'true' : undefined}
//         onClick={handleClick}>
//         Dashboard
//       </Button>
//       <Menu
//         id="demo-positioned-menu"
//         aria-labelledby="demo-positioned-button"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: 'top',
//           horizontal: 'left',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'left',
//         }}>
//         <MenuItem onClick={handleClose}>알림</MenuItem>
//         <MenuItem onClick={handleClose}>회원정보</MenuItem>
//         <MenuItem onClick={handleClose}>내가 남긴 기록</MenuItem>
//         <MenuItem onClick={handleClose}>로그아웃</MenuItem>
//         <MenuItem onClick={handleClose}>회원탈퇴</MenuItem>
//       </Menu>
//     </div>
//   );
// }
