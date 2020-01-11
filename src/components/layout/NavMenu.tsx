import React from 'react';
import Divider from '@material-ui/core/Divider';
import AppsIcon from '@material-ui/icons/Apps';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import {localRoutes} from "../../data/constants";
import appLogo from "../../assets/download.png";
import {navColor} from "./styles";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import grey from '@material-ui/core/colors/grey';
import NavList from "./NavList";
import Navigator from "./Navigator";

const menBackgroundColor = grey[800]
const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        logoHolder: {
            height: 140
        },
        logo: {
            [theme.breakpoints.only('xs')]: {
                height: 40,
                width: 'auto',
            },
            height: 40,
            width: 'auto',
        },
        whiteText: {
            color: 'white'
        },
        menuItem: {
            "&:hover": {
                backgroundColor: menBackgroundColor,
            }
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }),
);

const NavMenu = (props: any) => {
    const classes = useStyles();
    return (
        <div style={{backgroundColor: navColor}}>
            <Grid className={classes.logoHolder}
                  container
                  spacing={0}
                  alignContent='center'
                  justify='center'>
                <img src={appLogo} alt="logo" className={classes.logo}/>
            </Grid>
            <Divider/>
            <NavList/>
            {/*<Navigator/>*/}
        </div>
    );
}


export default NavMenu;
