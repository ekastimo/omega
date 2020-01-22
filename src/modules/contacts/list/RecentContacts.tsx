import React, {useEffect, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {getEmail, getNin, getPhone, IContactsFilter, renderName} from "../types";
import XTable from "../../../components/table/XTable";
import {XHeadCell} from "../../../components/table/XTableHead";
import Grid from '@material-ui/core/Grid';
import ContactLink from "../../../components/ContactLink";
import {search} from "../../../utils/ajax";
import {remoteRoutes} from "../../../data/constants";
import Loading from "../../../components/Loading";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import {crmConstants, ICrmState} from "../../../data/contacts/reducer";


const headCells: XHeadCell[] = [
    {name: 'id', label: 'Name', render: (value, rec) => <ContactLink id={value} name={renderName(rec)}/>},
    {name: 'category', label: 'Category'},
    {name: 'tin', label: 'TIN/NIN', render: (_, rec) => getNin(rec)},
    {name: 'email', label: 'Email', render: (_, rec) => getEmail(rec)},
    {name: 'phone', label: 'Phone', render: (_, rec) => getPhone(rec)},

];


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
                loading ? <Loading/> :
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <XTable
                                headCells={headCells}
                                data={recent}
                                initialRowsPerPage={3}
                                usePagination={false}
                            />
                        </Grid>
                    </Grid>
            }
        </Box>
    );
}

export default RecentContacts
