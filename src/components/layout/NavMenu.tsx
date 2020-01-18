import React from 'react';
import Divider from '@material-ui/core/Divider';
import appLogo from "../../assets/logo-azima2.png";
import {navColor} from "./styles";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import NavList from "./NavList";

const menBackgroundColor = "#194657"
const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        logoHolder: {
            height: 140
        },
        logo: {

            height: "100%",
            width: '100%',
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
