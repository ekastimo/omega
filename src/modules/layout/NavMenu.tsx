import React from 'react';
import Divider from '@material-ui/core/Divider';
import azLogo from "../../assets/logo.png";
import lugLogo from "../../assets/download.png";
import {navColor} from "./styles";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import NavList from "./NavList";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
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
                <Box>
                    <Typography
                        variant='h2'
                        style={{color: 'white',fontWeight:'bolder'}}
                    >ioTec</Typography>
                </Box>
            </Grid>
            <Divider/>
            <NavList/>
        </div>
    );
}


export default NavMenu;
