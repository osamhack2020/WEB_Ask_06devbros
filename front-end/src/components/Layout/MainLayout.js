import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

// Import custom components
import Footer from '../Footer/Footer';
import HeadBar from '../Header/HeadBar';
import { Container } from '@material-ui/core';

// 맨위로 올라가는 스크롤 버튼 함수

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

function ScrollTop(props) {
    const { children, window } = props;
    const classes = useStyles();
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.root}>
                {children}
            </div>
        </Zoom>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

// 맨위로 올라가는 스크롤 버튼 함수


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
                <Container maxWidth="xl">
                <main className={classes.content}>{children}</main>
                </Container>
                <ScrollTop {...props}>
                    <Fab color="primary" size="small" aria-label="scroll back to top">
                        <KeyboardArrowUpIcon />
                    </Fab>
                </ScrollTop>
            </div>
            <Footer />
        </div>
    );
};

MainLayout.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.element,
};

export default withStyles(styles)(MainLayout);