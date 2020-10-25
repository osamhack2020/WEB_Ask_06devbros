import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../Typography/Typography';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import AddIcCallIcon from '@material-ui/icons/AddIcCall';

const introductionAry = [
    {
        id: 1,
        title: '24시간 고민 상담 가능',
        image: '',
        description:
            "물어봐는 고민 게시판으로 고민을 털어놓을 수 있고 챗봇을 통해 언제든지 상담이 가능해요.",
    },
    {
        id: 2,
        title: '병사 간의 고민 상담 가능',
        image: '',
        description:
            "고민 게시판을 이용해서 눈높이 맞춤 상담을 해보는건 어떤가요?",
    },
    {
        id: 3,
        title: '챗봇으로 상담 이용하기',
        image: '',
        description:
            "직접적으로 전문가와 상담하기가 어렵다면 챗봇을 통해 상담을 해보세요.",
    },
  ]

const styles = (theme) => ({
    item: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(0, 5),
    },
    number: {
      fontSize: 36,
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.secondary.main,
      fontWeight: theme.typography.fontWeightMedium,
    },
    image: {
      width:64,
      height:64,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
  });

function IntroContent(props) {

    return(
        <Grid container spacing={5}>
        <Grid item xs={12} md={4}>
          <div className={classes.item}>
            <div className={classes.number}>1.</div>
            <Brightness2Icon className={classes.image}/>
            <Typography variant="h5" align="center">
                물어봐는 고민 게시판으로 고민을 털어놓을 수 있고 챗봇을 통해 언제든지 상담이 가능해요.
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className={classes.item}>
            <div className={classes.number}>2.</div>
            <AccessibilityNewIcon className={classes.image}/>
            <Typography variant="h5" align="center">
                고민 게시판을 이용해서 눈높이 맞춤 상담을 해보는건 어떤가요?"
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className={classes.item}>
            <div className={classes.number}>3.</div>
            <AddIcCallIcon className={classes.image}/>
            <Typography variant="h5" align="center">
                직접적으로 전문가와 상담하기가 어렵다면 챗봇을 통해 상담을 해보세요.
            </Typography>
          </div>
        </Grid>
      </Grid>
    );
}

export default withStyles(styles)(IntroContent);