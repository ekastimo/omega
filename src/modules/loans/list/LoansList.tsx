import React, {useEffect, useState} from "react";
import Layout from "../../../components/layout/Layout";
import Paper from '@material-ui/core/Paper';
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import XTable from "../../../components/table/XTable";
import {XHeadCell} from "../../../components/table/XTableHead";
import Grid from '@material-ui/core/Grid';

import Loading from "../../../components/Loading";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import {IState} from "../../../data/types";
import {columns} from "./config";
import {ILoanState, loanConstants} from "../../../data/redux/loans/reducer";
import RecentLoansList from "./RecentLoansList";
import Filter from "./Filter";
import {remoteRoutes} from "../../../data/constants";
import {search} from "../../../utils/ajax";
import {ILoanFilter} from "../types";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        filterPaper: {
            borderRadius: 0,
            padding: theme.spacing(2)
        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
    }),
);

const headCells: XHeadCell[] = [...columns];

const LoansList = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {data}: ILoanState = useSelector((state: IState) => state.loans)
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState<ILoanFilter>({
        showAssigned: true,
        showNew: false
    });

    useEffect(() => {
        setLoading(true)
        search(remoteRoutes.loans, filter, resp => {
            dispatch({
                type: loanConstants.loanFetchAll,
                payload: [...resp],
            })
        }, undefined, () => {
            setLoading(false)
        })
    }, [filter, dispatch])


    function handleFilter(value: any) {
        setFilter({...filter, ...value})
    }

    return (
        <Layout>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <RecentLoansList/>
                    <Box p={1} className={classes.root}>
                        <Box pb={2}>
                            <Grid container>
                                <Grid item sm={6}>
                                    <Typography variant='h5'>Loans</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        {
                            loading ? <Loading/> :
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <XTable
                                            headCells={headCells}
                                            data={data}
                                            initialRowsPerPage={10}
                                        />
                                    </Grid>
                                </Grid>
                        }
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Box pb={2}>
                        <Typography variant='h5'>&nbsp;</Typography>
                    </Box>
                    <Box pt={1}>
                        <Paper className={classes.filterPaper} elevation={0}>
                            <Filter onFilter={handleFilter} loading={loading}/>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Layout>
    );
}

export default LoansList
