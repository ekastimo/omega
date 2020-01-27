import React, {useEffect, useState} from "react";
import XTable from "../../../components/table/XTable";
import {XHeadCell} from "../../../components/table/XTableHead";
import Grid from '@material-ui/core/Grid';
import Loading from "../../../components/Loading";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import {columns} from "./config";
import {IState} from "../../../data/types";
import {ILoanState, loanConstants} from "../../../data/redux/loans/reducer";
import {intRange} from "../../../utils/numberHelpers";
import {fakeLoan} from "../types";

const headCells: XHeadCell[] = [...columns];

const RecentList = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {recent}: ILoanState = useSelector((state: IState) => state.loans)

    useEffect(() => {
        setLoading(true)
        setTimeout(()=>{
            const data = intRange(1,4).map(fakeLoan)
            dispatch({
                type: loanConstants.loanFetchRecent,
                payload: [...data],
            })
            setLoading(false)
        },500)
    }, [ dispatch])

    return (
        <Box p={1} width='100%'>
            <Box pb={2}>
                <Typography variant='h5'>New Loans</Typography>
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

export default RecentList
