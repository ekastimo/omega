import React, {useCallback, useEffect, useState} from "react";

import Paper from '@material-ui/core/Paper';
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {IContactsFilter} from "../types";
import XTable from "../../../components/table/XTable";
import {XHeadCell} from "../../../components/table/XTableHead";
import Grid from '@material-ui/core/Grid';
import Filter from "./Filter";
import {search} from "../../../utils/ajax";
import {remoteRoutes} from "../../../data/constants";

import Box from "@material-ui/core/Box";
import EditDialog from "../../../components/EditDialog";
import NewPersonForm from "../details/person/NewPersonForm";
import AddIcon from "@material-ui/icons/Add";
import UploadIcon from "@material-ui/icons/CloudUpload";
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";

import Button from "@material-ui/core/Button";
import RecentContacts from "./RecentContacts";

import {columns, parseListData} from "./config";
import ContactUpload from "../details/person/ContactUpload";
import NewCompanyForm from "../details/company/NewCompanyForm";
import {isPrimaryUser} from "../../../data/appRoles";
import {crmConstants, ICrmState} from "../../../data/redux/crm/reducer";
import {AppState} from "../../../data/types";
import Layout from "../../../layout/Layout";
import TableLoading from "../../../components/loaders/TableLoading";

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

const ContactsList = () => {
    const dispatch = useDispatch();
    const [createPersonDialog, setCreatePersonDialog] = useState(false);
    const [createCompanyDialog, setCreateCompanyDialog] = useState(false);
    const [uploadDialog, setUploadDialog] = useState(false);
    const {data, loading}: ICrmState = useSelector((state: AppState) => state.crm)
    const user = useSelector((state: any) => state.core.user)

    const [filter, setFilter] = useState<IContactsFilter>({});
    const classes = useStyles();

    const fetchData = useCallback((queryData: any) => {
        dispatch({
            type: crmConstants.crmFetchLoading,
            payload: true,
        })
        search(
            remoteRoutes.contacts,
            queryData,
            (resp) => {
                dispatch({
                    type: crmConstants.crmFetchAll,
                    payload: [...resp],
                })
            },
            undefined,
            () => {
                dispatch({
                    type: crmConstants.crmFetchLoading,
                    payload: false,
                })
            })
    }, [dispatch])

    useEffect(() => {
        fetchData(filter)
    }, [fetchData, filter])


    function handleUploadComplete() {
        fetchData(filter)
        setUploadDialog(false)
    }

    function handleFilter(value: any) {
        setFilter({...filter, ...value})
    }

    function handleNew() {
        setCreatePersonDialog(true)
    }

    function handleNewCompany() {
        setCreateCompanyDialog(true)
    }

    function handleUpload() {
        setUploadDialog(true)
    }

    function closeUploadDialog() {
        setUploadDialog(false)
    }

    function closeCreateDialog() {
        setCreatePersonDialog(false)
        setCreateCompanyDialog(false)
    }

    return (
        <Layout>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <RecentContacts/>
                    <Box p={1} className={classes.root}>
                        <Box pb={2}>
                            <Grid container>
                                <Grid item sm={6}>
                                    <Typography variant='h5'>Contacts</Typography>
                                </Grid>
                                <Grid item sm={6}>
                                    <Box display='flex' flexDirection="row-reverse">
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            startIcon={<AddIcon/>}
                                            onClick={handleNew}
                                            style={{marginLeft: 8}}
                                        >
                                            Person&nbsp;&nbsp;
                                        </Button>
                                        {
                                            isPrimaryUser(user) &&
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                startIcon={<AddIcon/>}
                                                onClick={handleNewCompany}
                                                style={{marginLeft: 8}}
                                            >
                                                Company&nbsp;&nbsp;
                                            </Button>
                                        }
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            startIcon={<UploadIcon/>}
                                            onClick={handleUpload}
                                            style={{marginLeft: 8}}
                                        >
                                            Upload&nbsp;&nbsp;
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        {
                            loading ? <TableLoading rows={11}/> :
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <XTable
                                            headCells={headCells}
                                            data={parseListData(data)}
                                            initialRowsPerPage={10}
                                            initialSortBy="name"
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
            <EditDialog title="New Person" open={createPersonDialog} onClose={closeCreateDialog} maxWidth="sm">
                <NewPersonForm data={{}} done={closeCreateDialog}/>
            </EditDialog>
            <EditDialog title="New Company" open={createCompanyDialog} onClose={closeCreateDialog} maxWidth="sm">
                <NewCompanyForm data={{}} done={closeCreateDialog}/>
            </EditDialog>
            <ContactUpload show={uploadDialog} onClose={closeUploadDialog} onDone={handleUploadComplete}/>
        </Layout>
    );
}

export default ContactsList
