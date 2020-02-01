import React from 'react';
import {SuccessIcon} from "../../../components/xicons";
import {XStep} from "../stepper/XStepLabel";
import {Box} from "@material-ui/core";
import {ILoan} from "../types";
import {BoldTableView, IRec} from "../../../components/DetailView";
import ContactLink from "../../../components/links/ContactLink";
import {getEmail, getPhone, IContact, renderName} from "../../contacts/types";
import {printDate} from "../../../utils/dateHelpers";
import EmailLink from "../../../components/links/EmalLink";

interface IProps {
    data: ILoan
}

export const idFields = (data: ILoan): IRec[] => {
    const applicant: IContact = data.applicant
    return [
        {
            label: 'Full Name',
            value: <ContactLink id={applicant.id} name={renderName(applicant)}/>
        },
        {
            label: 'Nationality',
            value: 'Ugandan'
        },
        {
            label: 'Gender',
            value: applicant.person.gender
        },
        {
            label: 'Date of birth',
            value: printDate(applicant.person.dateOfBirth)
        },
        {
            label: 'Mobile',
            value: getPhone(applicant)
        },
        {
            label: 'Email',
            value: <EmailLink value={getEmail(applicant)}/>
        }
    ]
}

const ApplicantDetails = (props: IProps) => {
    return (
        <XStep icon={SuccessIcon} title='Applicant Details' rightLabelComponent={''} open={true}>
            <Box>
                <BoldTableView data={idFields(props.data)}/>
            </Box>
        </XStep>
    );
}

export default ApplicantDetails;
