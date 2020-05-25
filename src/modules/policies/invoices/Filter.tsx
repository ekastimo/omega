import * as React from "react";
import {useState} from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {toOptions} from "../../../components/inputs/inputHelpers";
import {Box} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import PSelectInput from "../../../components/plain-inputs/PSelectInput";
import {enumToArray} from "../../../utils/stringHelpers";
import {InvoiceStatus} from "./types";
import PDateInput from "../../../components/plain-inputs/PDateInput";

interface IProps {
    onFilter: (data: any) => any
    loading: boolean
}

const Filter = ({onFilter, loading}: IProps) => {
    const [data, setData] = useState({
        status: '',
        from: null,
        to: null,
        client: '',
        invoiceNumber: ''
    })

    function submitForm() {
        onFilter(data)
    }

    function handleChange(event: React.ChangeEvent<any>) {
        const name = event.target.name
        const value = event.target.value
        const newData = {...data, [name]: value}
        setData({...newData})
        //onFilter({...newData})
    }

    const handleValueChange = (name: string) => (value: any) => {
        const newData = {...data, [name]: value}
        setData({...newData})
        //onFilter({...newData})
    }

    return <form>
        <Grid spacing={2} container>
            <Grid item xs={12}>
                <TextField
                    name="invoiceNumber"
                    value={data['invoiceNumber']}
                    onChange={handleChange}
                    label="Invoice No"
                    variant="outlined"
                    fullWidth
                    size='small'
                />
            </Grid>
            <Grid item xs={12}>
                <PSelectInput
                    name="status"
                    value={data['status']}
                    onChange={handleChange}
                    label="Status"
                    variant="outlined"
                    size='small'
                    options={toOptions(enumToArray(InvoiceStatus))}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    name="client"
                    value={data['client']}
                    onChange={handleChange}
                    label="Email"
                    type="email"
                    variant='outlined'
                    size='small'
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <PDateInput
                    name="from"
                    value={data['from'] || null}
                    onChange={handleValueChange('from')}
                    label="From"
                    variant="inline"
                    inputVariant='outlined'
                />
            </Grid>
            <Grid item xs={12}>
                <PDateInput
                    name="to"
                    value={data['to'] || null}
                    onChange={handleValueChange('to')}
                    label="To"
                    variant="inline"
                    inputVariant='outlined'
                />
            </Grid>
            <Grid item xs={12}>
                <Box display="flex" flexDirection="row-reverse">
                    <Button
                        disabled={loading}
                        variant="outlined"
                        color="primary"
                        onClick={submitForm}>Apply Filter</Button>
                </Box>
            </Grid>
        </Grid>
    </form>

}

export default Filter
