import {XHeadCell} from "../../../components/table/XTableHead";
import ContactLink from "../../../components/links/ContactLink";
import {getEmail, getNin, getPhone, renderName} from "../types";
import React from "react";
import EmailLink from "../../../components/links/EmalLink";

export const columns: XHeadCell[] = [
    {name: 'id', label: 'Name', render: (value, rec) => <ContactLink id={value} name={renderName(rec)}/>},
    {name: 'category', label: 'Category'},
    {name: 'tin', label: 'TIN/NIN', render: (_, rec) => getNin(rec)},
    {name: 'email', label: 'Email', render: (_, rec) => <EmailLink value={getEmail(rec)}/>},
    {name: 'phone', label: 'Phone', render: (_, rec) => getPhone(rec)}
];
