import React from 'react';
import {Link} from "react-router-dom";
import {localRoutes} from "../../data/constants";
import {useTheme} from "@material-ui/core";
import {linkColor} from "../../theme/custom-colors";

interface IProps {
    id: string
    name: string
    title?: string
}

const ContactLink = ({id, name,title}: IProps) => {
    const theme =useTheme()
    return (
        <Link style={{textDecoration: 'none' ,color:linkColor}} to={`${localRoutes.contacts}/${id}`} title={title}>{name}</Link>
    );
};

export default ContactLink
