import React from 'react';
import {ILoan} from "../types";
import {ContactCategory, IContact} from "../../contacts/types";
import DetailView, {BoldTableView, IRec} from "../../../components/DetailView";
import {printDate} from "../../../utils/dateHelpers";
import {printMoney} from "../../../utils/numberHelpers";
import ContactLink from "../../../components/links/ContactLink";


export const idFields = (data: ILoan): IRec[] => {
    return [
        {
            label: 'Application Date',
            value: printDate(data.applicationDate)
        }
        ,
        {
            label: 'Applicant',
            value: <ContactLink id={data.applicantId} name={data.applicant.name}/>
        },
        {
            label: 'Amount',
            value: printMoney(data.amount)
        },
        {
            label: 'Admin Fee',
            value: printMoney(data.administrationFee)
        },
        {
            label: 'Inception Fee',
            value: printMoney(data.inceptionFee)
        },
        {
            label: 'Agent',
            value: <ContactLink id={data.agentId} name={data.agent.name}/>
        }
    ]
}

interface IProps {
    data: ILoan
}

const Summary = (props: IProps) => {
    return (
        <BoldTableView data={idFields(props.data)}/>
    );
}


export default Summary;
