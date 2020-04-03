import React from 'react';
import * as yup from "yup";
import {reqDate, reqEmail, reqNumber, reqString} from "../../../data/validations";
import {genderCategories} from "../../../data/comboCategories";
import {FormikHelpers} from "formik";
import Grid from "@material-ui/core/Grid";
import XForm from "../../../components/forms/XForm";
import XTextInput from "../../../components/inputs/XTextInput";
import XDateInput from "../../../components/inputs/XDateInput";
import {toOptions} from "../../../components/inputs/inputHelpers";

import {remoteRoutes} from "../../../data/constants";
import {useDispatch} from 'react-redux'
import {crmConstants} from "../../../data/redux/contacts/reducer";
import {post} from "../../../utils/ajax";
import Toast from "../../../utils/Toast";
import XRadioInput from "../../../components/inputs/XRadioInput";
import {IdentificationCategory, IPersonCreateModel} from "../types";
import XSelectInput from "../../../components/inputs/XSelectInput";
import {enumToArray} from "../../../utils/stringHelpers";
import {Box} from "@material-ui/core";

interface IProps {
    data: any | null
    done?: () => any
}

const schema = yup.object().shape(
    {
        firstName: reqString,
        lastName: reqString,
        gender: reqString,
        dateOfBirth: reqDate,

        email: reqEmail,
        phone: reqString,


        idCategory: reqString,
        idNumber: reqString,
        idExpiryDate: reqDate,
        //idIssueDate: reqDate,


        dateOfEmployment: reqDate,
        monthlyNetSalary: reqNumber,
    }
)

const NewPersonForm = ({data, done}: IProps) => {
    const dispatch = useDispatch();

    function handleSubmit(values: any, actions: FormikHelpers<any>) {
        const model: IPersonCreateModel = {

            firstName: values.firstName,
            middleName: values.middleName,
            lastName: values.lastName,
            dateOfBirth: values.dateOfBirth,
            gender: values.gender,

            phone: values.phone,
            email: values.email,

            idCategory: values.idCategory,
            idExpiryDate: values.idExpiryDate,
            idIssueDate: values.idIssueDate,
            idNumber: values.idNumber,
            dateOfEmployment: values.dateOfEmployment,
            monthlyNetSalary: values.monthlyNetSalary,
        }

        post(remoteRoutes.contactsPerson, model,
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
                <Grid item xs={6}>
                    <XTextInput
                        name="firstName"
                        label="First Name"
                        type="text"
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={6}>
                    <XTextInput
                        name="lastName"
                        label="Last Name"
                        type="text"
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={12}>
                    <XTextInput
                        name="middleName"
                        label="Other Names"
                        type="text"
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={6}>
                    <Box pt={2} pl={1}>
                        <XRadioInput
                            name="gender"
                            label="Gender"
                            options={toOptions(genderCategories)}
                        />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <XDateInput
                        name="dateOfBirth"
                        label="Date of Birth"
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={6}>
                    <XTextInput
                        name="phone"
                        label="Phone"
                        type="text"
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={6}>
                    <XTextInput
                        name="email"
                        label="Email"
                        type="email"
                        variant='outlined'
                    />
                </Grid>

                <Grid item xs={4}>
                    <XSelectInput
                        name="idCategory"
                        label="ID Type"
                        options={toOptions(enumToArray(IdentificationCategory))}
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={8}>
                    <XTextInput
                        name="idNumber"
                        label="ID Number"
                        type="text"
                        variant='outlined'
                    />
                </Grid>

                <Grid item xs={6}>
                    <XDateInput
                        name="idIssueDate"
                        label="ID Issue Date"
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={6}>
                    <XDateInput
                        name="idExpiryDate"
                        label="ID Expiry Date"
                        variant='outlined'
                    />
                </Grid>

                <Grid item xs={6}>
                    <XDateInput
                        name="dateOfEmployment"
                        label="Date of Employment"
                        variant='outlined'
                    />
                </Grid>

                <Grid item xs={6}>
                    <XTextInput
                        name="monthlyNetSalary"
                        label="Monthly NetSalary"
                        type="number"
                        variant='outlined'
                    />
                </Grid>
            </Grid>
        </XForm>
    );
}


export default NewPersonForm;
