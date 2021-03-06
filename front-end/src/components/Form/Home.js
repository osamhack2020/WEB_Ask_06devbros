import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

// Import custom components
import Jumbotron from '../Jumbo/Jumbotron';
import CardContent from '../Card/CardContent';
import Photos from '../Photos';
import Introduction from '../Introduction/Introduction';

const mainFeaturedPost = {
    title: '도움이 필요할 때',
    description:
        "가족과 친구를 사랑하듯이, 자기 자신을 사랑하는 것. 어떤 선택을 하든 그것을 기억하세요.",
    image: 'https://pbs.twimg.com/media/CDCAmxwXIAAWnmD.jpg',
    imgText: 'main image description',
    linkText: '시작하기',
};

const cards = [
    {
        title: '간단한 고민',
        description:
            "심각한 고민은 아닌데 상담사에게 상담하기 꺼려지나요? 같은 병사들에게 질문해보는건 어떤가요?",
        image: 'https://pds.joins.com//news/component/htmlphoto_mmdata/201807/16/8e9c1dbf-3427-4185-9362-92c6eca3476e.jpg',
        link: '/posts',
    },
    {
        title: '상담사가 필요한 고민',
        description:
            "간단한 고민은 아니신가요? 상담사의 조언이 필요할 때 이용해보세요.",
        image: 'https://news.hmgjournal.com/images_n/contents/cons/1907/190718_soldier_01.jpg',
        link: '/posts',
    },
    {
        title: '챗봇을 이용하기',
        description:
            "상담사와 바로 상담할 수 없으면 챗봇으로 먼저 상담해보세요.",
        image: 'https://pds.joins.com/news/component/htmlphoto_mmdata/201706/01/0735e00f-7435-4baf-b459-84ae44348d17.jpg',
        link: '/chat/socket.io',
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
                <Introduction title={'물어봐는 어떤 서비스인가요?'} content={'null'}/>
                <Container maxWidth="lg">
                <Grid container className={classes.cards} spacing={4}>
                    {cards.map((post) => (
                        <Grid item xs={12} sm={post.title === '챗봇을 이용하기' ? 12 : 6} md={4} lg={4} >
                            <CardContent key={post.title} title={post.title} description={post.description} image={post.image} link={post.link}/>
                        </Grid>
                    ))}
                </Grid>
                </Container>
                <Introduction content={'intro'}/>
                <div className={classes.photos}>
                    <Photos/>
                </div>      
            </React.Fragment>
        );
    }
}


export default withStyles(styles)(Home);