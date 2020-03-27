import React from 'react';
import {SuccessIcon} from "../../../components/xicons";
import {XStep} from "../stepper/XStepLabel";
import {ILoan} from "../types";
import DetailView, {IRec} from "../../../components/DetailView";
import ContactLink from "../../../components/links/ContactLink";
import {getEmail, getPhone, IContact, renderName} from "../../contacts/types";
import {printDate} from "../../../utils/dateHelpers";
import EmailLink from "../../../components/links/EmalLink";
import PreviousLoans from "./PreviousLoans";
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

interface IProps {
    data: ILoan
}

export const applicantFields = (data: ILoan): IRec[] => {
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
            <Box pb={1}>
                <Typography variant='body2'><b>Details</b></Typography>
            </Box>
            <Divider/>
            <DetailView data={applicantFields(props.data)} columns={2}/>
            <Box pt={2} pb={1}>
                <Typography variant='body2'><b>Previous Loans</b></Typography>
            </Box>
            <Divider/>
            <PreviousLoans data={props.data}/>
        </XStep>
    );
}

export default ApplicantDetails;
