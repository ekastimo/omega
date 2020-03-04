import React from 'react';
import {FormikActions} from "formik";
import Grid from "@material-ui/core/Grid";
import XForm from "../../../../components/forms/XForm";

import {remoteRoutes} from "../../../../data/constants";
import {useDispatch} from 'react-redux'
import {crmConstants} from "../../../../data/redux/contacts/reducer";
import {post, put} from "../../../../utils/ajax";
import Toast from "../../../../utils/Toast";
import {ISelectOpt, XRemoteSelect} from "../../../../components/inputs/XRemoteSelect";
import {ContactCategory} from "../../types";

interface IProps {
    data: any
    contactId: string
    contactType: ContactCategory
    done?: () => any
}


const AdminViewEditor = ({data, done, contactId, contactType}: IProps) => {
    const dispatch = useDispatch();

    function handleSubmit(values: any, actions: FormikActions<any>) {
        const toSave = {
            id: contactId,
            contactPersonId: values.contactPerson.id,
            responsibleContactId: values.responsibleContact.id,
            organizationId: values.organization.id,
        }
        post(remoteRoutes.contactsData, {...toSave, contactId},
            (data) => {
                Toast.info('Operation successful')
                actions.resetForm()
                dispatch({
                    type: crmConstants.crmEditContactData,
                    payload: {...data, contactId},
                })
                if (done)
                    done()
            },
            undefined,
            () => {
                actions.setSubmitting(false);
            }
        )
    }

    return (
        <XForm
            onSubmit={handleSubmit}
            initialValues={data}
        >
            <Grid spacing={1} container>
                <Grid item xs={12}>
                    <XRemoteSelect
                        name="contactPerson"
                        label="Contact Person"
                        remote={remoteRoutes.contactsPerson}
                        parser={(dt: ISelectOpt) => dt}
                    />
                </Grid>
                <Grid item xs={12}>
                    <XRemoteSelect
                        name="responsibleContact"
                        label="Responsible Contact"
                        remote={remoteRoutes.contactsPerson}
                        parser={(dt: ISelectOpt) => dt}
                    />
                </Grid>
                {
                    contactType === ContactCategory.Person &&
                    <Grid item xs={12}>
                        <XRemoteSelect
                            name="organization"
                            label="Organization"
                            remote={remoteRoutes.contactsCompany}
                            parser={(dt: ISelectOpt) => dt}
                        />
                    </Grid>
                }
            </Grid>
        </XForm>
    );
}


export default AdminViewEditor;
