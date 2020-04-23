export interface IInvoice {
    status: InvoiceStatus;
    comments: string;
    invoiceData: string;
    invoiceNumber: number;
    amount: number;
    organizationId: string;
    organization: any;
    individualId: string;
    individual: any;
    id: string;
    createdAt: Date;
    issueDate: Date;
    dueDate: Date;
}


export enum InvoiceStatus {
    Generated = 'Generated', Posted = 'Posted', Paid = 'Paid'
}
