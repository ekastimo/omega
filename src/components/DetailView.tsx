import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {chunkArray} from "../utils/arrayHelpers";
import DataLabel from "./DataLabel";
import DataValue from "./DataValue";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import EditIconButton, {AddIconButton, DeleteIconButton} from "./EditIconButton";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import {trimString} from "../utils/stringHelpers";
import EditDialog from "./EditDialog";
import EmailEditor from "../modules/contacts/details/editors/EmailEditor";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%'
        },
        row: {},
        col: {
            paddingBottom: theme.spacing(1),
        }
    }),
);

export interface IRec {
    label: string
    value: any
}

interface IProps {
    data: IRec[]
    columns?: number,
    useGrid?: boolean
}

const TableView = ({data, useGrid = false}: IProps) => {
    const classes = useStyles();
    console.log("Use grid",{useGrid})
    if (useGrid)
        return (
            <Grid container spacing={0}>
                {data.map(it => (
                    <Grid item xs={12} key={it.label}>
                        <Box display="flex" pb={1}>
                            <Box flexGrow={1}>
                                <Typography variant='body1' noWrap >{it.value}</Typography>
                                <Typography variant='caption'>{it.label}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        )
    return (
        <table className={classes.root}>
            <tbody>
            {data.map(row => row.label !== '' ? (
                <tr key={row.label}>
                    <td className={classes.col} style={{width:80,padding:0}}>
                        <DataLabel>
                            {row.label}
                        </DataLabel>
                    </td>
                    <td className={classes.col} style={{padding:0}}>
                        <DataValue>
                            {row.value}
                        </DataValue>
                    </td>
                </tr>
            ) : <tr>
                <td colSpan={2}/>
                &nbsp;</tr>)}
            </tbody>
        </table>
    );

}

const DetailView = ({data, columns,useGrid}: IProps) => {
    const classes = useStyles();
    if (columns) {
        const parts = chunkArray(data, columns)
        return (
            <table className={classes.root}>
                <tbody>
                <tr >
                    {
                        parts.map((part, index) => (
                            <td key={index} style={{verticalAlign: 'top'}}>
                                <TableView data={part} useGrid={useGrid}/>
                            </td>
                        ))
                    }
                </tr>
                </tbody>
            </table>
        );
    } else {
        return <TableView data={data} useGrid={useGrid}/>
    }
}


export default DetailView;
