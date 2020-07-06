import React from 'react';
import * as yup from "yup";
import {reqDate, reqNumber, reqString} from "../../../../data/validations";
import {companyCategories} from "../../../../data/comboCategories";
import {FormikHelpers} from "formik";
import Grid from "@material-ui/core/Grid";
import XForm from "../../../../components/forms/XForm";
import XTextInput from "../../../../components/inputs/XTextInput";
import XDateInput from "../../../../components/inputs/XDateInput";
import {toOptions} from "../../../../components/inputs/inputHelpers";
import {remoteRoutes} from "../../../../data/constants";
import {useDispatch} from 'react-redux'
import {crmConstants} from "../../../../data/redux/crm/reducer";
import {put} from "../../../../utils/ajax";
import Toast from "../../../../utils/Toast";
import {ICompany} from "../../types";
import XSelectInput from "../../../../components/inputs/XSelectInput";

interface IProps {
    data: ICompany
    done?: () => any
}

const schema = yup.object().shape(
    {
        category: reqString,
        name: reqString,
        numberOfEmployees: reqNumber,
        invoicingDay: reqNumber,
        dateOfIncorporation: reqDate
    }
)

const CompanyEditor = ({data, done}: IProps) => {
    const dispatch = useDispatch();

    function handleSubmit(values: any, actions: FormikHelpers<any>) {
        const toSave: ICompany = {
            ...values,
            id: values.id,
            contactId: values.contactId,
            category: values.category,
            name: values.name,
            numberOfEmployees: values.numberOfEmployees,
            invoicingDay: values.invoicingDay,
            dateOfIncorporation: values.dateOfIncorporation
        }
        put(remoteRoutes.contactsCompany, toSave,
            (data) => {
                Toast.info('Operation successful')
                actions.resetForm()
                dispatch({
                    type: crmConstants.crmEditCompany,
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
        >
            <Grid spacing={1} container>
                <Grid item xs={3}>
                    <XSelectInput
                        name="category"
                        label="category"
                        options={toOptions(companyCategories)}
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={9}>
                    <XTextInput
                        name="name"
                        label="Name"
                        type="text"
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={6}>
                    <XTextInput
                        name="numberOfEmployees"
                        label="No. of Employees"
                        type="number"
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={6}>
                    <XTextInput
                        name="invoicingDay"
                        label="Invoicing Day"
                        type="number"
                        variant='outlined'
                    />
                </Grid>

                <Grid item xs={12}>
                    <XDateInput
                        name="dateOfIncorporation"
                        label="Date of Incorporation"
                        variant='outlined'
                    />
                </Grid>
            </Grid>
        </XForm>
    );
}


export default CompanyEditor;
