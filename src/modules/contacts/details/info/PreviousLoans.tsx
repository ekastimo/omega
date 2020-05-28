import React from 'react';
import {Theme, Typography} from "@material-ui/core";
import {IContact} from "../../types";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import {useTheme} from "@material-ui/styles";
import ContactListSummary from "../../../loans/list/ContactListSummary";

interface IProps {
    data: IContact
}

const PreviousLoans = ({data}: IProps) => {
    const theme: Theme = useTheme();
    const title = <div style={{display: 'flex', flexDirection: 'row' ,paddingBottom:theme.spacing(1)}}>
        <Typography variant='body2'><b>RECENT LOANS</b></Typography>
    </div>
    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <Box display="flex" >
                    <Box flexGrow={1} pt={1}>
                        {title}
                    </Box>
                </Box>
                <Divider/>
            </Grid>
            <Grid item xs={12}>
                <ContactListSummary contact={data}/>
            </Grid>
        </Grid>
    );
}


export default PreviousLoans;
