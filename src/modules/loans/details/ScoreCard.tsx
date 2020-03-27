import React from 'react';
import {SuccessIcon} from "../../../components/xicons";
import {XStep} from "../stepper/XStepLabel";
import {ILoan} from "../types";
import DetailView, {IRec} from "../../../components/DetailView";
import {printDateTime} from "../../../utils/dateHelpers";
import {printMoney} from "../../../utils/numberHelpers";
import {hasValue} from "../../../components/inputs/inputHelpers";
import WarmMessage from "../../../components/messages/WarnMessage";

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


const SoreCard = ({data}: IProps) => {
    return (
        <XStep icon={SuccessIcon} title='Score Card' rightLabelComponent={''} open={true}>
            {
                hasValue(data.score)?
                    <DetailView data={scoreFields(data)} columns={2} bold={true}/>:
                    <WarmMessage text='No score data'/>
            }

        </XStep>
    );
}

export default SoreCard;
