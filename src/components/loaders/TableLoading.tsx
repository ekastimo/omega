import React from 'react';
import {Skeleton} from "@material-ui/lab";
import Divider from "@material-ui/core/Divider";

interface IProps {
    height?: number
    rows?: number
}

const TableLoading = ({rows = 10, height = 50}: IProps) => {
    const list = [];
    for (let i = 1; i <= rows; i++) {
        list.push(i);
    }
    return (
        <div>
            {list.map(it => {
                return <div key={it} style={{marginBottom:3}}>
                    <Skeleton variant="rect" width='100%' height={height}/>
                    <Divider/>
                </div>
            })}
        </div>
    );
}

export default TableLoading;
