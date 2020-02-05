import React from 'react';
import {SuccessIcon} from "../../../components/xicons";
import {XStep} from "../stepper/XStepLabel";
import {ILoan} from "../types";
import DetailView, {IRec} from "../../../components/DetailView";
import {printDateTime} from "../../../utils/dateHelpers";
import {printMoney} from "../../../utils/numberHelpers";

interface IProps {
    data: ILoan
}

export const idFields = (data: ILoan): IRec[] => {

    return [
        {
            label: 'Application Date',
            value: printDateTime(data.applicationDate)
        },
        {
            label: 'Loan Amount',
            value: printMoney(data.amount)
        },
        {
            label: 'Interest',
            value: `${data.interestRate} %`
        },
        {
            label: 'Duration',
            value: `${data.durationInMonths} mths`
        }
    ]
}

const LoanApplication = (props: IProps) => {
    return (
        <XStep icon={SuccessIcon} title='Loan Application' rightLabelComponent={''} open={true}>
            <DetailView data={idFields(props.data)} columns={2} bold={true}/>
        </XStep>
    );
}

export default LoanApplication;
