import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from './Typography/Typography';
import Brightness2Icon from '@material-ui/icons/Brightness2';

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

const introductionAry = [
  {
      id: 1,
      title: '고민이 있으신가요?',
      image: '',
      description:
          "누군가의 조언이 필요할 때 이용해보세요.",
  },
  {
      id: 2,
      title: '말 못할 고민이 있으신가요?',
      image: '',
      description:
          "가족과 친구를 사랑하듯이, 자기 자신을 사랑하는 것. 어떤 선택을 하든 그것을 기억하세요.",
  },
  {
      id: 3,
      title: '챗봇',
      image: '',
      description:
          "가족과 친구를 사랑하듯이, 자기 자신을 사랑하는 것. 어떤 선택을 하든 그것을 기억하세요.",
  },
]

const ary = [
  {
      id: 1,
      title: '고민이 있으신가요?',
      image: '',
      description:
          "누군가의 조언이 필요할 때 이용해보세요.",
  },
  {
      id: 2,
      title: '말 못할 고민이 있으신가요?',
      image: '',
      description:
          "가족과 친구를 사랑하듯이, 자기 자신을 사랑하는 것. 어떤 선택을 하든 그것을 기억하세요.",
  },
  {
      id: 3,
      title: '챗봇',
      image: '',
      description:
          "가족과 친구를 사랑하듯이, 자기 자신을 사랑하는 것. 어떤 선택을 하든 그것을 기억하세요.",
  },
]

function Introduction(props) {
  const { classes } = props;


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

            {ary.map((post) =>
               (
                <Grid item xs={12} md={4}>
                  <div className={classes.item}>
                    <div className={classes.number}>{post.id}</div>
                    <Brightness2Icon className={classes.image} />
                    <Typography variant="h5" align="center">
                      {post.description}
                  </Typography>
                  </div>
                </Grid>
              )
            )}
            
            {/* <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>1.</div>
                <Brightness2Icon className={classes.image}/>
                <Typography variant="h5" align="center">
                가족과 친구를 사랑하듯이, 자기 자신을 사랑하는 것. 어떤 선택을 하든 그것을 기억하세요.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>2.</div>
                <AccessibilityNewIcon className={classes.image}/>
                <Typography variant="h5" align="center">
                가족과 친구를 사랑하듯이, 자기 자신을 사랑하는 것. 어떤 선택을 하든 그것을 기억하세요.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>3.</div>
                <AddIcCallIcon className={classes.image}/>
                <Typography variant="h5" align="center">
                가족과 친구를 사랑하듯이, 자기 자신을 사랑하는 것. 어떤 선택을 하든 그것을 기억하세요.
                </Typography>
              </div>
            </Grid> */}
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