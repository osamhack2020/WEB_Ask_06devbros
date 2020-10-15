import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';

function Profile(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    //handler
    const handleMenuClose = () => {
        setAnchorEl(null);
      };

    const menuId = 'primary-search-account-menu';

    return (
        <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
  
        {props.isLogin && (<div>
          <MenuItem onClick={handleMenuClose}>내 정보</MenuItem>
          <MenuItem onClick={handleMenuClose}>나의 질문 / 받은 질문</MenuItem>
          <MenuItem onClick={handleMenuClose}>홈페이지 기여하기</MenuItem>
          <MenuItem onClick={handleMenuClose}>도움말</MenuItem>
        </div>)
        }
  
        {props.isLogin || (<div>
          <MenuItem onClick={handleMenuClose}>회원가입</MenuItem>
          <Link to="/Login" style={{textDecoration:"none"}}><MenuItem>로그인</MenuItem></Link>
          <MenuItem onClick={handleMenuClose}>홈페이지 기여하기</MenuItem>
          <MenuItem onClick={handleMenuClose}>도움말</MenuItem>
        </div>)
        }
  
      </Menu>
    );
}

export default Profile;