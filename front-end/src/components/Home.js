import React from 'react';
// Import custom components
import Jumbotron from './Jumbotron';
import CardContent from './CardContent';
import Test from './Photos';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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
});

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Jumbotron post={mainFeaturedPost} />
                <Grid container className={classes.cards} spacing={4}>
                    {cards.map((post) => (
                        <Grid item xs={12} sm={post.title === '챗봇을 이용하기' ? 12 : 6} md={4} lg={4} >
                            <CardContent key={post.title} title={post.title} description={post.description} image={post.image} />
                        </Grid>
                    ))}
                </Grid>
                <Test></Test>

                <p>탄핵소추의 의결을 받은 자는 탄핵심판이 있을 때까지 그 권한행사가 정지된다. 정기회의 회기는 100일을, 임시회의 회기는 30일을 초과할 수 없다. 군사법원의 조직·권한 및 재판관의 자격은 법률로 정한다. 국가는 농수산물의 수급균형과 유통구조의 개선에 노력하여 가격안정을 도모함으로써 농·어민의 이익을 보호한다. 정당은 그 목적·조직과 활동이 민주적이어야 하며, 국민의 정치적 의사형성에 참여하는데 필요한 조직을 가져야 한다. 재판의 심리와 판결은 공개한다. 다만, 심리는 국가의 안전보장 또는 안녕질서를 방해하거나 선량한 풍속을 해할 염려가 있을 때에는 법원의 결정으로 공개하지 아니할 수 있다.</p>

                <p>제1항의 해임건의는 국회재적의원 3분의 1 이상의 발의에 의하여 국회재적의원 과반수의 찬성이 있어야 한다. 국가는 주택개발정책등을 통하여 모든 국민이 쾌적한 주거생활을 할 수 있도록 노력하여야 한다. 계엄을 선포한 때에는 대통령은 지체없이 국회에 통고하여야 한다. 대통령이 궐위되거나 사고로 인하여 직무를 수행할 수 없을 때에는 국무총리, 법률이 정한 국무위원의 순서로 그 권한을 대행한다. 모든 국민은 법률이 정하는 바에 의하여 선거권을 가진다. 대통령이 제1항의 기간내에 공포나 재의의 요구를 하지 아니한 때에도 그 법률안은 법률로서 확정된다. 모든 국민은 언론·출판의 자유와 집회·결사의 자유를 가진다.</p>

                <p>국가원로자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다. 공무원인 근로자는 법률이 정하는 자에 한하여 단결권·단체교섭권 및 단체행동권을 가진다. 대통령의 선거에 관한 사항은 법률로 정한다. 교육의 자주성·전문성·정치적 중립성 및 대학의 자율성은 법률이 정하는 바에 의하여 보장된다. 국회의원은 현행범인인 경우를 제외하고는 회기중 국회의 동의없이 체포 또는 구금되지 아니한다. 감사위원은 원장의 제청으로 대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다. 저작자·발명가·과학기술자와 예술가의 권리는 법률로써 보호한다. 대법관의 임기는 6년으로 하며, 법률이 정하는 바에 의하여 연임할 수 있다.</p>

                <p>국가유공자·상이군경 및 전몰군경의 유가족은 법률이 정하는 바에 의하여 우선적으로 근로의 기회를 부여받는다. 이 헌법중 공무원의 임기 또는 중임제한에 관한 규정은 이 헌법에 의하여 그 공무원이 최초로 선출 또는 임명된 때로부터 적용한다. 국회에 제출된 법률안 기타의 의안은 회기중에 의결되지 못한 이유로 폐기되지 아니한다. 다만, 국회의원의 임기가 만료된 때에는 그러하지 아니하다. 군인은 현역을 면한 후가 아니면 국무위원으로 임명될 수 없다. 헌법개정안이 제2항의 찬성을 얻은 때에는 헌법개정은 확정되며, 대통령은 즉시 이를 공포하여야 한다. 농업생산성의 제고와 농지의 합리적인 이용을 위하거나 불가피한 사정으로 발생하는 농지의 임대차와 위탁경영은 법률이 정하는 바에 의하여 인정된다.</p>

                <p>대법원에 대법관을 둔다. 다만, 법률이 정하는 바에 의하여 대법관이 아닌 법관을 둘 수 있다. 국가는 국민 모두의 생산 및 생활의 기반이 되는 국토의 효율적이고 균형있는 이용·개발과 보전을 위하여 법률이 정하는 바에 의하여 그에 관한 필요한 제한과 의무를 과할 수 있다. 형사피해자는 법률이 정하는 바에 의하여 당해 사건의 재판절차에서 진술할 수 있다. 국가는 균형있는 국민경제의 성장 및 안정과 적정한 소득의 분배를 유지하고, 시장의 지배와 경제력의 남용을 방지하며, 경제주체간의 조화를 통한 경제의 민주화를 위하여 경제에 관한 규제와 조정을 할 수 있다. 정당의 설립은 자유이며, 복수정당제는 보장된다.</p>

            </React.Fragment>
        );
    }
}


export default withStyles(styles)(Home);