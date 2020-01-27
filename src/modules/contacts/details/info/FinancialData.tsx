import React, {useState} from 'react';
import {IContact} from "../../types";
import DetailView, {IRec} from "../../../../components/DetailView";
import {printDate} from "../../../../utils/dateHelpers";
import MoneyIcon from '@material-ui/icons/Money';
import EditIconButton from "../../../../components/EditIconButton";
import EditDialog from "../../../../components/EditDialog";
import PersonEditor from "../editors/PersonEditor";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import SectionTitle from "./SectionTitle";
import {printMoney} from "../../../../utils/numberHelpers";

interface IProps {
    data: IContact
}

export const idFields = (data: IContact): IRec[] => {
    const {financialData} = data
    return [
        {
            label: 'Net Salary',
            value: printMoney(3720000)
        },
        {
            label: 'Employment Date',
            value: printDate(new Date())
        }
    ]
}

const FinancialData = ({data}: IProps) => {
    const [dialog, setDialog] = useState(false)
    const {id = ''} = data

    const handleClick = () => {
        setDialog(true)
    }

    const handleClose = () => {
        setDialog(false)
    }

    const displayData = idFields(data);

    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <SectionTitle
                    title='Financial Data'
                    editButton={<EditIconButton onClick={handleClick}/>}
                    icon={ <MoneyIcon fontSize='small'/>}
                />
                {/*<Divider/>*/}
            </Grid>
            <Grid item xs={12}>
                <Box >
                    <DetailView data={displayData}/>
                </Box>
            </Grid>
            <EditDialog title='Edit Basic Data' open={dialog} onClose={handleClose}>
                <PersonEditor data={data.person} contactId={id} done={handleClose}/>
            </EditDialog>
        </Grid>
    );
}
export default FinancialData;
