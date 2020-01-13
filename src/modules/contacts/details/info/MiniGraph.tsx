import React from 'react';
import {Typography} from "@material-ui/core";
import {IContact} from "../../types";

interface IProps {
    data:IContact
}

const MiniGraph = (props: IProps) => {
    return (
        <div>
            <Typography >Graph  Loans</Typography>
        </div>
    );
}


export default MiniGraph;
