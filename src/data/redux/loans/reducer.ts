import {ILoan, IPayout, IRecoverResponse} from "../../../modules/loans/types";

export const loanConstants = {
    loanFetchAll: "loanFetchAll",
    loanFetchRecent: "loanFetchRecent",
    loanFetchLoading: "loanFetchLoading",
    loanFetchOne: "loanFetchOne",
    loanTriggerPayment: "loanTriggerPayment",
    loanTriggerRecover: "loanTriggerRecover",
}

export interface ILoanState {
    data: ILoan[]
    recent: ILoan[]
    selected?: ILoan
}

const initialState: ILoanState = {
    data: [],
    recent: [],
    selected: undefined
}

export default function reducer(state = initialState, action: any) {
    switch (action.type) {
        case loanConstants.loanFetchRecent: {
            const recent: ILoan[] = action.payload
            return {...state, recent}
        }

        case loanConstants.loanFetchAll: {
            const data: ILoan[] = action.payload
            return {...state, data, loading: false,}
        }


        case loanConstants.loanFetchOne: {
            const selected: ILoan = action.payload
            return {...state, selected}
        }

        case loanConstants.loanTriggerPayment: {
            const payout: IPayout = action.payload
            return {...state, selected: {...state.selected, payout}}
        }

        case loanConstants.loanTriggerRecover: {
            const selected: ILoan = action.payload
            return {...state, selected}
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
