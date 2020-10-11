import React from 'react';
import { fade, makeStyles  } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup'
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    marginRight: theme.spacing(2),
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(),
      width: 'auto',
    },
  },
  sectionDesktop: {
    display: 'flex'
  },
  link: {
    marginRight: theme.spacing(10),
    marginBottom: theme.spacing(2.5),
    marginTop: theme.spacing(2.5),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

// const color = createMuiTheme({
//   palette: {
//     primary: {
//       main: '#a7ffeb',
//     },
//     secondary: {
//       main: '#f44336',
//     },
//   },
// }); 


function Header() {
  //constants
  const classes = useStyles();
  // const colors = color();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [auth, setAuth] = React.useState(true);  //로그인 체크
  const [open, setOpen] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);

  // event handler

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
    
  };


  const menuId = 'primary-search-account-menu';
  const renderMenu = (     // 회원 정보 누를 시 나오는 메뉴바
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >

      {auth && (<div>
        <MenuItem onClick={handleMenuClose}>내 정보</MenuItem>
        <MenuItem onClick={handleMenuClose}>나의 질문 / 받은 질문</MenuItem>
        <MenuItem onClick={handleMenuClose}>홈페이지 기여하기</MenuItem>
        <MenuItem onClick={handleMenuClose}>도움말</MenuItem>
      </div>)
      }

      {auth || (<div>
        <MenuItem onClick={handleMenuClose}>회원가입</MenuItem>
        <MenuItem onClick={handleMenuClose}>로그인</MenuItem>
        <MenuItem onClick={handleMenuClose}>홈페이지 기여하기</MenuItem>
        <MenuItem onClick={handleMenuClose}>도움말</MenuItem>
      </div>)
      }

    </Menu>
  );
  
  // const newSearchbar = (
  // );

  const basicSearchbar = (
    <Grid item xs={6}>
      <Button
        variant="contained"
        color="primary"
        className={classes.search}
        endIcon={<SearchIcon />}
        style={{ width: "60em" }}
        onClick={handleOpen}
      >
        검색하기
    </Button>

    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {/* 모달 내용 */}
        <Fade in={open}> 
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">react-transition-group animates me.</p>
          </div>
        </Fade>
      </Modal>
    </div>
    </Grid>
  );

  //rendering!!!

  return (
    <div className={classes.grow}>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <Grid item xs={3}>
            <Typography className={classes.title} variant="h6" noWrap>
              물어봐
            </Typography>
          </Grid>
          {basicSearchbar}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {auth &&
              <div className="login">
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton aria-label="show 17 new notifications" color="inherit">
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </div>
            }
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}

export default Header; 