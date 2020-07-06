import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";
import {COMPANY_NAME} from "../data/constants";
import {linkColor} from "../theme/custom-colors";

export function Copyright() {
    return (
        <Typography variant="body2" color="inherit" align="center">
            {'Copyright © '}
            <Link style={{color: linkColor}} href="https://iotec.io">
                {COMPANY_NAME}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
