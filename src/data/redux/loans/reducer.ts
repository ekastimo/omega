import {ILoan, ILoanSettings, IPayout, IRecoverResponse} from "../../../modules/loans/types";

export const loanConstants = {
    loanFetchAll: "loanFetchAll",
    loanFetchRecent: "loanFetchRecent",
    loanFetchLoading: "loanFetchLoading",
    loanFetchOne: "loanFetchOne",
    loanTriggerPayment: "loanTriggerPayment",
    loanTriggerRecover: "loanTriggerRecover",
    loanAddSettings: "loanAddSettings"
}

export interface ILoanState {
    data: ILoan[]
    recent: ILoan[]
    selected?: ILoan
    loanSettings: ILoanSettings
}

const initialState: ILoanState = {
    data: [],
    recent: [],
    selected: undefined,
    loanSettings: {
        maxAmount: 1000000,
        interestRate: 8.5,
        minAmount: 100000,
        stepAmount: 10000
    }
}

export default function reducer(state = initialState, action: any): ILoanState {
    switch (action.type) {
        case loanConstants.loanFetchRecent: {
            const recent: ILoan[] = action.payload
            return {...state, recent}
        }

        case loanConstants.loanFetchAll: {
            const data: ILoan[] = action.payload
            return {...state, data}
        }


        case loanConstants.loanFetchOne: {
            const selected: ILoan = action.payload
            return {...state, selected}
        }

        case loanConstants.loanTriggerPayment: {
            const payout: IPayout = action.payload
            if (state.selected) {
                return {...state, selected: {...state.selected, payout}}
            }
            return state
        }

        case loanConstants.loanTriggerRecover: {
            const selected: ILoan = action.payload
            return {...state, selected}
        }

        case loanConstants.loanAddSettings: {
            const loanSettings: ILoanSettings = action.payload
            return {...state, loanSettings}
        }

        default: {
            return state
        }
    }
}


export function loanActionPayout(payload: IPayout) {
    return {
        type: loanConstants.loanTriggerPayment,
        payload
    }
}

export function loanActionRecover(payload: IRecoverResponse) {
    return {
        type: loanConstants.loanTriggerRecover,
        payload
    }
}

export const addLoanSettings = (payload: ILoanSettings) => {
    return {
        type: loanConstants.loanAddSettings,
        payload
    }
}
