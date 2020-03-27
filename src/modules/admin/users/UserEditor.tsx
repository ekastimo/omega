import React, {useState} from 'react';
import * as yup from "yup";
import {reqString} from "../../../data/validations";
import {FormikHelpers} from "formik";
import Grid from "@material-ui/core/Grid";
import XForm from "../../../components/forms/XForm";
import XTextInput from "../../../components/inputs/XTextInput";

import {remoteRoutes} from "../../../data/constants";
import {XRemoteSelect} from "../../../components/inputs/XRemoteSelect";
import {handleSubmission, ISubmission} from "../../../utils/formHelpers";
import {comboParser} from "../../../components/inputs/inputHelpers";
import {del} from "../../../utils/ajax";
import Toast from "../../../utils/Toast";

interface IProps {
    data: any
    isNew: boolean
    done: (dt: any) => any
    onDeleted: (dt: any) => any
}

const schema = yup.object().shape(
    {
        password: reqString,
        contact: yup.object().required()
    }
)

const initialValues = {contact: null, password: ''}

const UserEditor = ({data, isNew, done, onDeleted}: IProps) => {

    const [loading, setLoading] = useState<boolean>(false)

    function handleSubmit(values: any, actions: FormikHelpers<any>) {
        console.log("Submiting", values)
        const toSave: any = {
            ...values,
            contactId: values.contact.value,
            password: values.password
        }
        const submission: ISubmission = {
            url: remoteRoutes.users,
            values: toSave, actions, isNew,
            onAjaxComplete: done
        }
        handleSubmission(submission)
    }

    function handleDelete() {
        setLoading(true)
        del(
            remoteRoutes.users,
            dt => {
                Toast.success("Operation succeeded")
                onDeleted(data)
            },
            undefined,
            () => {
                setLoading(false)
            })
    }

    return (
        <XForm
            onSubmit={handleSubmit}
            schema={isNew ? schema : undefined}
            initialValues={data || initialValues}
            onDelete={isNew ? undefined : handleDelete}
            loading={loading}
        >
            <Grid spacing={1} container >
                <Grid item xs={12}>
                    <XRemoteSelect
                        name="contact"
                        label="Person"
                        remote={remoteRoutes.contactsPerson}
                        parser={comboParser}
                        variant='outlined'
                        filter={{
                            excludeUsers: true
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <XTextInput
                        name="password"
                        label="Password"
                        type="password"
                        variant='outlined'
                    />
                </Grid>
            </Grid>
        </XForm>
    );
}


export default UserEditor;
