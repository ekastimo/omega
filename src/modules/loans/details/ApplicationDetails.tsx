import React from 'react';
import {SuccessIcon} from "../../../components/xicons";
import {XStep} from "../stepper/XStepLabel";
import {ILoan} from "../types";
import DetailView, {IRec} from "../../../components/DetailView";
import {printDateTime} from "../../../utils/dateHelpers";
import {printMoney} from "../../../utils/numberHelpers";
import {Divider} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

interface IProps {
    data: ILoan
}

export const applicationFields = (data: ILoan): IRec[] => {

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

const ApplicationDetails = (props: IProps) => {
    return (
        <XStep icon={SuccessIcon} title='Request details' rightLabelComponent={''} open={true}>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <DetailView data={applicationFields(props.data)}/>
                </Grid>
                <Grid item xs={6}>
                    <DetailView data={requestFields(props.data)}/>
                </Grid>
            </Grid>
        </XStep>
    );
}

export default ApplicationDetails;
