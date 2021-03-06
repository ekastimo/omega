import React from 'react';
import {SuccessIcon} from "../../../../components/xicons";
import {XStep} from "../../stepper/XStepLabel";
import {ILoan} from "../../types";
import DetailView, {IRec} from "../../../../components/DetailView";
import {printDateTime} from "../../../../utils/dateHelpers";
import {hasValue} from "../../../../components/inputs/inputHelpers";

interface IProps {
    data: ILoan
}

export const requestFields = (data: ILoan): IRec[] => {
    const request = data.request;
    let meta: any = {};
    if (hasValue(request.metaData)) {
        meta = JSON.parse(request.metaData)
    }
    return [
        {
            label: 'Category',
            value: request.category?.toLocaleUpperCase()
        },
        {
            label: 'Date',
            value: printDateTime(request.createdAt)
        },
        {
            label: 'Ref ',
            value: request.applicantReference
        },
        {
            label: 'Network',
            value: meta.network
        }
    ]
}

const LoanRequest = (props: IProps) => {
    return (
        <XStep icon={SuccessIcon} title='Request Details' rightLabelComponent={''} open={true}>
            <DetailView data={requestFields(props.data)} columns={2}/>
        </XStep>
    );
}

export default LoanRequest;
