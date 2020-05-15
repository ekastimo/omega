export interface ILoanSettings {
    maxAmount: number
    minAmount: number
    interestRate: number
}


export const homeSteps = {
    CHOOSE_AMOUNT: 0,
    APPROVE_PAYOUT: 1
}
export interface IHomeState {
    step: number
}

export interface ILoanPayment {
    amount: number
    interest: number
    totalPayment: number
}

export interface IWebAppLoanRequest {
    phone: string
    category: string
    network: string
    terms: boolean
    amount: number
    sessionId: string
    shortCode: string
}


