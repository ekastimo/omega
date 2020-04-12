import React from 'react';
import {ErrorIcon, SuccessIcon} from "../../../../components/xicons";
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
    const isSuccess = payment.status === PayoutStatus.Success;
    return (
        <XStep icon={isSuccess ? SuccessIcon : ErrorIcon}
               title='Payments'
               rightLabelComponent={
                   isSuccess ?
                       <XRightLabel
                           text='Paid at '
                           date={payment.transactionDate}
                       /> :
                       <XRightLabel
                           text='Payment failed'
                           error
                       />
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
