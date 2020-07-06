import {coreConstants} from "./coreReducer";
import {createAction} from "@reduxjs/toolkit";
import {LoginResponse} from "../types";

export const doLogin =  createAction<LoginResponse>(coreConstants.coreLogin)

export const handleLogout = createAction(coreConstants.coreLogout)


export const startLoading = () => {
    return {
        type: coreConstants.startLoading,
    }
}

export const stopLoading = () => {
    return {
        type: coreConstants.stopLoading,
    }
}

export const coreStartGlobalLoader = () => {
    return {
        type: coreConstants.coreStartGlobalLoader,
    }
}

export const coreStopGlobalLoader = () => {
    return {
        type: coreConstants.coreStopGlobalLoader,
    }
}

export const coreSetHomeStep = (step: number) => {
    return {
        type: coreConstants.coreHomeSetStep,
        payload: step,
    }
}






