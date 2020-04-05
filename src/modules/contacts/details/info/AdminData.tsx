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
import {useSelector} from "react-redux";
import {IState} from "../../../../data/types";
import {isPrimaryUser} from "../../../../data/appRoles";

interface IProps {
    data: IContact
}

export const displayFields = (data: IContact): IRec[] => {

    if (data.category === ContactCategory.Person) {
        const {organization} = data;
        return [
            {
                label: 'Organization',
                value: organization ? <ContactLink
                    id={organization.id}
                    name={trimString(organization.name, 25)}
                    title={organization.name}
                /> : <Typography>-NA-</Typography>
            }
        ]
    }
    const {company: {contactPerson, responsibleContact}} = data;
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
            label: 'Account Manager',
            value: responsibleContact ? <ContactLink
                id={responsibleContact.id}
                name={trimString(responsibleContact.name, 25)}
                title={responsibleContact.name}
            /> : <Typography>-NA-</Typography>
        }
    ]
}

const AdminData = ({data}: IProps) => {
    const [dialog, setDialog] = useState(false)
    const user = useSelector((state: IState) => state.core.user)
    const {organization, company} = data;
    const {contactPerson, responsibleContact} = company || {}
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
                    editButton={isPrimaryUser(user) && <EditIconButton onClick={handleClick} style={{marginTop: 5}}/>}
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
export default AdminData;
