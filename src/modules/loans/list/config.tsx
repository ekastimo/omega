import React from "react";
import {XHeadCell} from "../../../components/table/XTableHead";
import ContactLink from "../../../components/links/ContactLink";
import {getEmail} from "../../contacts/types";
import LoanLink from "../../../components/links/LoanLink";
import {getInitials, trimGuid} from "../../../utils/stringHelpers";
import {printMoney} from "../../../utils/numberHelpers";
import {printDateTime} from "../../../utils/dateHelpers";


export const columns: XHeadCell[] = [
    {name: 'id', label: 'ID', render: value => <LoanLink id={value} name={trimGuid(value)}/>},
    {name: 'category', label: 'Category'},
    {name: 'status', label: 'Status'},
    {name: 'subStatus', label: 'Sub-Status'},
    {
        name: 'applicantId',
        label: 'Applicant',
        render: (value, rec) => <ContactLink id={value} name={rec.applicant.name}/>
    },
    {name: 'applicationDate', label: 'Application Date', render: printDateTime},
    {name: 'amount', label: 'Amount', render: value => printMoney(value)},
    {name: 'assigneeId', label: 'Assignee', render: (value, rec) => <ContactLink id={value} name={getInitials(rec.assignee.name)}/>}
];
