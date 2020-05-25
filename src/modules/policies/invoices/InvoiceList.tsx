import React, {useCallback, useEffect, useState} from 'react';
import Layout from "../../layout/Layout";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {search} from "../../../utils/ajax";
import {remoteRoutes} from "../../../data/constants";
import EditDialog from "../../../components/EditDialog";
import InvoiceEditor from "./InvoiceEditor";
import Loading from "../../../components/Loading";
import {columns} from "./config";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import {isPrimaryUser} from "../../../data/appRoles";
import XTable from "../../../components/table/XTable";
import Paper from "@material-ui/core/Paper";
import {useSelector} from "react-redux";
import Filter from "./Filter";

const InvoiceList = () => {
    const user = useSelector((state: any) => state.core.user)
    const [filter, setFilter] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<any[]>([])
    const [dialog, setDialog] = useState<boolean>(false)

    const fetchData = useCallback((f: any) => {
        setLoading(true)
        search(remoteRoutes.invoices, f, resp => {
            setData(resp)
        }, undefined, () => setLoading(false))
    }, [])

    useEffect(() => {
        fetchData(filter)
    }, [fetchData, filter])

    function handleFilter(f: any = {}) {
        setFilter({...filter, ...f})
    }

    function handleGenerate() {
        setDialog(true)
    }

    const handleComplete = () => {
        fetchData(filter)
        handleClose()
    }

    const handleClose = () => {
        setDialog(false)
    }

    return (
        <Layout>
            <Grid container spacing={3}>
                <Grid item xs={9}>
                    <Box pb={2}>
                        <Grid container>
                            <Grid item sm={6}>
                                <Typography variant='h5'>Invoices</Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <Box display='flex' flexDirection="row-reverse">
                                    {
                                        isPrimaryUser(user) &&
                                        <Button
                                            size='medium'
                                            variant="outlined"
                                            color="primary"
                                            startIcon={<AddIcon/>}
                                            onClick={handleGenerate}
                                        >
                                            Generate Invoice&nbsp;&nbsp;
                                        </Button>
                                    }
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    {
                        loading ? <Loading/> :
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <XTable
                                        initialOrder="desc"
                                        initialSortBy='invoiceNumber'
                                        headCells={columns}
                                        data={data}
                                        initialRowsPerPage={10}
                                    />
                                </Grid>
                            </Grid>
                    }
                </Grid>
                <Grid item xs={3}>
                    <Box pb={2.5}>
                        <Typography variant='h5'>&nbsp;</Typography>
                    </Box>
                    <Box>
                        <Paper elevation={0}>
                            <Box p={2}>
                                <Filter onFilter={handleFilter} loading={loading}/>
                            </Box>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>

            <EditDialog
                disableBackdropClick
                title='Create Invoice'
                open={dialog}
                onClose={handleClose}>
                <InvoiceEditor
                    onComplete={handleComplete}
                    onCancel={handleClose}/>
            </EditDialog>
        </Layout>
    );
}

export default InvoiceList;
