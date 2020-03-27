import {Grid} from "@material-ui/core";
import Identifications from "./Identifications";
import Emails from "./Emails";
import Phones from "./Phones";
import Addresses from "./Addresses";
import Tags from "./Tags";
import React from "react";
import {IContact} from "../../types";
import Basicdata from "./Basicdata";
import Divider from "@material-ui/core/Divider";
import AdminData from "./AdminData";
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
        <Grid container spacing={3}>
            <Grid item xs={12} lg={3} md={4} sm={6}>
                <Grid container spacing={spacing}>
                    <Grid item xs={12}>
                        <Basicdata data={data}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} lg={9} >
                <Grid container spacing={spacing}>
                    <Grid item xs={4} >
                        <Phones data={data}/>
                    </Grid>
                    <Grid item xs={4} >
                        <Addresses data={data}/>
                    </Grid>
                    <Grid item xs={4} >
                        <Identifications data={data}/>
                    </Grid>
                </Grid>
                <Grid container spacing={spacing}>
                    <Grid item xs={4} >
                        <Emails data={data}/>
                    </Grid>
                    <Grid item xs={4} >
                        <Urls data={data}/>
                    </Grid>
                    <Grid item xs={4} >
                        <Tags data={data}/>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} >
                <Box pb={0}>
                    <Divider/>
                </Box>

                <Grid container spacing={spacing}>
                    <Grid item xs={12} sm={4} >
                        <AdminData data={data}/>
                    </Grid>
                    <Grid item xs={12} sm={8} >
                        <BankAccounts data={data}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} >
                <Box >
                    <Divider/>
                </Box>
                <Grid container spacing={spacing}>
                    <Grid item xs={12} sm={4} >
                        <MiniGraph data={data}/>
                    </Grid>
                    <Grid item xs={12} sm={8} >
                        <PreviousLoans data={data}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Info;
