import {errorColor, successColor, warningColor} from "../../../theme/custom-colors";
import Chip from "@material-ui/core/Chip";
import React from "react";
import {InvoiceStatus} from "./types";
import {XHeadCell} from "../../../components/table/XTableHead";
import InvoiceLink from "../../../components/links/InvoiceLink";
import ContactLink from "../../../components/links/ContactLink";
import {printDateTime} from "../../../utils/dateHelpers";

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
