import React, {useEffect, useState} from "react";
import Layout from "../../../components/layout/Layout";
import Paper from '@material-ui/core/Paper';
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {IContactsFilter} from "../../contacts/types";
import XTable from "../../../components/table/XTable";
import {XHeadCell} from "../../../components/table/XTableHead";
import Grid from '@material-ui/core/Grid';
import Filter from "../../contacts/list/Filter";
import {search} from "../../../utils/ajax";
import {remoteRoutes} from "../../../data/constants";
import Loading from "../../../components/Loading";
import Box from "@material-ui/core/Box";
import EditDialog from "../../../components/EditDialog";
import NewPersonForm from "../../contacts/forms/NewPersonForm";
import AddIcon from "@material-ui/icons/Add";
import UploadIcon from "@material-ui/icons/CloudUpload";
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import Button from "@material-ui/core/Button";
import RecentContacts from "../../contacts/list/RecentContacts";
import {IState} from "../../../data/types";
import {columns} from "./config";
import {ILoanState, loanConstants} from "../../../data/redux/loans/reducer";
import {intRange} from "../../../utils/numberHelpers";
import {fakeLoan} from "../types";
import RecentList from "./RecentList";

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

const FullList = () => {
    const dispatch = useDispatch();
    const {data}: ILoanState = useSelector((state: IState) => state.loans)
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState<IContactsFilter>({});
    const classes = useStyles();

    useEffect(() => {
        setLoading(true)
        setTimeout(()=>{
            const data = intRange(1,20).map(fakeLoan)
            dispatch({
                type: loanConstants.loanFetchAll,
                payload: [...data],
            })
            setLoading(false)
        },500)
    }, [filter, dispatch])

    function handleFilter(value: any) {
        setFilter({...filter, ...value})
    }

    return (
        <Layout>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <RecentList/>
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
                <Grid item xs={3} >
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

export default FullList
