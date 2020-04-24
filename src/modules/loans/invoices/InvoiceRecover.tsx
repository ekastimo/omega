import React, {useState} from 'react';
import {Box} from "@material-ui/core";
import {postFile} from "../../../utils/ajax";
import {remoteRoutes} from "../../../data/constants";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Toast from "../../../utils/Toast";
import TextField from "@material-ui/core/TextField";
import {hasNoValue, hasValue} from "../../../components/inputs/inputHelpers";
import {IInvoice} from "./types";
import CodeView from "../../../components/CodeView";

interface IProps {
    onComplete: (data: IInvoice) => any
    onCancel?: () => any
    data: IInvoice
}

const InvoiceRecover = (props: IProps) => {

    const [loading, setLoading] = useState<boolean>(false)
    const [files, setFiles] = useState<FileList | null>(null)

    function handleSubmit() {
        if(files===null){
            Toast.info("Please select a file")
            return
        }
        setLoading(true)
        let formData = new FormData()
        formData.append('file', files[0])
        formData.append('id', props.data.id)
        postFile(remoteRoutes.invoicesPay, formData, resp => {
            Toast.info("Invoice paid")
            props.onComplete(resp)
        }, undefined, () => {
            setLoading(false)
        })
    }

    function handleFileChange(e: any) {
        const files: FileList = e.target.files
        if (hasValue(files)) {
            setFiles(files)
        }
    }
    return (
        <Box px={2} pb={2}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        type='file'
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onChange={handleFileChange}
                        inputProps={{
                            accept:"image/jpeg,image/gif,image/png,application/pdf"
                        }}

                    />
                </Grid>
                <Grid item xs={12}>
                    <Box display='flex' flexDirection="row-reverse">
                        <Button
                            disabled={loading || hasNoValue(files)}
                            onClick={handleSubmit}
                            variant='outlined'
                            color='primary'
                        >Recover invoice</Button>
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

export default InvoiceRecover;
