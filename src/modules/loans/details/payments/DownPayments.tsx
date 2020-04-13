import React from 'react';
import {printDate} from "../../../../utils/dateHelpers";
import {DownPaymentStatus, IDownPayment} from "../../types";
import {errorColor, successColor, warningColor} from "../../../../theme/custom-colors";
import {printMoney} from "../../../../utils/numberHelpers";
import {Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";


interface IProps {
    data: IDownPayment[]
}

export default function DownPayments({data}: IProps) {
    return (
        <Box>
            <Box pb={1}>
                <Typography variant='h6' style={{fontSize: '0.85rem'}}>Down payments</Typography>
            </Box>
            <Box >
                {
                    data.map(it => {
                        let color: any = warningColor;
                        if (it.status === DownPaymentStatus.Paid) {
                            color = successColor
                        } else if (it.status === DownPaymentStatus.Overdue) {
                            color = errorColor
                        }
                        return <Box key={it.id} pb={2}>
                            <Typography variant='body1'>{printMoney(it.amount)}</Typography>
                            <Typography variant='caption'>
                                <label
                                    style={{
                                        paddingBottom: 2,
                                        backgroundColor: color,
                                        borderRadius: 8
                                    }}>
                                    &nbsp;{it.status}&nbsp;
                                </label>
                                &nbsp;{printDate(it.paymentDate)}
                            </Typography>
                        </Box>
                    })
                }
            </Box>
        </Box>
    );
}
