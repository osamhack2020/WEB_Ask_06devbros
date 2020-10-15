import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    display: 'none',
    [theme.breakpoints.down('sm')]: {
        display:'flex',
      position:'sticky',
      width: '100%',
      bottom: 0,
    },
  },
}));

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="메일" icon={<MailIcon />} />
      <BottomNavigationAction label="알림" icon={<NotificationsIcon />} />
      <BottomNavigationAction label="내 정보" icon={<AccountCircle />} />
    </BottomNavigation>
  );
}