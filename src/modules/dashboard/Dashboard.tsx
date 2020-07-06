import React from 'react';

import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {useSelector} from "react-redux";

import Widget from "./Widget";
import Box from "@material-ui/core/Box";
import Money from '@material-ui/icons/Money';
import Info from '@material-ui/icons/Info';
import People from '@material-ui/icons/People';
import {printInteger} from "../../utils/numberHelpers";
import UsersByDevice from "./UsersByDevice";
import {AppState} from "../../data/types";
import Layout from "../../layout/Layout";

const data = [
    {
        title: "Total Policies",
        value: printInteger(93431),
        percentage: -2,
        icon: Money
    },
    {
        title: "Total Claims",
        value: printInteger(2567),
        percentage: 4,
        icon: Info
    },
    {
        title: "Financed Claims",
        value: 256,
        percentage: 1,
        icon: People
    },
    {
        title: "Pending Claims",
        value: 45,
        percentage: 2,
        icon: People
    }
]

export default function SimpleSelect() {
    const user = useSelector((state: AppState) => state.core.user)

    return (
        <Layout>
            <Box p={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='overline' component='div'>Dashboard</Typography>
                        <Typography variant='caption' component='div'>Hello {user?.fullName}, Here's what's
                            happening</Typography>
                    </Grid>
                    {
                        data.map(it => <Grid item xs={12} sm={6} md={4} lg={3} key={it.title}>
                            <Widget {...it}/>
                        </Grid>)
                    }
                    <Grid item xs={12} md={6}>
                        <UsersByDevice/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <UsersByDevice/>
                    </Grid>
                </Grid>
            </Box>

        </Layout>
    );
}
