import React from 'react';
import {SuccessIcon} from "../../../components/xicons";
import {XStep} from "../stepper/XStepLabel";
import {ILoan} from "../types";
import DetailView, {IRec} from "../../../components/DetailView";
import ContactLink from "../../../components/links/ContactLink";
import {getAddress, getEmail, getPhone, IContact, printAddress, renderName} from "../../contacts/types";
import {printDate} from "../../../utils/dateHelpers";
import EmailLink from "../../../components/links/EmalLink";

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
        },
        {
            label: 'Address',
            value: printAddress(getAddress(applicant))
        }
    ]
}

const PersonalInformation = (props: IProps) => {
    return (
        <XStep icon={SuccessIcon} title='Personal Information' rightLabelComponent={''} open={true}>
            <DetailView data={applicantFields(props.data)} columns={2} bold={true}/>
        </XStep>
    );
}

export default PersonalInformation;
