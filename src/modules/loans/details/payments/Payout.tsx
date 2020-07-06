import React, {useState} from 'react';
import {ILoan, IPayout, PayoutStatus} from "../../types";
import DetailView, {IRec} from "../../../../components/DetailView";
import {Box} from "@material-ui/core";
import {printMoney} from "../../../../utils/numberHelpers";
import {Alert} from "@material-ui/lab";
import Button from "@material-ui/core/Button";
import {post} from "../../../../utils/ajax";
import {remoteRoutes} from "../../../../data/constants";
import {useDispatch} from "react-redux";
import {loanActionPayout} from "../../../../data/redux/loans/reducer";

interface IProps {
    data: ILoan
}

export const displayFields = (data: IPayout): IRec[] => {
    return [
        {
            label: 'Pay type',
            value: data.category
        },
        {
            label: 'Vendor',
            value: data.vendor
        },
        {
            label: 'Txn ID',
            value: data.transactionId
        },
        {
            label: 'Amount',
            value: printMoney(data.amount)
        }
    ]
}

const Payout = ({data}: IProps) => {
    const payment = data.payout
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch()

    function handlePayout() {
        setLoading(true)
        const url = `${remoteRoutes.loansTriggerPayment}`;
        const request = {
            loanId: data.id, category: "MobileMoney"
        }
        post(url, request, resp => {
            dispatch(loanActionPayout(resp))
        }, undefined, () => {
            setLoading(false)
        })
    }

    let buttonText = "Trigger";
    if (payment.status === PayoutStatus.Failed) {
        buttonText = "Re-Trigger"
    } else if (payment.status === PayoutStatus.Sent) {
        buttonText = "Check status"
    }

    return (
        <Box>
            {
                payment.status === PayoutStatus.Success ?
                    <DetailView data={displayFields(payment)} columns={2}/> :
                    <Box display='flex' px={4}>
                        <Box flexGrow={1} pr={2}>
                            {
                                payment.status === PayoutStatus.Failed &&
                                <Alert severity="error">{payment.message}</Alert>
                            }
                            {
                                payment.status === PayoutStatus.Pending &&
                                <Alert severity="warning">{payment.message}</Alert>
                            }
                            {
                                payment.status === PayoutStatus.Sent &&
                                <Alert severity="info">{payment.message}</Alert>
                            }
                        </Box>
                        <Box><Button
                            variant='outlined'
                            onClick={handlePayout}
                            disabled={loading}
                            color='primary'
                        >
                            {buttonText}
                        </Button></Box>
                    </Box>

            }
        </Box>
    );
}
export default Payout;
