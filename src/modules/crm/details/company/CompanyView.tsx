import React, {useState} from 'react';
import {ICompany, IContact} from "../../types";
import {DetailViewX, IRec} from "../../../../components/DetailView";
import {printDate} from "../../../../utils/dateHelpers";
import PersonIcon from '@material-ui/icons/PermIdentity';
import EditIconButton from "../../../../components/EditIconButton";
import EditDialog from "../../../../components/EditDialog";

import Grid from "@material-ui/core/Grid";
import SectionTitle from "../info/SectionTitle";
import CompanyEditor from "./CompanyEditor";

interface IProps {
    data: IContact
}

export const createFields = (company: ICompany): IRec[] => {
    return [
        {
            label: 'Category',
            value: company.category
        },
        {
            label: 'D.O.Inc',
            value: printDate(company.dateOfIncorporation)
        },
        {
            label: 'Employees',
            value: company.numberOfEmployees
        },
        {
            label: 'Created On',
            value: printDate(company.createdAt)
        }
    ]
}

const CompanyView = ({data}: IProps) => {
    const [dialog, setDialog] = useState(false)

    const handleClick = () => {
        setDialog(true)
    }

    const handleClose = () => {
        setDialog(false)
    }
    const displayData = createFields(data.company);

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
                <CompanyEditor data={data.company} done={handleClose}/>
            </EditDialog>
        </Grid>
    );
}
export default CompanyView;
