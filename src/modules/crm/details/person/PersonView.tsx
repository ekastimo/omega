import React, {useState} from 'react';
import {IContact, IPerson} from "../../types";
import {DetailViewX, IRec} from "../../../../components/DetailView";
import {printDate} from "../../../../utils/dateHelpers";
import PersonIcon from '@material-ui/icons/PermIdentity';
import EditIconButton from "../../../../components/EditIconButton";
import EditDialog from "../../../../components/EditDialog";
import PersonEditor from "./PersonEditor";
import Grid from "@material-ui/core/Grid";
import SectionTitle from "../info/SectionTitle";
import {printMoney} from "../../../../utils/numberHelpers";

interface IProps {
    data: IContact
}

export const createFields = (person: IPerson): IRec[] => {
    return [
        {
            label: 'D.O.B',
            value: printDate(person.dateOfBirth)
        },
        {
            label: 'Gender',
            value: person.gender
        },
        {
            label: 'Civil status',
            value: person.civilStatus
        },
        {
            label: 'Net salary',
            value: printMoney(person.monthlyNetSalary)
        },
        {
            label: 'Emp. date',
            value: printDate(person.dateOfEmployment)
        }
    ]
}

const PersonView = ({data}: IProps) => {
    const [dialog, setDialog] = useState(false)

    const handleClick = () => {
        setDialog(true)
    }

    const handleClose = () => {
        setDialog(false)
    }
    const displayData = createFields(data.person);

    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <SectionTitle
                    title='Basic data'
                    editButton={<EditIconButton onClick={handleClick} style={{marginTop: 5}}/>}
                    icon={<PersonIcon fontSize='small'/>}
                />
            </Grid>
            <Grid item xs={12} style={{paddingTop: 0}}>
                <DetailViewX data={displayData}/>
            </Grid>
            <EditDialog title='Edit Basic Data' open={dialog} onClose={handleClose}>
                <PersonEditor data={data.person} done={handleClose}/>
            </EditDialog>
        </Grid>
    );
}
export default PersonView;
