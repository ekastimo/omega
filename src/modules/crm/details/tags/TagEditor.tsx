import React from 'react';
import * as yup from "yup";
import {reqString} from "../../../../data/validations";
import {FormikHelpers} from "formik";
import Grid from "@material-ui/core/Grid";
import XForm from "../../../../components/forms/XForm";
import XTextInput from "../../../../components/inputs/XTextInput";
import {IContactTag} from "../../types";
import {remoteRoutes} from "../../../../data/constants";
import {useDispatch} from 'react-redux'
import {crmConstants} from "../../../../data/redux/crm/reducer";
import {handleSubmission, ISubmission} from "../../../../utils/formHelpers";
import {useDelete} from "../../../../data/hooks/useDelete";

interface IProps {
    contactId: string
    data: IContactTag | null
    isNew: boolean
    done?: () => any
}

const schema = yup.object().shape(
    {
        value: reqString
    }
)

const TagEditor = ({data, isNew, contactId, done}: IProps) => {
    const dispatch = useDispatch();

    function handleSubmit(values: any, actions: FormikHelpers<any>) {
        const submission: ISubmission = {
            url: remoteRoutes.contactsTag,
            values: {...values, contactId}, actions, isNew,
            onAjaxComplete: (data: any) => {
                dispatch({
                    type: isNew ? crmConstants.crmAddTag : crmConstants.crmEditTag,
                    payload: {...data},
                })
                if (done)
                    done()
            }
        }
        handleSubmission(submission)
    }

    const deleteActions = useDelete({
        url: `${remoteRoutes.contactsTag}/${data?.id}`,
        onDone: done,
        id: data?.id!,
        action: crmConstants.crmDeleteTag
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
                        name="value"
                        label="Tag"
                        type="text"
                        variant='outlined'
                    />
                </Grid>
            </Grid>
        </XForm>
    );
}

export default TagEditor;
