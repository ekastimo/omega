import {Grid} from "@material-ui/core";
import Identifications from "./Identifications";
import Emails from "./Emails";
import Phones from "./Phones";
import Addresses from "./Addresses";
import React from "react";
import {IContact} from "../../types";
import BioData from "./Biodata";
import Divider from "@material-ui/core/Divider";

interface IProps {
    data: IContact
}

const Info = ({data}: IProps) => {
    const spacing= 4
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
                <Grid container spacing={3}>
                    <Grid item xs={12} >
                        <Addresses data={data}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} >
                <Divider/>
            </Grid>
        </Grid>
    );
}

export default Info;
