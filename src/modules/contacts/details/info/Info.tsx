import {Grid} from "@material-ui/core";
import Identifications from "./Identifications";
import Emails from "./Emails";
import Phones from "./Phones";
import Addresses from "./Addresses";
import Tags from "./Tags";
import React from "react";
import {IContact} from "../../types";
import BioData from "./Biodata";
import Divider from "@material-ui/core/Divider";
import FinancialData from "./FinancialData";
import BankAccounts from "./BankAccounts";
import MiniGraph from "./MiniGraph";
import PreviousLoans from "./PreviousLoans";
import Urls from "./Urls";
import Box from "@material-ui/core/Box";

interface IProps {
    data: IContact
}

const Info = ({data}: IProps) => {
    const spacing= 5
    return (
        <Grid container spacing={spacing}>
            <Grid item xs={12} lg={3} md={4} sm={6}>
                <Grid container spacing={spacing}>
                    <Grid item xs={12}>
                        <BioData data={data}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Identifications data={data}/>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} lg={3} md={4} sm={6}>
                <Grid container spacing={spacing}>
                    <Grid item xs={12} >
                        <Phones data={data}/>
                    </Grid>
                    <Grid item xs={12} >
                        <Emails data={data}/>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} lg={3} md={4} sm={6}>
                <Grid container spacing={spacing}>
                    <Grid item xs={12} >
                        <Addresses data={data}/>
                    </Grid>
                    <Grid item xs={12} >
                        <Urls data={data}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} lg={3} md={4} sm={6}>
                <Grid container spacing={spacing}>
                    <Grid item xs={12} >
                        <Tags data={data}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} >
                <Box pb={2}>
                    <Divider/>
                </Box>

                <Grid container spacing={spacing}>
                    <Grid item xs={12} sm={6} >
                        <FinancialData data={data}/>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <BankAccounts data={data}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} >
                <Box pb={2}>
                    <Divider/>
                </Box>
                <Grid container spacing={spacing}>
                    <Grid item xs={12} sm={6} >
                        <MiniGraph data={data}/>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <PreviousLoans data={data}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Info;
