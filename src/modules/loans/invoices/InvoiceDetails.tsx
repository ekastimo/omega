import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {getRouteParam} from "../../../utils/routHelpers";
import {useDispatch} from "react-redux";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {loanConstants} from "../../../data/redux/loans/reducer";
import Layout from "../../../components/layout/Layout";
import Box from "@material-ui/core/Box";
import {RouteComponentProps, withRouter} from "react-router";
import Loading from "../../../components/Loading";
import Grid from "@material-ui/core/Grid";
import {trimGuid} from "../../../utils/stringHelpers";
import Paper from "@material-ui/core/Paper";


import {get} from "../../../utils/ajax";
import {remoteRoutes} from "../../../data/constants";
import ErrorMessage from "../../../components/messages/ErrorMessage";
import {IInvoice} from "./types";
import CodeView from "../../../components/CodeView";


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

const InvoiceDetails = (props: RouteComponentProps) => {
    const [loading, setLoading] = useState(false);
    const invoiceId = getRouteParam(props, 'invoiceId')
    const classes = useStyles()
    const dispatch = useDispatch();
    const [data,setData]=useState<IInvoice|null>(null)

    useEffect(() => {
        dispatch({
            type: loanConstants.loanFetchOne,
            payload: undefined,
        })
        setLoading(true)
        const url = `${remoteRoutes.invoices}/${invoiceId}`
        get(url, resp => {
            setData(resp)
        }, undefined, () => {
            setLoading(false)
        })

    }, [dispatch, invoiceId])

    if (loading)
        return (
            <Layout>
                <Loading/>
            </Layout>
        );
    if (data===null)
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
                                {data.status}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xl={12}>
                    <CodeView data={data}/>
                </Grid>
            </Grid>
        </Layout>
    );
}

export default withRouter(InvoiceDetails);
