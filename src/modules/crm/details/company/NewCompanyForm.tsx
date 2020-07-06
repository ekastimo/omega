import React from 'react';
import * as yup from "yup";
import {reqDate, reqEmail, reqNumber, reqObject, reqString} from "../../../../data/validations";
import {FormikHelpers} from "formik";
import Grid from "@material-ui/core/Grid";
import XForm from "../../../../components/forms/XForm";
import XTextInput from "../../../../components/inputs/XTextInput";
import XDateInput from "../../../../components/inputs/XDateInput";
import {comboParser, toOptions} from "../../../../components/inputs/inputHelpers";

import {remoteRoutes} from "../../../../data/constants";
import {useDispatch} from 'react-redux'

import {post} from "../../../../utils/ajax";
import Toast from "../../../../utils/Toast";
import XSelectInput from "../../../../components/inputs/XSelectInput";
import {CompanyCategory, ICompanyCreateModel} from "../../types";
import {XRemoteSelect} from "../../../../components/inputs/XRemoteSelect";
import {enumToArray} from "../../../../utils/stringHelpers";
import {crmConstants} from "../../../../data/redux/crm/reducer";

interface IProps {
    data: any | null
    done?: () => any
}

const schema = yup.object().shape(
    {
        name: reqString,
        category: reqString,
        dateOfIncorporation: reqDate,
        numberOfEmployees: reqNumber,
        //invoicingDay: reqNumber,
        email: reqEmail,
        tinNumber: reqString,
        phone: reqString,
        contactPerson: reqObject,
        responsibleContact: reqObject,
    }
)

const NewCompanyForm = ({data, done}: IProps) => {
    const dispatch = useDispatch();

    function handleSubmit(values: any, actions: FormikHelpers<any>) {
        const model: ICompanyCreateModel = {
            dateOfIncorporation: values.dateOfIncorporation,
            invoicingDay: values.invoicingDay,
            category: values.category,
            contactPersonId: values.contactPerson.value,
            responsibleContactId: values.responsibleContact.value,
            name: values.name,
            numberOfEmployees: values.numberOfEmployees,
            phone: values.phone,
            email: values.email,
            tinNumber: values.tinNumber
        }

        post(remoteRoutes.contactsCompany, model,
            (data) => {
                Toast.info('Operation successful')
                actions.resetForm()
                dispatch({
                    type: crmConstants.crmAddContact,
                    payload: {...data},
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
            schema={schema}
            initialValues={data}
            onCancel={done}
        >
            <Grid spacing={1} container>
                <Grid item xs={8}>
                    <XTextInput
                        name="name"
                        label="Name"
                        type="text"
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={4}>
                    <XSelectInput
                        name="category"
                        label="Category"
                        options={toOptions(enumToArray(CompanyCategory))}
                        variant='outlined'
                    />
                </Grid>
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
                <Grid item xs={6}>
                    <XTextInput
                        name="numberOfEmployees"
                        label="No. Employees"
                        type="number"
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={6}>
                    <XDateInput
                        name="dateOfIncorporation"
                        label="Date of Incorporation"
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={12}>
                    <XTextInput
                        name="tinNumber"
                        label="Tin Number"
                        type="text"
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={12}>
                    <XTextInput
                        name="phone"
                        label="Phone"
                        type="text"
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={12}>
                    <XTextInput
                        name="email"
                        label="Email"
                        type="email"
                        variant='outlined'
                    />
                </Grid>
            </Grid>
        </XForm>
    );
}


export default NewCompanyForm;
