import * as React from "react";
import {useState} from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {toOptions} from "../../../components/inputs/inputHelpers";
import {Box} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import PSelectInput from "../../../components/plain-inputs/PSelectInput";

interface IProps {
    onFilter: (data: any) => any
    loading: boolean
}

const Filter = ({onFilter, loading}: IProps) => {
    const [data, setData] = useState({
        name: '',
        categories: [],
        contactType: '',
        email: '',
        phone: '',
        nin: ''
    })

    function submitForm(values: any) {
        onFilter(values)
    }

    function handleChange(event: React.ChangeEvent<any>) {
        const name = event.target.name
        const value = event.target.value
        const newData = {...data, [name]: value}
        setData({...newData})
        submitForm(newData)
    }

    return <form>
        <Grid spacing={3} container>
            <Grid item xs={12}>
                <TextField
                    name="name"
                    onChange={handleChange}
                    label="Name"
                    value=''
                    variant="outlined"
                    fullWidth
                    size='small'
                />
            </Grid>
            <Grid item xs={12}>
                <PSelectInput
                    name="nin"
                    label="Categories"
                    variant="outlined"
                    size='small'
                    value=''
                    options={toOptions(['Company', 'Person'])}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    name="email"
                    label="Email"
                    type="email"
                    variant='outlined'
                    size='small'
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    name="phone"
                    label="Phone"
                    type="text"
                    variant='outlined'
                    size='small'
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    name="nin"
                    label="NIN"
                    type="text"
                    variant='outlined'
                    size='small'
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <Box display="flex" flexDirection="row-reverse" >
                    <Button
                        disabled={loading}
                        variant="outlined"
                        color="primary"
                        onClick={submitForm}>Excel Export</Button>
                </Box>
            </Grid>
        </Grid>
    </form>

}

export default Filter
