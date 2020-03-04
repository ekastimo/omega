import React, {useState} from 'react';
import {ContactCategory, IContact} from "../../types";
import DetailView, {IRec} from "../../../../components/DetailView";
import MoneyIcon from '@material-ui/icons/Money';
import EditIconButton from "../../../../components/EditIconButton";
import EditDialog from "../../../../components/EditDialog";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import SectionTitle from "./SectionTitle";
import AdminViewEditor from "../editors/AdminViewEditor";
import ContactLink from "../../../../components/links/ContactLink";
import {trimString} from "../../../../utils/stringHelpers";
import Typography from "@material-ui/core/Typography";

interface IProps {
    data: IContact
}

export const displayFields = (data: IContact): IRec[] => {
    const {contactPerson, responsibleContact, organization} = data;
    if (data.category === ContactCategory.Person) {
        return [
            {
                label: 'Organization',
                value: organization ? <ContactLink
                    id={organization.id}
                    name={trimString(organization.name, 25)}
                    title={organization.name}
                /> : <Typography>-NA-</Typography>
            },
            {
                label: 'Contact Person',
                value: contactPerson ? <ContactLink
                    id={contactPerson.id}
                    name={trimString(contactPerson.name, 25)}
                    title={contactPerson.name}
                /> : <Typography>-NA-</Typography>
            },
            {
                label: 'Internal Contact',
                value: responsibleContact ? <ContactLink
                    id={responsibleContact.id}
                    name={trimString(responsibleContact.name, 25)}
                    title={responsibleContact.name}
                /> : <Typography>-NA-</Typography>
            }
        ]
    }
    return [
        {
            label: 'Contact Person',
            value: contactPerson ? <ContactLink
                id={contactPerson.id}
                name={trimString(contactPerson.name, 25)}
                title={contactPerson.name}
            /> : <Typography>-NA-</Typography>
        },
        {
            label: 'Internal Contact',
            value: responsibleContact ? <ContactLink
                id={responsibleContact.id}
                name={trimString(responsibleContact.name, 25)}
                title={responsibleContact.name}
            /> : <Typography>-NA-</Typography>
        }
    ]
}


const FinancialData = ({data}: IProps) => {
    const [dialog, setDialog] = useState(false)

    const {contactPerson, responsibleContact, organization} = data;
    const handleClick = () => {
        setDialog(true)
    }

    const handleClose = () => {
        setDialog(false)
    }


    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <SectionTitle
                    title='Admin Data'
                    editButton={<EditIconButton onClick={handleClick} style={{marginTop: 5}}/>}
                    icon={<MoneyIcon fontSize='small'/>}
                />
                {/*<Divider/>*/}
            </Grid>

            <Grid item xs={12}>
                <Box>
                    <Grid item xs={12}>
                        <DetailView data={displayFields(data)}/>
                    </Grid>
                </Box>
            </Grid>
            <EditDialog title="Admin Setup" open={dialog} onClose={handleClose}>
                <AdminViewEditor data={{contactPerson, responsibleContact, organization}}
                                 contactId={data.id}
                                 done={handleClose} contactType={data.category}/>
            </EditDialog>
        </Grid>
    );
}
export default FinancialData;
