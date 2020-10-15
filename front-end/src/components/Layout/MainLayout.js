import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Toolbar from '@material-ui/core/Toolbar';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// Import custom components
import Footer from '../Footer/Footer';
import BottomNav from '../Footer/BottomNav';
import HeadBar from '../Header/HeadBar';
import ScrollTop from '../ScrollTop';

const styles = (theme) => ({
    content: {
      width: '100%',
      flexGrow: 1,
      padding: 24,
      height: 'calc(100% - 56px)',
      marginTop: 28,
      [theme.breakpoints.up('sm')]: {
        height: 'calc(100% - 64px)',
        marginTop: 32,
      },
    },
  });



const MainLayout = (props) => {
    const { classes, children } = props;
    const [auth, setAuth] = React.useState(true);  //로그인 체크

    const handleChange = (event) => {
      setAuth(event.target.checked);
    };

    return (
        <div>
            <div>
                <CssBaseline />
                <HeadBar isLogin={auth}>
                    <FormControlLabel
                        control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
                        label={auth ? 'Logout' : 'Login'}
                    />
                </HeadBar>
                {/* <main className={classes.content}>{children}</main> */}
                <Toolbar id="back-to-top-anchor" />
                <main>{children}</main>
            </div>
            <Footer />
            <BottomNav/>
            <ScrollTop {...props}>
                    <Fab color="primary" size="small" aria-label="scroll back to top">
                        <KeyboardArrowUpIcon />
                    </Fab>
            </ScrollTop>
        </div>
    );
};

MainLayout.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.element,
};

export default withStyles(styles)(MainLayout);