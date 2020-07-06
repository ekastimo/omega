import * as React from "react";
import {useState} from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {toOptions} from "../../../components/inputs/inputHelpers";
import Box from "@material-ui/core/Box";
import TextField from '@material-ui/core/TextField';
import PSelectInput from "../../../components/plain-inputs/PSelectInput";
import {remoteRoutes} from "../../../data/constants";
import {PRemoteSelect} from "../../../components/plain-inputs/PRemoteSelect";
import {useSelector} from "react-redux";
import {AppState, AppUser} from "../../../data/types";
import {isPrimaryUser} from "../../../data/appRoles";
import {cleanComboValue} from "../../../utils/dataHelpers";

interface IProps {
    onFilter: (data: any) => any
    loading: boolean
}

const Filter = ({onFilter, loading}: IProps) => {
    const user:AppUser = useSelector(((state:AppState) =>state.core.user! ))
    const [data, setData] = useState({
        query: '',
        category: '',
        contactType: '',
        email: '',
        phone: '',
        idNumber: '',
        organizationId: '',
    })

    function submitForm(values: any) {
        onFilter(values)
    }

    function handleChange(event: React.ChangeEvent<any>) {
        const name = event.target.name
        const value = event.target.value
        console.log({name, value})
        const newData = {...data, [name]: value}
        setData({...newData})
        submitForm(newData)
    }

    const handleComboChange = (name: string) => (value: any) => {
        const newData = {...data, [name]: value}
        const filterData = {...data, [name]: cleanComboValue(value)}
        setData(newData)
        submitForm(filterData)
    }

    return <form>
        <Grid spacing={3} container>
            <Grid item xs={12}>
                <TextField
                    name="query"
                    value={data['query']}
                    onChange={handleChange}
                    label="Name"
                    variant="outlined"
                    fullWidth
                    size='small'
                />
            </Grid>
            {
                isPrimaryUser(user)&&
                <Grid item xs={12}>
                    <PSelectInput
                        name="category"
                        value={data['category']}
                        onChange={handleChange}
                        label="Categories"
                        variant="outlined"
                        size='small'
                        options={toOptions(['Company', 'Person'])}
                    />
                </Grid>
            }
            <Grid item xs={12}>
                <TextField
                    name="email"
                    value={data['email']}
                    onChange={handleChange}
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
                    value={data['phone']}
                    onChange={handleChange}
                    label="Phone"
                    type="text"
                    variant='outlined'
                    size='small'
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    name="idNumber"
                    value={data['idNumber']}
                    onChange={handleChange}
                    label="Id Number"
                    type="text"
                    variant='outlined'
                    size='small'
                    fullWidth
                />
            </Grid>
            {
                isPrimaryUser(user)&&
                <Grid item xs={12}>
                    <PRemoteSelect
                        name="organizationId"
                        value={data['organizationId']}
                        onChange={handleComboChange('organizationId')}
                        label="Company"
                        remote={remoteRoutes.contactsCompany}
                        variant='outlined'
                        margin='none'
                        textFieldProps={
                            {size: "small"}
                        }

                        parser={it => it}
                        filter={{}}
                    />
                </Grid>
            }

            <Grid item xs={12}>
                <Box display="flex" flexDirection="row-reverse">
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
