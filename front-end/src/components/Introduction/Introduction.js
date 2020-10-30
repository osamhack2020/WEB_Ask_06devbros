import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../Typography/Typography';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import AddIcCallIcon from '@material-ui/icons/AddIcCall';

const styles = (theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#fff5f8',
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(14),
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
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
    opacity: 0.7,
  },
  button: {
    marginTop: theme.spacing(8),
  },
});

function Introduction(props) {
  const { classes, content } = props;


  return (
    
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src="https://github.com/tzachshabtay/GloriaGables/blob/master/public/static/themes/onepirate/productCurvyLines.png?raw=true"
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Typography variant="h4" marked="center" className={classes.title} component="h2">
          {props.title}
        </Typography>
        <div>
          <Grid container spacing={5}>

            { content === "intro"
              ? (
                <React.Fragment>
                  <Grid item xs={12} md={4}>
                    <div className={classes.item}>
                      <div className={classes.number}>1.</div>
                      <Brightness2Icon className={classes.image}/>
                      <Typography variant="h6" align="center">
                        '물어봐'는 비대면 상담 서비스이므로 24시간 언제든지 고민 상담을 할 수 있어요.
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <div className={classes.item}>
                      <div className={classes.number}>2.</div>
                      <AccessibilityNewIcon className={classes.image}/>
                      <Typography variant="h6" align="center">
                        심각한 고민은 아닌데 상담사에게 상담하기 꺼려지나요? 같은 병사들에게 질문해보는건 어떤가요?
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <div className={classes.item}>
                      <div className={classes.number}>3.</div>
                      <AddIcCallIcon className={classes.image}/>
                      <Typography variant="h6" align="center">
                        상담사와 바로 상담할 수 없으면 챗봇으로 먼저 상담해보세요.
                      </Typography>
                    </div>
                  </Grid>
                </React.Fragment>
              )
              :(
                <React.Fragment>
                  <Grid item xs={12}>
                  <Typography variant="h6" align="center">
                    '물어봐'는 AI 기반의 실시간 상담 챗봇을 웹페이지에서 구현하여 챗봇의 판단에 따라 전문상담관과의 연결 기능을 제공합니다. 
                    또한, 상담만으로는 해결할 수 없는 다양한 고민 사항을 공유하고 해결할 수 있도록 질문 게시판을 마련하였습니다. 
                    AI기반의 악플 검열 기능도 추가하여 유해한 답변은 자동으로 배제됩니다. 
                    본 서비스를 통해 코로나 블루를 겪거나 군생활의 다양한 고충을 가진 장병들이 상담으로 심리적 우울감과 고민을 해소하여 정신적으로 건강하고 슬기로운 군생활을 보낼 수 있습니다.
                  </Typography>
                  </Grid>
                </React.Fragment>
              )
            }
          </Grid>
        </div>
      </Container>
    </section>
  );
}

Introduction.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Introduction);