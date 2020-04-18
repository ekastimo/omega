export interface IInvoice {
    status: string;
    comments: string;
    invoiceData: string;
    invoiceNumber: number;
    organizationId: string;
    organization: any;
    individualId: string;
    individual: any;
    id: string;
    createdAt: Date;
}
