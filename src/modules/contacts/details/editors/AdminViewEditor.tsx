import React from 'react';
import {FormikHelpers} from "formik";
import Grid from "@material-ui/core/Grid";
import XForm from "../../../../components/forms/XForm";
import {remoteRoutes} from "../../../../data/constants";
import {useDispatch} from 'react-redux'
import {crmConstants} from "../../../../data/redux/contacts/reducer";
import {post} from "../../../../utils/ajax";
import Toast from "../../../../utils/Toast";
import {XRemoteSelect} from "../../../../components/inputs/XRemoteSelect";
import {ContactCategory} from "../../types";
import {comboParser} from "../../../../components/inputs/inputHelpers";

interface IProps {
    data: any
    contactId: string
    contactType: ContactCategory
    done?: () => any
}

const AdminViewEditor = ({data, done, contactId, contactType}: IProps) => {
    const dispatch = useDispatch();
    const isPerson = contactType === ContactCategory.Person;

    function handleSubmit(values: any, actions: FormikHelpers<any>) {

        const toSave = {
            id: contactId,
            contactPersonId: values.contactPerson ? values.contactPerson.value : undefined,
            responsibleContactId: values.responsibleContact ? values.responsibleContact.value : undefined,
            organizationId: values.organization ? values.organization.value : undefined,
        }
        const url = isPerson ? remoteRoutes.contactsAdminOrg : remoteRoutes.contactsAdminResponsible;
        post(url, {...toSave, contactId},
            (data) => {
                Toast.info('Operation successful')
                actions.resetForm()
                if (isPerson) {
                    dispatch({
                        type: crmConstants.crmEditContactOrg,
                        payload: {...data},
                    })
                } else {
                    dispatch({
                        type: crmConstants.crmEditContactAdmin,
                        payload: {...data},
                    })
                }
                if (done)
                    done()
            },
            undefined,
            () => {
                actions.setSubmitting(false);
            }
        )
    }

    console.log("Initial data######", data)
    return (
        <XForm
            onSubmit={handleSubmit}
            initialValues={data}
        >
            <Grid spacing={1} container>
                {
                    contactType === ContactCategory.Person ?
                        <Grid item xs={12}>
                            <XRemoteSelect
                                name="organization"
                                label="Organization"
                                variant='outlined'
                                remote={remoteRoutes.contactsCompany}
                                parser={comboParser}
                            />
                        </Grid> :
                        <>
                            <Grid item xs={12}>
                                <XRemoteSelect
                                    name="contactPerson"
                                    label="Contact Person"
                                    remote={remoteRoutes.contactsPerson}
                                    parser={comboParser}
                                    variant='outlined'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <XRemoteSelect
                                    name="responsibleContact"
                                    label="Account Manager"
                                    remote={remoteRoutes.contactsPerson}
                                    parser={comboParser}
                                    variant='outlined'
                                />
                            </Grid>
                        </>
                }
            </Grid>
        </XForm>
    );
}

export default AdminViewEditor;
