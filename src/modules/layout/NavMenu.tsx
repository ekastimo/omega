import React from 'react';
import Divider from '@material-ui/core/Divider';
import azLogo from "../../assets/logo-azima2.png";
import lugLogo from "../../assets/download.png";
import {navColor} from "./styles";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import NavList from "./NavList";
//import {isDebug} from "../../data/constants";
const isDebug = false
const appLogo = isDebug ? lugLogo : azLogo;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        logoHolder: {
            height: 140
        },
        logo: isDebug ? {
            height: 45,
            width: 'auto',
        } : {
            height: "100%",
            width: '100%'
        },
        whiteText: {
            color: 'white'
        },
        menuItem: {
            "&:hover": {
                backgroundColor: theme.palette.primary.dark,
            }
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }),
);

const NavMenu = () => {
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
        </div>
    );
}


export default NavMenu;
