import React from 'react';
import {Typography} from "@material-ui/core";
import {IContact} from "../../types";

interface IProps {
    data:IContact
}

const PreviousLoans = (props: IProps) => {
    return (
        <div>
            <Typography >Prev  Loans</Typography>
        </div>
    );
}


export default PreviousLoans;
