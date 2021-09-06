import Bigcard from '../components/Bigcard';
import Bigcard2 from '../components/Bigcard2';
import Bigcard3 from '../components/Bigcard3';
import Bigcard4 from '../components/Bigcard4';
import Bigcard5 from '../components/Bigcard5';
import Alert1 from '../components/Alert1';
import {makeStyles} from "@material-ui/core/styles";
import { useMediaQuery } from 'react-responsive'
import networkBg from "../components/networkbg.jpg";

const useStyles = makeStyles(() => ({
    // /!\ CLASSES OBLIGATOIRES /!\
    container : {
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        maxWidth: "1200px",
        marginBottom: "40px",
    },
    main: {
        background: `url( ${networkBg} )`,
        height: "100%"
    },
    filterBox: {
        marginBottom: "50px"
    },
    pageTitle: {
        lineHeight: 1.2,
        textTransform: 'uppercase',
        font: 'large inherit',
        fontWeight: 400,
        fontSize: '3em',
        color: '#242e73',
        paddingLeft: 10,
        paddingRight: 10,
    },
    // >> FIN DES CLASSES OBLIGATOIRES

    isDesktop : {
        display:"grid",
        gridTemplateColumns: "2fr 1fr",
        justifyContent: "space-evenly",
        gridTemplateAreas: "2 1",
    },
    isSmallDevice : {
        display:"flex",
        flexDirection: "column-reverse",
    },
    report : {
        display: "flex",
        flexDirection: "column",
        gridColumn: "2",
    },
    cards : {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
    },
}));

export default function HomePage() {

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 993px)'
    });
    const isTabletOrMobileDevice = useMediaQuery({
        query: '(max-device-width: 992px)'
    })
    const classes = useStyles();
    return (
        <div className={classes.main}>
            <div className={classes.container}>
                {isTabletOrMobileDevice &&
                <div>
                    <h1 className={classes.pageTitle}>Tableau de bord</h1>
                    <div className={classes.isSmallDevice}>
                        <div className={classes.cards}>
                            <Bigcard />
                            <Bigcard2 />
                            <Bigcard3 />
                            <Bigcard4 />
                            <Bigcard5 />
                        </div>
                        <div className={classes.report}>
                            <Alert1 />
                        </div>
                    </div>
                </div>
                }

                {isDesktopOrLaptop &&
                <div>
                    <h1 className={classes.pageTitle}>Tableau de bord</h1>
                    <div className={classes.isDesktop}>
                        <div className={classes.cards}>
                            <Bigcard />
                            <Bigcard2 />
                            <Bigcard3 />
                            <Bigcard4 />
                            <Bigcard5 />
                        </div>
                        <div className={classes.report}>
                            <Alert1 />
                        </div>

                    </div>
                </div>
                }
            </div>
        </div>
    )
}
