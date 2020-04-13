export enum LoanDocumentCategory {
    Contract = 'Contract',
    Paycheck = 'Paycheck',
    Identification = 'Identification',
    TaxClearance = 'TaxClearance',
}

export enum LoanSubStatus {

    MissingInformation = 'MissingInformation',
    LowCredit = 'LowCredit',
    ReachedLimit = 'ReachedLimit',
    PayoutFailure = 'PayoutFailure',

    PaidOut = 'PaidOut',
    Overdue = 'Overdue',

    Recovered = 'Recovered',
}

export enum LoanStatus {
    Open = 'Open',
    Closed = 'Closed',
    Error = 'Error'
}

export enum RepaymentCycle {
    Daily = 'Daily',
    Weekly = 'Weekly',
    BiWeekly = 'BiWeekly',
    Monthly = 'Monthly',
    BiMonthly = 'BiMonthly',
    Quarterly = 'Quarterly',
    Yearly = 'Yearly'
}

export enum LoanCategory {
    Salary = 'Salary'
}

export enum DisbursementCategory {
    MobileMoney = 'MobileMoney',
    Cash = 'Cash',
    Cheque = 'Cheque',
    WireTransfer = 'WireTransfer'
}

export enum LoanScoreDecision {
    Approved = 'Approved',
    Manual = 'Manual',
    Declined = 'Declined'
}

export enum RequestCategory {
    Ussd = 'Ussd',
    MobileApp = 'MobileApp',
    WebApp = 'WebApp'
}

export interface ILoanFilter {
    id?: string
    referenceNumber?: string
    externalReference?: string
    userId?: string
    applicantId?: string
    organizationId?: string
    assignee?: string
    showNew?: boolean
    showAssigned?: boolean
    statuses?: string[]
    from?: Date | null
    to?: Date | null
    subStatuses?: string[]
    categories?: string[]
}

export interface ILoan {
    id: string
    loanNumber: string
    category: LoanCategory
    status: LoanStatus
    subStatus: LoanSubStatus
    applicationDate: Date
    releaseDate: Date

    amount: number
    durationInMonths: number
    inceptionFee: number
    administrationFee: number
    interestRate: number
    repaymentCycle: RepaymentCycle
    score: ILoanScore
    request: ILoanRequest

    referenceNumber: string
    disbursementCategory: DisbursementCategory

    //People
    applicantId: string
    applicant: any
    assigneeId: string
    assignee: any
    agentId: string
    agent: any

    payout: IPayout
    recovery: IRecovery
    repaymentPlan: IDownPayment[]
    documents: ILoanDocument[]
}


export interface ILoanScore {
    id: string
    decision: LoanScoreDecision
    runDate: Date
    offerAmount: number
    model: string
    remarks: string
}

export interface ILoanScore {
    id: string
    decision: LoanScoreDecision
    runDate: Date
    offerAmount: number
    model: string
    remarks: string
}

export interface ILoanRequest {
    id: string
    category: RequestCategory
    entryDate: Date
    userId: string
    metaData: any
}

export enum DownPaymentStatus {
    Pending = 'Pending', Paid = 'Paid', Overdue = 'Overdue'
}

export interface IDownPayment {
    status: DownPaymentStatus;
    amount: number;
    interestPayment: number;
    paymentDate: Date;
    loanId: string;
    id: string;
    createdAt: Date;
}

export interface IRecovery {
    officerId: string;
    officer: any;
    transactionId: string;
    transactionDate: Date;
    remarks: string;
    loanId: string;
    id: string;
    createdAt: Date;
}

export enum PayoutStatus {
    Success = 'Success',
    Failed = 'Failed'
}

export interface IPayout {
    category: string;
    status: PayoutStatus;
    amount: number;
    vendor: string;
    externalId: string;
    transactionId: string;
    transactionDate: Date;
    message: string;
    loanId: string;
    id: string;
    createdAt: Date;
}

export interface IRecoverResponse {
    recovery: IRecovery
    repaymentPlan: IDownPayment[]
}

export interface ILoanDocument {
    id: string
    category: LoanDocumentCategory
    name: string
    verifierId?: string
    verifier?: any
    dateVerified?: Date
}

