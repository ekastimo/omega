import React from 'react';
import {Theme, Typography} from "@material-ui/core";
import {IContact} from "../../types";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import uuid from 'uuid/v4'
import {randomInt} from "../../../../utils/numberHelpers";
import {useTheme} from "@material-ui/styles";
import ContactLoansSummary from "../../../loans/list/ContactLoansSummary";

interface IProps {
    data: IContact
}

interface ILoan {
    id:string
    applicationDate: Date
    amount: number
    interest: number
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
        status: LoanStatus.HEALTHY,
        interest: randomInt(8,20)
    },
    {
        id: uuid(),
        applicationDate: new Date(),
        amount: 150000,
        status: LoanStatus.HEALTHY,
        interest: randomInt(8,20)
    },
    {
        id: uuid(),
        applicationDate: new Date(),
        amount: 25000,
        status: LoanStatus.OVERDUE,
        interest: randomInt(8,20)
    },
    {
        id: uuid(),
        applicationDate: new Date(),
        amount: 400000,
        status: LoanStatus.HEALTHY,
        interest: randomInt(8,20)
    }
];

const PreviousLoans = ({data}: IProps) => {
    const theme: Theme = useTheme();
    const title = <div style={{display: 'flex', flexDirection: 'row' ,paddingBottom:theme.spacing(1)}}>
        <Typography variant='body2'><b>RECENT LOANS</b></Typography>
    </div>
    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <Box display="flex" >
                    <Box flexGrow={1} pt={1}>
                        {title}
                    </Box>
                </Box>
                <Divider/>
            </Grid>
            <Grid item xs={12}>
                <ContactLoansSummary contact={data}/>
            </Grid>
        </Grid>
    );
}


export default PreviousLoans;
