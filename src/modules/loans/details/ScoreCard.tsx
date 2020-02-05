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

export const scoreFields = (data: ILoan): IRec[] => {
    const score = data.score;
    return [
        {
            label: 'Run Date',
            value: printDateTime(score.runDate)
        },
        {
            label: 'Decision',
            value: score.decision
        },
        {
            label: 'Model',
            value: score.model
        },
        {
            label: 'Offer',
            value: printMoney(score.amount)
        },
        {
            label: 'Remarks',
            value: score.remarks
        }
    ]
}


const SoreCard = (props: IProps) => {
    return (
        <XStep icon={SuccessIcon} title='Score Card' rightLabelComponent={''} open={true}>
            <DetailView data={scoreFields(props.data)} columns={2} bold={true}/>
        </XStep>
    );
}

export default SoreCard;
