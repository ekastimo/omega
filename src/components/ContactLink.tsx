import React from 'react';
import {Link} from "react-router-dom";
import {localRoutes} from "../data/constants";
import {useTheme} from "@material-ui/core";

interface IProps {
    id: string
    name: string
}

const ContactLink = ({id, name}: IProps) => {
    const theme =useTheme()
    return (
        <Link style={{textDecoration: 'none' ,color:"#428bca"}} to={`${localRoutes.contacts}/${id}`}>{name}</Link>
    );
};

export default ContactLink
