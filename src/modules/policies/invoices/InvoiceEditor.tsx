import React, {useState} from 'react';
import {Box} from "@material-ui/core";
import {post} from "../../../utils/ajax";
import {remoteRoutes} from "../../../data/constants";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {Alert} from "@material-ui/lab";
import Toast from "../../../utils/Toast";

interface IProps {
    onComplete: () => any
    onCancel?: () => any
}

const InvoiceEditor = (props: IProps) => {

    const [loading, setLoading] = useState<boolean>(false)

    function handleSubmit() {
        setLoading(true)
        post(remoteRoutes.invoicesGenerate, {}, resp => {
            Toast.info(resp.message)
            props.onComplete()
        }, undefined, () => {
            setLoading(false)
        })
    }

    return (
        <Box px={2} pb={2}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Alert severity='warning'>
                        This will generate invoices for all the loans available in the system.
                        Run this process only if you know what you sre doing
                    </Alert>
                </Grid>
                <Grid item xs={12}>
                    <Box display='flex' flexDirection="row-reverse">
                        <Button
                            disabled={loading}
                            onClick={handleSubmit}
                            variant='outlined'
                            color='primary'
                        >Generate invoice</Button>
                        &nbsp;&nbsp;
                        <Button
                            disabled={loading}
                            onClick={props.onCancel}
                            variant='outlined'
                            color='default'
                        >Cancel</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default InvoiceEditor;
