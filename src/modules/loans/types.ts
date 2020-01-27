import * as faker from "faker";
import {getRandomStr} from "../../utils/stringHelpers";
import {intRange, randomInt} from "../../utils/numberHelpers";

const uuid = require('uuid/v4');

export interface ILoan {
    id: string
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

    referenceNumber: string
    disbursementCategory: DisbursementCategory

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
    Approved = 'Approved',
    Declined = 'Declined',
    MissingInformation = 'MissingInformation',
    PaidOut = 'PaidOut',
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
    return {
        id: uuid(),
        category: faker.random.arrayElement(Object.values(LoanCategory)),
        status: faker.random.arrayElement(Object.values(LoanStatus)),
        subStatus: faker.random.arrayElement(Object.values(LoanSubStatus)),
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
        internalContact: {name: `${faker.name.firstName()} ${faker.name.lastName()}`},
        repaymentPlan: intRange(1,4).map(fakeDownPayment),
        documents: intRange(1,3).map(fakeLoanDocument),
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

