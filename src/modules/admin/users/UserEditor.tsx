import React, {useState} from 'react';
import * as yup from "yup";
import {reqArray, reqObject, reqString} from "../../../data/validations";
import {FormikHelpers} from "formik";
import Grid from "@material-ui/core/Grid";
import XForm from "../../../components/forms/XForm";
import XTextInput from "../../../components/inputs/XTextInput";

import {remoteRoutes} from "../../../data/constants";
import {XRemoteSelect} from "../../../components/inputs/XRemoteSelect";
import {handleSubmission, ISubmission} from "../../../utils/formHelpers";
import {comboParser, toOptions} from "../../../components/inputs/inputHelpers";
import {del} from "../../../utils/ajax";
import Toast from "../../../utils/Toast";
import {clientRoles} from "../../../data/appRoles";

interface IProps {
    data: any
    isNew: boolean
    done: (dt: any) => any
    onDeleted: (dt: any) => any
    onCancel?: () => any
}

const schema = yup.object().shape(
    {
        password: reqString.min(8),
        contact: reqObject,
        roles: reqArray,
    }
)

const editSchema = yup.object().shape(
    {
        password: yup.string().min(8),
        roles: reqArray,
    }
)

const initialValues = {contact: null, password: '', roles: []}

const UserEditor = ({data, isNew, done, onDeleted, onCancel}: IProps) => {

    const [loading, setLoading] = useState<boolean>(false)

    function handleSubmit(values: any, actions: FormikHelpers<any>) {
        const toSave: any = {
            ...values,
            contactId: values.contact.value,
            password: values.password,
            roles: values.roles?.map((it: any) => it.value)
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
            schema={isNew ? schema : editSchema}
            initialValues={data || initialValues}
            onDelete={isNew ? undefined : handleDelete}
            loading={loading}
            onCancel={onCancel}
        >
            <Grid spacing={0} container>
                <Grid item xs={12}>
                    {
                        isNew &&
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
                    }
                </Grid>
                <Grid item xs={12}>
                    <XRemoteSelect
                        name="roles"
                        label="Roles"
                        remote=''
                        defaultOptions={toOptions(clientRoles)}
                        parser={comboParser}
                        variant='outlined'
                        multiple
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
