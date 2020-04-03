import * as faker from "faker";
import {getRandomStr} from "../../utils/stringHelpers";
import {intRange, randomInt} from "../../utils/numberHelpers";

const uuid = require('uuid/v4');

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
    internalContactId: string
    internalContact: any

    repaymentPlan: IDownPayment[]
    documents: ILoanDocument[]
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

export interface ILoanScore {
    id: string
    decision: LoanScoreDecision
    runDate: Date
    amount: number
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

export interface IUssdMeta {
    sessionId: string
    code: string
    sessionTime: number
    network: string
}

export interface IDownPayment {
    id: string
    payDate: Date
    amount: number
    principle: number
    installment: number
    interestPayment: number
}

export interface ILoanDocument {
    id: string
    category: LoanDocumentCategory
    name: string
    verifierId?: string
    verifier?: any
    dateVerified?: Date
}

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


export const fakeLoan = (): ILoan => {
    const status = faker.random.arrayElement(Object.values(LoanStatus))
    let suStatus = LoanSubStatus.PaidOut
    if(status === LoanStatus.Closed)
        suStatus = LoanSubStatus.Recovered
    else if(status === LoanStatus.Open){
        suStatus= faker.random.arrayElement([LoanSubStatus.Overdue,LoanSubStatus.PaidOut])
    }
    else if(status === LoanStatus.Error){
        suStatus= faker.random.arrayElement([
            LoanSubStatus.ReachedLimit,
            LoanSubStatus.PayoutFailure,
            LoanSubStatus.MissingInformation,
            LoanSubStatus.LowCredit,
        ])
    }
    return {
        id: uuid(),
        loanNumber: randomInt(100000, 500000) + '',
        category: faker.random.arrayElement(Object.values(LoanCategory)),
        status: status,
        subStatus: suStatus,
        applicationDate: new Date(),
        releaseDate: faker.date.future(),

        amount: randomInt(100000, 500000),
        durationInMonths: randomInt(1, 12),
        inceptionFee: randomInt(20000, 50000),
        administrationFee: randomInt(10000, 20000),
        interestRate: randomInt(8, 20),
        repaymentCycle: faker.random.arrayElement(Object.values(RepaymentCycle)),

        referenceNumber: randomInt(100000, 800000) + '',
        disbursementCategory: faker.random.arrayElement(Object.values(DisbursementCategory)),

        applicantId: getRandomStr(10),
        applicant: {name: `${faker.name.firstName()} ${faker.name.lastName()}`},

        assigneeId: getRandomStr(10),
        assignee: {name: `${faker.name.firstName()} ${faker.name.lastName()}`},

        agentId: getRandomStr(10),
        agent: {name: `${faker.name.firstName()} ${faker.name.lastName()}`},

        internalContactId: getRandomStr(10),
        score: {
            amount: randomInt(100000, 500000),
            decision: faker.random.arrayElement(Object.values(LoanScoreDecision)),
            id: uuid(),
            model: 'FICO score',
            remarks: faker.lorem.sentence(5),
            runDate: new Date()
        },
        request: {
            id: uuid(),
            category: RequestCategory.Ussd,
            entryDate: new Date(),
            userId: faker.phone.phoneNumber('07########'),
            metaData: {
                sessionId: faker.phone.phoneNumber('U7########'),
                code: '*156#',
                sessionTime: randomInt(60, 180),
                network: faker.random.arrayElement(['MTN', 'AIRTEL', 'AFRICELL']),
            }
        },
        internalContact: {name: `${faker.name.firstName()} ${faker.name.lastName()}`},
        repaymentPlan: intRange(1, 4).map(fakeDownPayment),
        documents: intRange(1, 3).map(fakeLoanDocument),
    }
}

export const fakeDownPayment = (): IDownPayment => {
    return {
        id: uuid(),
        amount: randomInt(20000, 50000),
        payDate: faker.date.future(),
        principle: randomInt(20000, 50000),
        installment: randomInt(20000, 50000),
        interestPayment: randomInt(20000, 50000),
    }
}

export const fakeLoanDocument = (): ILoanDocument => {
    return {
        id: uuid(),
        category: faker.random.arrayElement(Object.values(LoanDocumentCategory)),
        name: ''
    }
}
