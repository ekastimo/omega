import {AUTH_KEY_TOKEN, AUTH_KEY_USER} from "../constants";
import {CoreState, LoginResponse} from "../types";
import {homeSteps} from "../../modules/home/types";

const initialState: CoreState = {
    splash: true,
    user: null,
    isLoadingUser: true,
    globalLoader: false,
    token: null,
    home: {step: homeSteps.CHOOSE_AMOUNT}
}

export const coreConstants = {
    coreLogin: "CORE_LOGIN",
    startLoading: "CORE_START_LOADING",
    stopLoading: "CORE_STOP_LOADING",
    coreLogout: "CORE_LOGOUT",
    coreStartGlobalLoader: "coreStartGlobalLoader",
    coreStopGlobalLoader: "coreStopGlobalLoader",
    coreHomeSetStep: "coreHomeSetStep"
}

export default function reducer(state = initialState, action: any): CoreState {
    switch (action.type) {
        case coreConstants.coreStartGlobalLoader: {
            return {...state, globalLoader: true}
        }

        case coreConstants.coreStopGlobalLoader: {
            return {...state, globalLoader: false}
        }

        case coreConstants.coreLogin: {
            const {token, user}: LoginResponse = action.payload
            localStorage.setItem(AUTH_KEY_TOKEN, token)
            localStorage.setItem(AUTH_KEY_USER, JSON.stringify(user))
            return {...state, user, isLoadingUser: false, splash: false}
        }

        case coreConstants.coreLogout: {
            localStorage.removeItem(AUTH_KEY_TOKEN)
            localStorage.removeItem(AUTH_KEY_USER)
            return {...state, user: null, isLoadingUser: false, splash: false}
        }

        case coreConstants.stopLoading: {
            return {...state, isLoadingUser: false}
        }

        case coreConstants.startLoading: {
            return {...state, isLoadingUser: true}
        }

        case coreConstants.coreHomeSetStep: {
            const step: number = action.payload
            return {...state, home: {...state.home, step}}
        }

        default: {
            return state
        }
    }
}
