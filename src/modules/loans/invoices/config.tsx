import {errorColor, successColor, warningColor} from "../../../theme/custom-colors";
import Chip from "@material-ui/core/Chip";
import React from "react";
import {IInvoice, InvoiceStatus} from "./types";
import {XHeadCell} from "../../../components/table/XTableHead";
import InvoiceLink from "../../../components/links/InvoiceLink";
import ContactLink from "../../../components/links/ContactLink";
import {printDate, printDateTime} from "../../../utils/dateHelpers";
import {IRec} from "../../../components/DetailView";
import {printMoney} from "../../../utils/numberHelpers";

export const renderInvoiceStatus = (value: InvoiceStatus) => {
    let color: any = successColor
    switch (value) {
        case InvoiceStatus.Paid:
            color = successColor
            break
        case InvoiceStatus.Posted:
            color = errorColor
            break
        case InvoiceStatus.Generated:
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

export const renderInvoiceNumber = (num: number) => '#' + `${num}`.padStart(4, '0')


export const columns: XHeadCell[] = [
    {
        name: 'invoiceNumber',
        label: 'No.',
        render: (data, rec) => <InvoiceLink name={renderInvoiceNumber(data)} id={rec.id}/>,
        cellProps: {
            width: 50
        }
    },
    {
        name: 'organization',
        label: 'Client',
        render: (data) => <ContactLink name={data.name} id={data.id}/>
    },
    {
        name: 'status',
        label: 'Status',
        render: renderInvoiceStatus
    },
    {
        name: 'issueDate',
        label: 'Issue Date',
        render: printDateTime
    },
    {
        name: 'dueDate',
        label: 'Issue Date',
        render: printDateTime
    }
]


export const dataFields = (data: IInvoice): IRec[] => {
    return [
        {
            label: 'Created at',
            value: printDate(data.createdAt)
        },
        {
            label: 'Issued to',
            value: <ContactLink name={data.organization?.name} id={data.organization?.id}/>
        },
        {
            label: 'Issue date',
            value: printDate(data.issueDate)
        },
        {
            label: 'Issue date',
            value: printDate(data.dueDate)
        },
        {
            label: 'Invoice No',
            value: `${data.invoiceNumber}`.padStart(4, "0")
        }
        ,
        {
            label: 'Amount',
            value: printMoney(data.amount)
        },
        {
            label: 'Comments',
            value: data.comments
        }
    ]
}
