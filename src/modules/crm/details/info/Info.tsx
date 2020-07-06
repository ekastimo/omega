import {Grid} from "@material-ui/core";
import Identifications from "../identifications/Identifications";
import Emails from "../emails/Emails";
import Phones from "../phones/Phones";
import Addresses from "../addresses/Addresses";
import Tags from "../tags/Tags";
import React from "react";
import {ContactCategory, IContact} from "../../types";
import PersonView from "../person/PersonView";
import Divider from "@material-ui/core/Divider";
import AdminData from "../admin/AdminData";
import BankAccounts from "../bank-accounts/BankAccounts";
import MiniGraph from "./MiniGraph";
import PreviousLoans from "./PreviousLoans";
import Urls from "../urls/Urls";
import Box from "@material-ui/core/Box";
import CompanyView from "../company/CompanyView";

interface IProps {
    data: IContact
}

const Info = ({data}: IProps) => {
    const spacing = 5
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={3} md={4} sm={6}>
                <Grid container spacing={spacing}>
                    <Grid item xs={12}>
                        {
                            data.category === ContactCategory.Person ?
                                <PersonView data={data}/> :
                                <CompanyView data={data}/>
                        }
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} lg={9}>
                <Grid container spacing={spacing}>
                    <Grid item xs={12} md={4}>
                        <Phones data={data}/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Addresses data={data}/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Identifications data={data}/>
                    </Grid>
                </Grid>
                <Grid container spacing={spacing}>
                    <Grid item xs={12} md={4}>
                        <Emails data={data}/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Urls data={data}/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Tags data={data}/>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Box pb={0}>
                    <Divider/>
                </Box>

                <Grid container spacing={spacing}>
                    <Grid item xs={12} sm={4}>
                        <AdminData data={data}/>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <BankAccounts data={data}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Box>
                    <Divider/>
                </Box>
                <Grid container spacing={spacing}>
                    <Grid item xs={12} sm={4}>
                        <MiniGraph data={data}/>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <PreviousLoans data={data}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Info;
