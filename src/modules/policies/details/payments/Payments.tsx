import React from 'react';
import {ErrorIcon, SuccessIcon, WarningIcon} from "../../../../components/xicons";
import {XStep} from "../../stepper/XStepLabel";
import {ILoan, PayoutStatus} from "../../types";
import XSubStep from "../../stepper/XSubStep";
import Payout from "./Payout";
import Recovery from "./Recovery";
import XRightLabel from "../../stepper/XRightLabel";

interface IProps {
    data: ILoan
}

const Payments = ({data}: IProps) => {
    const payment = data.payout
    let icon = ErrorIcon
    if (payment.status === PayoutStatus.Success)
        icon = SuccessIcon
    else if (payment.status === PayoutStatus.Sent) {
        icon = WarningIcon
    } else if (payment.status === PayoutStatus.Pending) {
        icon = WarningIcon
    }
    return (
        <XStep icon={icon}
               title='Payments'
               rightLabelComponent={
                   <>
                       {
                           payment.status === PayoutStatus.Success &&
                           <XRightLabel
                               text='Paid at '
                               date={payment.transactionDate}
                           />
                       }
                       {
                           payment.status === PayoutStatus.Sent &&
                           <XRightLabel
                               text='Pending acknowledgement'
                               warning
                           />
                       }
                       {
                           payment.status === PayoutStatus.Failed &&
                           <XRightLabel
                               text='Payment failed'
                               error
                           />
                       }
                       {
                           payment.status === PayoutStatus.Pending &&
                           <XRightLabel
                               text='Payment not triggered'
                               error
                           />
                       }
                   </>
               }
               open={true}
               hideContentPaper
        >
            <XSubStep title='Payout details'>
                <Payout data={data}/>
            </XSubStep>
            <XSubStep title='Loan Recovery'>
                <Recovery data={data}/>
            </XSubStep>
        </XStep>
    );
}

export default Payments;
