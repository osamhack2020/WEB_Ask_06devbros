import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Toolbar from '@material-ui/core/Toolbar';

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
    return (
        <div>
            <div>
                <CssBaseline />
                <HeadBar />
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