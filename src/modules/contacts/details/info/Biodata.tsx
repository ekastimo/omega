import React, {useState} from 'react';
import {ContactCategory, IContact} from "../../types";
import DetailView, {IRec} from "../../../../components/DetailView";
import {printDate} from "../../../../utils/dateHelpers";
import PersonIcon from '@material-ui/icons/PermIdentity';
import EditIconButton, {DeleteIconButton} from "../../../../components/EditIconButton";
import EditDialog from "../../../../components/EditDialog";
import PersonEditor from "../editors/PersonEditor";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

interface IProps {
    data: IContact
}

export const idFields = (data: IContact): IRec[] => {
    if (data.category === ContactCategory.Person) {
        const {person} = data
        return [
            {
                label: 'BirthDay',
                value: printDate(person.dateOfBirth)
            },
            {
                label: 'Gender',
                value: person.gender
            },
            {
                label: 'Marital Status',
                value: person.civilStatus
            }
        ]
    } else {
        const {company} = data
        return [
            {
                label: 'Category',
                value: printDate(company.category)
            },
            {
                label: 'Employees',
                value: company.numberOfEmployees
            }
        ]
    }

}

const BioData = ({data}: IProps) => {
    const [dialog, setDialog] = useState(false)
    const {id = ''} = data

    const handleClick = () => {
        setDialog(true)
    }

    const handleClose = () => {
        setDialog(false)
    }

    const displayData = idFields(data);
    const title = <div style={{display: 'flex', flexDirection: 'row'}}>
        <PersonIcon fontSize='small'/><Typography variant='body2'>&nbsp;<b>Basic data</b></Typography>
    </div>
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Box display="flex" px={1}>
                    <Box flexGrow={1} pt={1}>
                        {title}
                    </Box>
                    <Box>
                        <EditIconButton onClick={handleClick}/>
                    </Box>
                </Box>
                <Divider/>
            </Grid>
            <Grid item xs={12}>
                <Box p={1}>
                    <DetailView data={displayData}/>
                </Box>
            </Grid>
            <EditDialog title='Edit Basic Data' open={dialog} onClose={handleClose}>
                <PersonEditor data={data.person} contactId={id} done={handleClose}/>
            </EditDialog>
        </Grid>
    );
}
export default BioData;
