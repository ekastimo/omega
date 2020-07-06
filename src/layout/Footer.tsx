import React from 'react';
import {useStyles} from "./styles";
import {Copyright} from "./Copyright";
import {Box} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";

const Footer = () => {
    const classes = useStyles();
    return (
        <Paper className={classes.footer}>
            <Divider/>
            <Box p={1} display='flex' justifyContent='center' width='100%'>
                <Copyright/>
            </Box>
        </Paper>

    );
}


export default Footer;
