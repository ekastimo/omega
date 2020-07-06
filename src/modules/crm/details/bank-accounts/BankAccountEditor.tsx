import React from 'react';
import * as yup from "yup";
import {reqString} from "../../../../data/validations";
import {FormikHelpers} from "formik";
import Grid from "@material-ui/core/Grid";
import XForm from "../../../../components/forms/XForm";
import XTextInput from "../../../../components/inputs/XTextInput";
import {IBankAccount} from "../../types";
import {remoteRoutes} from "../../../../data/constants";
import {useDispatch} from 'react-redux'
import {crmConstants} from "../../../../data/redux/crm/reducer";
import {handleSubmission, ISubmission} from "../../../../utils/formHelpers";
import {useDelete} from "../../../../data/hooks/useDelete";

interface IProps {
    contactId: string
    data: IBankAccount | null
    isNew: boolean
    done?: () => any
}

const schema = yup.object().shape(
    {
        bank: reqString,
        branch: reqString,
        name: reqString,
        number: reqString
    }
)

const BankAccountEditor = ({data, isNew, contactId, done}: IProps) => {
    const dispatch = useDispatch();

    function handleSubmit(values: any, actions: FormikHelpers<any>) {
        const submission: ISubmission = {
            url: remoteRoutes.contactsBankAccount,
            values: {...values, contactId}, actions, isNew,
            onAjaxComplete: (data: any) => {
                dispatch({
                    type: isNew ? crmConstants.crmAddBankAccount : crmConstants.crmEditBankAccount,
                    payload: {...data},
                })
                if (done)
                    done()
            }
        }
        handleSubmission(submission)
    }

    const deleteActions = useDelete({
        url: `${remoteRoutes.contactsBankAccount}/${data?.id}`,
        onDone: done,
        id: data?.id!,
        action: crmConstants.crmDeleteBankAccount
    })
    return (
        <XForm
            onSubmit={handleSubmit}
            schema={schema}
            initialValues={data}
            onDelete={isNew ? undefined : deleteActions.handleDelete}
            loading={deleteActions.loading}
            onCancel={done}
        >
            <Grid spacing={0} container>
                <Grid item xs={12}>
                    <XTextInput
                        name="bank"
                        label="Bank Name"
                        type="text"
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={12}>
                    <XTextInput
                        name="branch"
                        label="Branch Name"
                        type="text"
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={12}>
                    <XTextInput
                        name="name"
                        label="Account Name"
                        type="text"
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={12}>
                    <XTextInput
                        name="number"
                        label="Account Number"
                        type="text"
                        variant='outlined'
                    />
                </Grid>
            </Grid>
        </XForm>
    );
}


export default BankAccountEditor;
