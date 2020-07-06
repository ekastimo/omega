import React from 'react';
import {ILoan} from "../../types";
import DetailView, {IRec} from "../../../../components/DetailView";
import {printDateTime} from "../../../../utils/dateHelpers";
import {printMoney} from "../../../../utils/numberHelpers";
import {hasValue} from "../../../../components/inputs/inputHelpers";
import WarnMessage from "../../../../components/messages/WarnMessage";
import {Box} from "@material-ui/core";

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
            label: 'Max offer',
            value: printMoney(score.offerAmount)
        }
    ]
}

const SoreCard = ({data}: IProps) => {
    return (
        <Box>
            {
                hasValue(data.score) ?
                    <DetailView data={scoreFields(data)} columns={2}/> :
                    <WarnMessage text='No score data'/>
            }
        </Box>
    );
}

export default SoreCard;
