import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

const styles = () => ({
    legal: {
        backgroundColor: '#f7f7f7',
        position: 'static',
        bottom: 0,
        width: '97.6%',
        borderTop: '1px solid #eee',
        padding: '15px',
        overflow: 'hidden',
        textAlign: 'center',
    },
    container: {
        marginBottom: '0.5%',
        marginTop:'1%',
    },
    copyright: {
        marginTop:'1%',
        fontSize:'16px'
    }
});
const Footer = (props) => {
    const { classes } = props;

    return (
        <div className={classes.legal}>
            <Grid container className={classes.container} spacing={2}>

                <Grid item xs={3}>
                    <Link href="#" color="inherit">
                        <strong>소개</strong>
                </Link>
                </Grid>
                <Grid item xs={3}>
                    <Link href="#" color="inherit">
                    <strong>커뮤니티</strong>
                </Link>
                </Grid>
                <Grid item xs={3}>
                    <Link href="#" color="inherit">
                    <strong>고민 답변하기</strong>
                </Link>
                </Grid>
                <Grid item xs={3}>
                    <Link href="#" color="inherit">
                    <strong>고객센터</strong>
                </Link>
                </Grid>
            </Grid>
            <Divider variant="middle" />
            <div className={classes.copyright}>
                © 2020 물어봐, Inc. All rights reserved <Link href="https://github.com/osamhack2020/WEB_Ask_06devbros" color="inherit">06devbros</Link>
            </div>
        </div>
    );
};

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
