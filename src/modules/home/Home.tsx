import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import image from "../../assets/bg2.jpg";
import logo from "../../assets/Azima-Icon-1.png";
import LoanCalculator from "./LoanCalculator";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../data/types";
import {APP_NAME, APP_NAME_SHORT, localRoutes} from "../../data/constants";
import {isBackOfficeUser} from "../../data/appRoles";
import ApprovalStep from "./ApprovalStep";
import {Profile} from "../../layout/Profile";
import HiddenJs from "@material-ui/core/Hidden/HiddenJs";
import {coreSetHomeStep} from "../../data/redux/coreActions";
import {homeSteps} from "./types";
import {Copyright} from "./Copyright";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    root: {
        color: 'white'
    },
    heroContent: {
        [theme.breakpoints.down('lg')]: {
            paddingTop: theme.spacing(16),
        },
        paddingTop: theme.spacing(20),
        color: 'white',
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    footer: {

        padding: theme.spacing(6),
    },
    link: {
        margin: theme.spacing(1, 1.5),
        cursor: 'pointer'
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    main: {
        [theme.breakpoints.down('lg')]: {
            paddingTop: theme.spacing(8),
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(0),
        },
        paddingTop: theme.spacing(12),
        display: 'flex',
        justifyContent: 'center'
    }
}));


const Home = () => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    const user: any = useSelector((state: AppState) => state.core.user);
    const history = useHistory();
    const dispatch = useDispatch();
    const [amount, setAmount] = React.useState<number>(0);
    const homeState = useSelector((state: AppState) => state.core.home);

    function handleAdminConsole(e: any) {
        e.preventDefault()
        history.push(localRoutes.dashboard)
    }

    function handleGetNow(amount: number) {
        setAmount(amount)
        dispatch(coreSetHomeStep(homeSteps.APPROVE_PAYOUT))
    }

    return (
        <div
            style={{
                backgroundImage: "url(" + image + ")",
                backgroundSize: "cover",
                backgroundPosition: "top center"
            }}
            className={classes.root}
        >
            <CssBaseline/>
            <AppBar position="relative" color='transparent'>
                <Toolbar>
                    <Avatar alt="Logo" src={logo} className={classes.icon}/>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        {isSmall ? APP_NAME_SHORT : APP_NAME}
                    </Typography>
                    <nav>
                        <HiddenJs smDown>
                            {
                                user && isBackOfficeUser(user) &&
                                <Link
                                    variant="button"
                                    color="inherit" href="#"
                                    className={classes.link}
                                    onClick={handleAdminConsole}
                                >
                                    Admin Console
                                </Link>
                            }
                        </HiddenJs>
                        <Profile/>
                    </nav>
                </Toolbar>
            </AppBar>
            <main>
                <Container>
                    <Grid container>
                        <HiddenJs smDown>
                            <Grid item md={6} lg={5} sm={12} className={classes.heroContent}>
                                <Typography component="div" variant="h1" align="center" color="inherit" gutterBottom>
                                    Need<br/> extra<br/> money?
                                </Typography>
                            </Grid>
                        </HiddenJs>
                        <Grid item md={6} lg={7} sm={12} xs={12}>
                            <div className={classes.main}>
                                {
                                    homeState.step === homeSteps.APPROVE_PAYOUT
                                        ? <ApprovalStep amount={amount}/>
                                        : <LoanCalculator onApply={handleGetNow}/>
                                }
                            </div>
                        </Grid>
                    </Grid>
                </Container>

                <div className={classes.heroContent}>
                    <Container maxWidth="md">
                        <Typography component="h1" variant="h2" align="center" color="inherit" gutterBottom>
                            About Us
                        </Typography>
                        <Typography variant="h5" align="center" color="inherit" paragraph>
                            A technology led company with a suite of digital products that remove barriers to provide
                            access to quick, timely and affordable credit.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="outlined" color="inherit">
                                        more ...
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
            </main>
            <footer className={classes.footer}>
                <Typography variant="subtitle1" align="center" color="inherit" component="p">
                    We delight in serving you.
                </Typography>
                <Copyright/>
            </footer>
        </div>
    );
}


export default Home;
