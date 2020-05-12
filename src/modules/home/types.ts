export interface ILoanSettings {
    maxAmount: number
    minAmount: number
    interestRate: number
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


