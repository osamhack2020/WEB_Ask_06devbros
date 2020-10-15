import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Profile from './Profile';

// http://localhost:3000
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'block',
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

function HeadBar(props) {
  //constants
  const classes = useStyles();
  // const colors = color();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [auth, setAuth] = React.useState(true);  //로그인 체크
  const [open, setOpen] = React.useState(false);

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

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const menuId = 'primary-search-account-menu';

  const basicSearchbar = (
    <Grid item xs={6}>
      <Button
        variant="contained"
        color="primary"
        className={classes.search}
        endIcon={<SearchIcon />}
        style={{ width: "100%" }}
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
      <AppBar>
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
          <FormControlLabel
          control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        />
        </Toolbar>
      </AppBar>
      <Profile />
    </div>
  );
}

export default HeadBar; 