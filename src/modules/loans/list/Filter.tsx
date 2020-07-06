import * as React from "react";
import {useState} from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Box} from "@material-ui/core";
import PDateInput from "../../../components/plain-inputs/PDateInput";
import {enumToArray} from "../../../utils/stringHelpers";
import {ILoanFilter, LoanStatus, LoanSubStatus} from "../types";
import PComboInput from "../../../components/plain-inputs/PComboInput";
import {PRemoteSelect} from "../../../components/plain-inputs/PRemoteSelect";
import {remoteRoutes} from "../../../data/constants";
import {useSelector} from "react-redux";
import {AppState} from "../../../data/types";
import {isPrimaryUser} from "../../../data/appRoles";
import {cleanComboValue} from "../../../utils/dataHelpers";

interface IProps {
    onFilter: (data: any) => any
    loading: boolean
}

const Filter = ({onFilter, loading}: IProps) => {
    const user = useSelector((state: AppState) => state.core.user!)
    const [data, setData] = useState<ILoanFilter>({
        from: null,
        to: null,
        categories: [],
        statuses: [],
        subStatuses: [],
        userId: undefined,
        applicantId: undefined,
        assignee: undefined
    })

    function submitForm(values: any) {
        onFilter(values)
    }

    const handleDateChange = (name: string) => (value: Date | null) => {
        if (value) {
            const newData = {...data, [name]: value.toISOString()}
            setData({...newData})
            submitForm(newData)
        } else {
            const newData = {...data, [name]: null}
            setData({...newData})
            submitForm(newData)
        }
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
                <PDateInput
                    name="from"
                    value={data['from'] || null}
                    onChange={handleDateChange('from')}
                    label="From"
                    variant="inline"
                    inputVariant='outlined'
                />
            </Grid>
            <Grid item xs={12}>
                <PDateInput
                    name="to"
                    value={data['to'] || null}
                    onChange={handleDateChange('to')}
                    label="To"
                    variant="inline"
                    inputVariant='outlined'
                />
            </Grid>
            <Grid item xs={12}>
                <PComboInput
                    name="statuses"
                    value={data['statuses'] || null}
                    onChange={handleComboChange('statuses')}
                    label="Status"
                    variant="outlined"
                    size='small'
                    multiple
                    options={enumToArray(LoanStatus)}
                />
            </Grid>
            <Grid item xs={12}>
                <PComboInput
                    name="subStatuses"
                    value={data['subStatuses'] || null}
                    onChange={handleComboChange('subStatuses')}
                    label="Sub Status"
                    variant="outlined"
                    size='small'
                    options={enumToArray(LoanSubStatus)}
                    multiple
                />
            </Grid>
            <Grid item xs={12}>
                <PRemoteSelect
                    name="applicant"
                    value={data['applicantId'] || null}
                    onChange={handleComboChange('applicantId')}
                    label="Applicant"
                    variant='outlined'
                    size='small'
                    remote={remoteRoutes.usersComboAll}
                    fullWidth
                    margin='none'
                    searchOnline
                />
            </Grid>
            {
                isPrimaryUser(user) &&
                <Grid item xs={12}>
                    <PRemoteSelect
                        name="assignee"
                        value={data['assignee'] || null}
                        onChange={handleComboChange('assignee')}
                        label="Assignee"
                        variant='outlined'
                        size='small'
                        remote={remoteRoutes.usersComboPrimary}
                        fullWidth
                        margin='none'
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
