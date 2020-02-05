import React from "react";
import {XHeadCell} from "../../../components/table/XTableHead";
import ContactLink from "../../../components/links/ContactLink";
import LoanLink from "../../../components/links/LoanLink";
import {getInitials, trimGuid} from "../../../utils/stringHelpers";
import {printMoney} from "../../../utils/numberHelpers";
import {printDate, printDateTime} from "../../../utils/dateHelpers";
import Chip from "@material-ui/core/Chip";
import {errorColor, successColor, warningColor} from "../../../theme/custom-colors";
import {LoanStatus, LoanSubStatus} from "../types";
import {blue} from "@material-ui/core/colors";

export const renderStatus = (value: LoanStatus) => {
    let color = successColor
    switch (value) {
        case LoanStatus.Closed:
            color = successColor
            break
        case LoanStatus.Error:
            color = errorColor
            break
        case LoanStatus.Open:
            color = warningColor
            break
    }

    return <Chip
        color='primary'
        variant='default'
        size='small'
        label={value}
        style={{padding: 0, height: 18, backgroundColor: color, marginBottom: 2}}
    />
}


export const renderSubStatus = (value: LoanSubStatus) => {
    let color = successColor
    switch (value) {
        case LoanSubStatus.Recovered:
            color = successColor
            break
        case LoanSubStatus.LowCredit:
        case LoanSubStatus.MissingInformation:
        case LoanSubStatus.Overdue:
        case LoanSubStatus.PayoutFailure:
        case LoanSubStatus.ReachedLimit:
            color = errorColor
            break
        case LoanSubStatus.PaidOut:
            color = blue[600]
            break
    }

    return <Chip
        color='primary'
        variant='default'
        size='small'
        label={value}
        style={{padding: 0, height: 18, backgroundColor: color, marginBottom: 2}}
    />
}

export const columns: XHeadCell[] = [
    {
        name: 'id', label: 'ID', render: value => <LoanLink id={value} name={trimGuid(value)}/>,
        cellProps: {
            style: {
                width: 70
            }
        }
    },
    {
        name: 'applicationDate', label: 'Date', render: printDateTime,
        cellProps: {
            style: {
                width: 130,
                whiteSpace: 'nowrap'
            }
        }
    },
    {
        name: 'category', label: 'Type',
        cellProps: {
            style: {
                width: 70
            }
        }
    },
    {
        name: 'status', label: 'Status',
        cellProps: {
            style: {
                width: 70,
                padding: 0
            }
        }, render: renderStatus
    },
    {
        name: 'subStatus', label: 'Sub-Status', render: renderSubStatus,
        cellProps: {
            style: {
                width: 100,
                padding: 0
            }
        }
    },
    {
        name: 'applicantId',
        label: 'Applicant',
        render: (value, rec) => <ContactLink id={value} name={rec.applicant.name}/>,
    },

    {name: 'amount', label: 'Amount', render: value => printMoney(value)},
    {
        name: 'assigneeId',
        label: 'Assignee',
        render: (value, rec) => <ContactLink id={value} name={getInitials(rec.assignee.name)}/>,
        cellProps: {
            style: {
                width: 60,
                padding: 0
            }
        }
    }
];


export const companyLoansHeadCells: XHeadCell[] = [...columns];
export const personLoansHeadCells: XHeadCell[] = [...columns.filter(it => {
    return it.name !== 'applicantId'
}).map(({cellProps, ...rest}) => ({...rest}))];

export const contactLoanSumHeaderCells: XHeadCell[] = [
    {
        name: 'id', label: 'ID', render: value => <LoanLink id={value} name={trimGuid(value)}/>,
        cellProps: {style: {width: 70}}
    },
    {
        name: 'applicationDate', label: 'Date', render: printDate
    },

    {
        name: 'status', label: 'Status',
        render: renderStatus
    },
    {
        name: 'subStatus', label: 'Sub-Status', render: renderSubStatus
    },
    {
        name: 'applicantId',
        label: 'Applicant',
        render: (value, rec) => <ContactLink id={value} name={getInitials(rec.applicant.name)}/>,
    },
    {
        name: 'amount', label: 'Amount', render: value => printMoney(value)
    }
];

export const personLoansSumHeadCells: XHeadCell[] = [...contactLoanSumHeaderCells.filter(it => {
    return it.name !== 'applicantId'
})];


export const contactPrevHeaderCells: XHeadCell[] = [
    {
        name: 'id', label: 'ID', render: value => <LoanLink id={value} name={trimGuid(value)}/>,
        cellProps: {style: {width: 70}}
    },
    {
        name: 'applicationDate', label: 'Date', render: printDate
    },
    {
        name: 'status', label: 'Status',
        render: renderStatus
    },
    {
        name: 'subStatus', label: 'Sub-Status', render: renderSubStatus
    },
    {
        name: 'amount', label: 'Amount', render: value => printMoney(value)
    }
];

export const personPrevHeaderCells: XHeadCell[] = [...contactPrevHeaderCells.filter(it => {
    return it.name !== 'applicantId'
})];








