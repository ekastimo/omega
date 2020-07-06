import {ILoanPayment} from "./types";
import {printInteger} from "../../utils/numberHelpers";
import {ILoanSettings} from "../loans/types";

export const computeLoanPayment = (amount: number, settings: ILoanSettings): ILoanPayment => {

    const amm = Number(amount)
    const intRt = Number(settings.interestRate)

    const interest = ((amm * intRt) / 100);
    return {
        amount: amm,
        interest,
        totalPayment: amm + interest
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

