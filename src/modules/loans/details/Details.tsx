import React, {useEffect, useState} from 'react';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';
import {getRouteParam} from "../../../utils/routeHelpers";
import {useDispatch, useSelector} from "react-redux";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {AppState} from "../../../data/types";
import {ILoan} from "../types";
import {loanConstants} from "../../../data/redux/loans/reducer";
import Layout from "../../../layout/Layout";
import Box from "@material-ui/core/Box";
import {RouteComponentProps, withRouter} from "react-router";
import ApplicantDetails from "./applicant/ApplicantDetails";
import Grid from "@material-ui/core/Grid";
import {trimGuid} from "../../../utils/stringHelpers";
import {renderStatus, renderSubStatus} from "../list/config";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Summary from "./Summary";
import ApplicationDetails from "./request/ApplicationDetails";
import {get} from "../../../utils/ajax";
import {remoteRoutes} from "../../../data/constants";
import ErrorMessage from "../../../components/messages/ErrorMessage";
import Payments from "./payments/Payments";
import DetailsLoader from "../../../components/loaders/DetailsLoader";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            padding: 0,
            backgroundColor: 'transparent'
        },
        paperStyle: {
            borderRadius: 0
        }

    }),
);

/*

- Loan Application
- Agent Details
- Personal information
- Financial Data (Income)
- Outstanding loans
- Applicant( Status and Notifications)
 */


const Details = (props: RouteComponentProps) => {
    const [loading, setLoading] = useState(false);
    const loanId = getRouteParam(props, 'loanId')
    const classes = useStyles()
    const dispatch = useDispatch();
    const data: ILoan | undefined = useSelector((state: AppState) => state.loans.selected)

    useEffect(() => {
        dispatch({
            type: loanConstants.loanFetchOne,
            payload: undefined,
        })
        setLoading(true)
        const url = `${remoteRoutes.loans}/${loanId}`
        get(url, resp => {
            dispatch({
                type: loanConstants.loanFetchOne,
                payload: resp,
            })
        }, undefined, () => {
            setLoading(false)
        })

    }, [dispatch, loanId])

    if (loading)
        return (
            <Layout>
                <DetailsLoader/>
            </Layout>
        );
    if (!data)
        return (
            <Layout>
                <ErrorMessage text="Failed to load loan details"/>
            </Layout>
        );
    return (
        <Layout>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper elevation={0} className={classes.paperStyle}>
                        <Box p={2}>
                            <Typography variant='h5'>
                                Loan #{trimGuid(data.id)}
                                &nbsp;&nbsp;
                                {renderStatus(data.status)}&nbsp;
                                {renderSubStatus(data.subStatus)}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xl={9} xs={8}>
                    <Box p={1}>
                        <Typography variant='h6' style={{fontSize: '1.0rem'}}>Details</Typography>
                    </Box>
                    <Divider/>
                    <Box pt={1}>
                        <Stepper orientation="vertical" className={classes.root}>
                            <ApplicationDetails data={data}/>
                            <ApplicantDetails data={data}/>
                            <Payments data={data}/>
                        </Stepper>
                    </Box>
                </Grid>
                <Grid item xl={3} xs={4}>
                    <Box p={1} pl={0.5}>
                        <Typography variant='h6' style={{fontSize: '1.0rem'}}>Loan summary</Typography>
                    </Box>
                    <Divider/>
                    <Box p={1} pl={0.5}>
                        <Summary data={data}/>
                    </Box>
                </Grid>
            </Grid>
        </Layout>
    );
}

export default withRouter(Details);
