import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Typography from './Typography/Typography';

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
  images: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '40vh',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15,
    },
    '&:hover $imageMarked': {
      opacity: 0,
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor',
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

function ProductCategories(props) {
  const { classes } = props;

  const images = [
    {
      url:
        'https://snaptime.edaily.co.kr/wp-content/uploads/2019/07/twi001t1923994-700x467.jpg',
      title: '이등병의 고민',
      width: '40%',
    },
    {
      url:
        'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2163C94156A07D4931',
      title: '군 생활의 적응',
      width: '30%',
    },
    {
      url:
        'data:image/jpeg;base64,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',
      title: '가족의 문제',
      width: '30%',
    },
    {
      url:
        'https://lh3.googleusercontent.com/proxy/qz3xnclRMcxh-vJaZxXK1xlqh_mnSplM9m8dJIKn06tIX0JP6lwd2za2bEsDB3VLv9GMFys-G86-KVZKRp83UzrI4DJh4mKQsUg7UwuGKlCjSxUvlClWSQdKEwanjScQW02sWu4KlyUSEIB3MU1Kj7RiGzMSCF_4SVtp9By5LY1hJi0pJLsGVgVmll25kz9ThINsIbIpHmMUrwlwsQeNxFH6yeZFuYjeuzNN0rfhFAhe06T6gbuw4k1Cm6hhH0fT1eEzlCITTazJlpU5DliGQuOw8CfImk2VNjnmM97ZnCUsEjn1iCYv5HbDbv9cDLPWSLDdfDLQ3W0Fb74HarKWj0o60zDt69oASoFwKdIFPw42cDgPdCXsR1ZKvLi6DjrsaDs9dsEO-UWZA-aS8ZKhG-HwAJZKV7xWUBuQEtI70OroPrxp0rlnOL36vA5uv3Ehi6IfWFZC6CPtGMkbUaJD1qBts44pAQzrqFs57vheTBayP1-swmjj8RgdUi6r0bCLaElfVCm5R-GlOU4Fxk1rm_G9ZlEON4M6cLeWYME7Pz2SCVtZzH8WsaaYEuj9JCSFyuzCFr1AMc-cfZX29ffLlxglvnHgJFgi79m_MjpY7U2y7Jjr',
      title: '여자친구와의 관계',
      width: '38%',
    },
    {
      url:
        'https://img.hani.co.kr/imgdb/resize/2017/1226/00501977_20171226.JPG',
      title: '선후임과의 관계',
      width: '38%',
    },
    {
      url:
        'https://kookbang.dema.mil.kr/newspaper/tmplat/upload/20170202/thumb1/YA_PG_20170202_01000036400000414.jpg',
      title: '간부와의 마찰',
      width: '24%',
    },
    
  ];

  return (
    <Container className={classes.root} component="section">
      <Typography variant="h4" marked="center" align="center" component="h2" style={{color:'black'}}>
        다양한 고민들
      </Typography>
      <div className={classes.images}>
        {images.map((image) => (
          <ButtonBase
            key={image.title}
            className={classes.imageWrapper}
            style={{
              width: image.width,
            }}
          >
            <div
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <div className={classes.imageBackdrop} />
            <div className={classes.imageButton}>
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <div className={classes.imageMarked} />
              </Typography>
            </div>
          </ButtonBase>
        ))}
      </div>
    </Container>
  );
}

ProductCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCategories);