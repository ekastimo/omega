import React, {useState} from 'react';
import WarnMessage from "../../../../components/messages/WarnMessage";
import {ILoan, LoanStatus, PayoutStatus} from "../../types";
import {Box, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {Alert} from "@material-ui/lab";
import Button from "@material-ui/core/Button";
import DownPayments from "./DownPayments";
import {useDispatch} from "react-redux";
import {remoteRoutes} from "../../../../data/constants";
import {post} from "../../../../utils/ajax";
import {loanActionRecover} from "../../../../data/redux/loans/reducer";

interface IProps {
    data: ILoan
}

const Recovery = ({data}: IProps) => {
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch()
    const payout = data.payout
    const repaymentPlan = data.repaymentPlan

    const isNotPayedOut = payout.status !== PayoutStatus.Success
    if (isNotPayedOut)
        return <Box>
            <WarnMessage
                text='Loan not paid out'
            />
        </Box>

    function handleRecover() {
        setLoading(true)
        const url = `${remoteRoutes.loansTriggerRecover}`;
        const request = {
            loanId: data.id
        }
        post(url, request, resp => {
            dispatch(loanActionRecover(resp))
        }, undefined, () => {
            setLoading(false)
        })
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <DownPayments data={repaymentPlan}/>
            </Grid>
            <Grid item xs={6}>
                <Box pb={1}>
                    <Typography variant='h6' style={{fontSize: '0.85rem'}}>Recovery</Typography>
                </Box>
                {
                    data.status !== LoanStatus.Closed ?
                        <Box>
                            <Alert severity='warning'>Not yet closed</Alert>
                            <Box display='flex' justifyContent='flex-end' pt={2}>
                                <Button variant='outlined' onClick={handleRecover} disabled={loading}>Close Loan</Button>
                            </Box>
                        </Box>
                        :
                        <Box>
                            <Alert severity='success'>Closed</Alert>
                        </Box>

                }
            </Grid>

        </Grid>
    );
}

export default Recovery;
