import {ICrmState} from "./redux/crm/reducer";
import {ILoanState} from "./redux/loans/reducer";
import {IHomeState} from "../modules/home/types";


export interface BaseModel {
    id: string
    createdAt: Date
    lastUpdated?: Date
    isDeleted: boolean
}


export interface ComboModel {
    id: string
    name: string
}

export interface AppUser {
    id: string
    avatar: string
    username: string
    email: string
    fullName: string
    roles: string[]
}

export interface LoginResponse {
    token: string
    user: AppUser
}

export interface AppState {
    core: CoreState
    crm: ICrmState
    loans: ILoanState

}

export interface CoreState {
    user: AppUser | null
    token: string | null
    splash: boolean,
    isLoadingUser: boolean,
    globalLoader: boolean,
    home: IHomeState
}

export interface BaseSearch {
    limit: number,
    skip: number,
    query?: string
}

export interface IXDocument {
    name: string;
    contentType: string;
    originalName: string;
    description: string;
    size: string;
    organizationId: string;
    id: string;
    createdAt: Date;
}


