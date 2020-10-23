import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

// Import custom components
import Jumbotron from '../Jumbo/Jumbotron';
import CardContent from '../Card/CardContent';
import Photos from '../Photos';
import Introduction from '../Introduction';

const mainFeaturedPost = {
    title: '도움이 필요할 때',
    description:
        "가족과 친구를 사랑하듯이, 자기 자신을 사랑하는 것. 어떤 선택을 하든 그것을 기억하세요.",
    image: 'https://source.unsplash.com/random',
    imgText: 'main image description',
    linkText: '시작하기',
};

const cards = [
    {
        title: '일상에서의 고민',
        description:
            "가족과 친구를 사랑하듯이, 자기 자신을 사랑하는 것. 어떤 선택을 하든 그것을 기억하세요.",
        image: 'https://source.unsplash.com/random/2',
    },
    {
        title: '상담사가 필요한 고민',
        description:
            "가족과 친구를 사랑하듯이, 자기 자신을 사랑하는 것. 어떤 선택을 하든 그것을 기억하세요.",
        image: 'https://source.unsplash.com/random/3',
    },
    {
        title: '챗봇을 이용하기',
        description:
            "가족과 친구를 사랑하듯이, 자기 자신을 사랑하는 것. 어떤 선택을 하든 그것을 기억하세요.",
        image: 'https://source.unsplash.com/random/4',
    },
];


const styles = theme => ({
    cards: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10),
    },
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
    photos: {
        backgroundColor:'white',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(5),
    },
});

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Jumbotron post={mainFeaturedPost} />
                <Introduction title={'물어봐는 어떤 서비스인가요?'}/>
                <Container maxWidth="lg">
                <Grid container className={classes.cards} spacing={4}>
                    {cards.map((post) => (
                        <Grid item xs={12} sm={post.title === '챗봇을 이용하기' ? 12 : 6} md={4} lg={4} >
                            <CardContent key={post.title} title={post.title} description={post.description} image={post.image} />
                        </Grid>
                    ))}
                </Grid>
                </Container>
                <Introduction />
                <div className={classes.photos}>
                    <Photos/>
                </div>      
            </React.Fragment>
        );
    }
}


export default withStyles(styles)(Home);