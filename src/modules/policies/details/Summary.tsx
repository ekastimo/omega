import React from 'react';
import {ILoan} from "../types";
import {BoldTableView, IRec} from "../../../components/DetailView";
import {printDateTime} from "../../../utils/dateHelpers";
import {printMoney} from "../../../utils/numberHelpers";
import ContactLink from "../../../components/links/ContactLink";
import {renderName} from "../../contacts/types";
import Box from '@material-ui/core/Box';
import {Typography} from "@material-ui/core";
import {applicantFields} from "./applicant/ApplicantDetails";
import {requestFields} from "./request/LoanRequest";


export const appDetailsFields = (data: ILoan): IRec[] => {
    return [
        {
            label: 'Application Date',
            value: printDateTime(data.applicationDate)
        }
        ,
        {
            label: 'Applicant',
            value: <ContactLink id={data.applicantId} name={renderName(data.applicant)}/>
        },
        {
            label: 'Loan Amount',
            value: printMoney(data.amount)
        },
        {
            label: 'Duration',
            value: `${data.durationInMonths} mths`
        },
        {
            label: 'Interest',
            value: `${data.interestRate} %`
        },
        {
            label: 'Assignee',
            value: <ContactLink id={data.assigneeId} name={data.assignee.name}/>
        }
    ]
}



interface IProps {
    data: ILoan
}

const Summary = (props: IProps) => {
    return (
        <Box>
            <BoldTableView data={appDetailsFields(props.data)}/>
            <Box py={1}>
                <Typography variant='h6' style={{fontSize: '1.0rem'}}>Applicant Details</Typography>
            </Box>
            <BoldTableView data={applicantFields(props.data)}/>
            <Box py={1}>
                <Typography variant='h6' style={{fontSize: '1.0rem'}}>Request</Typography>
            </Box>
            <BoldTableView data={requestFields(props.data)}/>
        </Box>

    );
}


export default Summary;
