import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import image from "../../assets/bg2.jpg";
import Box from "@material-ui/core/Box";
import LoanCalculator from "./LoanCalculator";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {IState} from "../../data/types";
import {localRoutes} from "../../data/constants";

function Copyright() {
    return (
        <Typography variant="body2" color="inherit" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Azima Uganda Ltd
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    root: {
        color: 'white'
    },
    heroContent: {
        paddingTop: 200,
        color: 'white',
        fontVariant: '',
        overflowWrap: 'break-word',
        wordWrap: 'break-word',
        font: 'italic bold 12px/30px Georgia, serif',
    },
    loanCalculator: {
        height: 400,
        minWidth: 350,
        backgroundColor: theme.palette.background.paper,
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        //backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    toolbarTitle: {
        flexGrow: 1,
    },
}));


const Home = () => {
    const classes = useStyles();
    const user: any = useSelector((state: IState) => state.core.user)
    const history = useHistory();

    function handleAdminConsole(e: any) {
        e.preventDefault()
        history.push(localRoutes.dashboard)
    }

    function handleLogin(e: any) {
        e.preventDefault()
        history.push(localRoutes.login)
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
                    <CameraIcon className={classes.icon}/>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        Azima Credit Technologies
                    </Typography>
                    <nav>
                        {
                            user &&
                            <Link
                                variant="button"
                                color="inherit" href="#"
                                className={classes.link}
                                onClick={handleAdminConsole}
                            >
                                Admin Console
                            </Link>
                        }

                        <Link
                            variant="button"
                            color="inherit"
                            href="#"
                            className={classes.link}
                            onClick={handleLogin}
                        >
                            Login
                        </Link>
                    </nav>
                </Toolbar>
            </AppBar>
            <main>
                <Grid container>
                    <Grid item md={6} sm={12} className={classes.heroContent}>
                        <Typography component="h1" variant="h2" align="center" color="inherit" gutterBottom>
                            Need extra money?
                        </Typography>
                    </Grid>
                    <Grid container md={6} sm={12}>
                        <Box pt={8}>
                            <LoanCalculator/>
                        </Box>
                    </Grid>
                </Grid>

                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="inherit" gutterBottom>
                            About Us
                        </Typography>
                        <Typography variant="h5" align="center" color="inherit" paragraph>
                            Proactively e-enable inexpensive technologies for interdependent strategic theme areas.
                            Distinctively repurpose team driven initiatives via adaptive communities.
                            Uniquely fashion fully tested alignments without unique infrastructures.
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
            {/* Footer */}
            <footer className={classes.footer}>
                <Typography variant="subtitle1" align="center" color="inherit" component="p">
                    We delight in serving you!
                </Typography>
                <Copyright/>
            </footer>
            {/* End footer */}
        </div>
    );
}


export default Home;
