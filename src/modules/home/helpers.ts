import {ILoanPayment, ILoanSettings} from "./types";
import {printInteger} from "../../utils/numberHelpers";

export const computeLoanPayment = (amount: number, settings: ILoanSettings): ILoanPayment => {
    const interest = ((amount * settings.interestRate) / 100);
    return {
        amount,
        interest,
        totalPayment: amount + interest
    }
}


export const createMessage = (payment: ILoanPayment, settings: ILoanSettings): string => {
    return `
    You have requested for <b>UGX${printInteger(payment.amount)}</b> only&nbsp;
    at an interest rate of <b>${settings.interestRate}%</b> .<br/>
    A total of <b>UGX${printInteger(payment.totalPayment)}</b> will be automatically&nbsp;
    deducted from your salary at the end of the month.<br/>
    `
}

