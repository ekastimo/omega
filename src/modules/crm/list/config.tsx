import {XHeadCell} from "../../../components/table/XTableHead";
import ContactLink from "../../../components/links/ContactLink";
import {getEmail, getNin, getPhone, IContact, renderName} from "../types";
import React from "react";
import EmailLink from "../../../components/links/EmalLink";

export const columns: XHeadCell[] = [
    {name: 'name', label: 'Name', render: (value, rec) => <ContactLink id={rec.id} name={value}/>},
    {name: 'category', label: 'Category'},
    {name: 'idNumber', label: 'TIN/NIN',},
    {name: 'email', label: 'Email', render: (value) => <EmailLink value={value}/>},
    {name: 'phone', label: 'Phone'}
];

const parseData = (data: IContact): any => {
    return {
        id: data.id,
        name: renderName(data),
        category: data.category,
        idNumber: getNin(data),
        email: getEmail(data),
        phone: getPhone(data),
        organization: data.organization?.name,
        organizationId: data.organization?.id,
    }
}

export const parseListData = (data: IContact[]): any => {
    return data.map(parseData)
}
