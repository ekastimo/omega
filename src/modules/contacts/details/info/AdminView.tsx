import React, {useState} from 'react';
import {ContactCategory, IContact} from "../../types";
import Grid from "@material-ui/core/Grid";
import DetailView, {IRec} from "../../../../components/DetailView";
import EditDialog from "../../../../components/EditDialog";
import {trimString} from "../../../../utils/stringHelpers";
import ContactLink from "../../../../components/links/ContactLink";
import Typography from "@material-ui/core/Typography";
import AdminViewEditor from "../editors/AdminViewEditor";

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

const AdminView = ({data}: IProps) => {

    const {contactPerson, responsibleContact, organization} = data;

    const [dialog, setDialog] = useState<boolean>(false)

    function handleEdit() {

    }

    function handleClose() {

    }

    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <DetailView data={displayFields(data)}/>
            </Grid>


        </Grid>
    );
}


export default AdminView;
