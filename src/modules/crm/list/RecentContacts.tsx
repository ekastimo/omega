import React, {useEffect, useState} from "react";
import {IContactsFilter} from "../types";
import XTable from "../../../components/table/XTable";
import {XHeadCell} from "../../../components/table/XTableHead";
import Grid from '@material-ui/core/Grid';
import {search} from "../../../utils/ajax";
import {remoteRoutes} from "../../../data/constants";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import {columns, parseListData} from "./config";
import TableLoading from "../../../components/loaders/TableLoading";
import {crmConstants, ICrmState} from "../../../data/redux/crm/reducer";

const headCells: XHeadCell[] = [...columns];

const RecentContacts = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {recent}: ICrmState = useSelector((state: any) => state.crm)

    useEffect(() => {
        const filter: IContactsFilter = {
            limit: 3
        }
        setLoading(true)
        search(
            remoteRoutes.contacts,
            filter,
            (resp) => {
                dispatch({
                    type: crmConstants.crmFetchRecent,
                    payload: [...resp],
                })
            },
            undefined,
            () => {
                setLoading(false)
            })
    }, [dispatch])
    return (
        <Box p={1} width='100%'>
            <Box pb={2}>
                <Typography variant='h5'>Recent Contacts</Typography>
            </Box>
            {
                loading ? <TableLoading rows={4}/> :
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <XTable
                                headCells={headCells}
                                data={parseListData(recent)}
                                initialRowsPerPage={3}
                                usePagination={false}
                                initialSortBy="name"
                            />
                        </Grid>
                    </Grid>
            }
        </Box>
    );
}

export default RecentContacts
