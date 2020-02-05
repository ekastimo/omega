import React from 'react';
import {SuccessIcon} from "../../../components/xicons";
import {XStep} from "../stepper/XStepLabel";
import {ILoan} from "../types";
import DetailView, {IRec} from "../../../components/DetailView";
import {printDateTime} from "../../../utils/dateHelpers";

interface IProps {
    data: ILoan
}

export const requestFields = (data: ILoan): IRec[] => {
    const request = data.request;
    return [
        {
            label: 'Category',
            value: request.category.toLocaleUpperCase()
        },
        {
            label: 'Date',
            value: printDateTime(request.entryDate)
        },
        {
            label: 'Phone',
            value: request.userId
        },
        {
            label: 'Network',
            value: data.request.metaData.network
        }
    ]
}

const LoanRequest = (props: IProps) => {
    return (
        <XStep icon={SuccessIcon} title='Request Details' rightLabelComponent={''} open={true}>
            <DetailView data={requestFields(props.data)} columns={2} bold={true}/>
        </XStep>
    );
}

export default LoanRequest;
