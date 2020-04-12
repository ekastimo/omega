import React from 'react';
import WarnMessage from "../../../../components/messages/WarnMessage";
import {ILoan, IPayout} from "../../types";
import {IRec} from "../../../../components/DetailView";
import {printMoney} from "../../../../utils/numberHelpers";

interface IProps {
    data: ILoan
}

export const recoverFields = (data: IPayout): IRec[] => {
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

const Recovery = ({data}: IProps) => {
    const repaymentPlan = data.repaymentPlan
    const recovery = data.recovery
    return (
        <div>
            <WarnMessage text='Payout data'/>
        </div>
    );
}


export default Recovery;
