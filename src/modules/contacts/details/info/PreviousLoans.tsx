import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Theme, Typography} from "@material-ui/core";
import {IContact} from "../../types";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import uuid from 'uuid/v4'
import {trimGuid} from "../../../../utils/stringHelpers";
import CaseLink from "../../../../components/CaseLink";
import {printDateTime} from "../../../../utils/dateHelpers";
import {printMoney} from "../../../../utils/numberHelpers";
import {ErrorIcon, SuccessIcon} from "../../../../components/xicons";
import {useTheme} from "@material-ui/styles";

interface IProps {
    data: IContact
}

interface ILoan {
    id:string
    applicationDate: Date
    amount: number
    status: LoanStatus
}

enum LoanStatus {
    OVERDUE = 'OVERDUE',
    HEALTHY = 'HEALTHY'
}


const loans: ILoan[] = [
    {
        id: uuid(),
        applicationDate: new Date(),
        amount: 100000,
        status: LoanStatus.HEALTHY
    },
    {
        id: uuid(),
        applicationDate: new Date(),
        amount: 150000,
        status: LoanStatus.HEALTHY
    },
    {
        id: uuid(),
        applicationDate: new Date(),
        amount: 25000,
        status: LoanStatus.OVERDUE
    },
    {
        id: uuid(),
        applicationDate: new Date(),
        amount: 400000,
        status: LoanStatus.HEALTHY
    }
];

const PreviousLoans = (props: IProps) => {
    const theme: Theme = useTheme();
    const title = <div style={{display: 'flex', flexDirection: 'row' ,paddingBottom:theme.spacing(1)}}>
        <AccountBalanceWalletIcon fontSize='small'/><Typography variant='body2'>&nbsp;<b>Recent Loans</b></Typography>
    </div>
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Box display="flex" px={1}>
                    <Box flexGrow={1} pt={1}>
                        {title}
                    </Box>
                </Box>
                <Divider/>
            </Grid>
            <Grid item xs={12}>
                <TableContainer >
                    <Table  aria-label="simple table" size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="right">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loans.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        <CaseLink id={row.id} name={trimGuid(row.id)}/>
                                    </TableCell>
                                    <TableCell align="right">{printDateTime(row.applicationDate)}</TableCell>
                                    <TableCell align="right">{printMoney(row.amount)}</TableCell>
                                    <TableCell align="right">{
                                        row.status===LoanStatus.HEALTHY?
                                            <SuccessIcon fontSize='small'/>:<ErrorIcon fontSize='small'/>
                                    }</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

        </Grid>
    );
}


export default PreviousLoans;
