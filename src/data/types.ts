import {ICrmState} from "./redux/contacts/reducer";
import {ILoanState} from "./redux/loans/reducer";

export interface BaseModel {
    id: string
    createdAt: Date
    lastUpdated?: Date
    isDeleted: boolean
}

export interface IAuthUser {
    id: string
    avatar: string
    username: string
    email: string
    fullName: string
    roles: string[]
}

export interface ILoginResponse {
    token: string
    user: IAuthUser
}

export interface IState {
    core: ICoreState
    crm: ICrmState
    loans: ILoanState
}

export interface ICoreState {
    user: IAuthUser
    token: string
}

export interface ISearch {
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

