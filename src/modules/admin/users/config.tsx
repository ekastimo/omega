import {ComboModel} from "../../../data/types";
import {hasValue} from "../../../components/inputs/inputHelpers";
import {XHeadCell} from "../../../components/table/XTableHead";
import {Avatar} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {Option} from "../../../components/inputs/option";

export interface UserListModel {
    id: string;
    contactId: string;
    organizationId: string;
    organization: ComboModel;
    username: string;
    email: string;
    fullName: string;
    roles: string[];
}

export interface UserListMobileModel {
    id: string;
    avatar: any
    primary: any
    secondary: any
}

export interface UserEditModel {
    id: string;
    fullName: string;
    contact: ComboModel;
    username: string;
    roles: Option[];
}

export const columns: XHeadCell[] = [
    {
        name: 'avatar',
        label: 'Avatar',
        render: (data, row) => {
            const hasAvatar = hasValue(data)
            return hasAvatar ?
                <Avatar
                    alt="Avatar"
                    src={data}
                /> : <Avatar>{row.fullName[0]?.toUpperCase()}</Avatar>
        },
        cellProps: {
            width: 50
        }
    },
    {
        name: 'username',
        label: 'Username'
    },
    {
        name: 'fullName',
        label: 'Full Name',
        cellProps: {
            component: "th", scope: "row"
        }
    }, {
        name: 'roles',
        label: 'Roles',
        render: (roles: string[]) => roles.map(it => (
            <Chip
                color='primary'
                variant='outlined'
                key={it}
                style={{margin: 5, marginLeft: 0, marginTop: 0}}
                size='small'
                label={it}
            />
        ))
    },
]


export const toMobile = (data: UserListModel): UserListMobileModel => {
    return {
        id: data.id,
        avatar: <Avatar>{data.fullName[0]?.toUpperCase()}</Avatar>,
        primary: data.fullName,
        secondary: <>
            <Typography variant='caption' color='textSecondary'>{data.email}</Typography>
        </>,
    }
}



