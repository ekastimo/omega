import React from 'react';
import {SuccessIcon} from "../../../../components/xicons";
import {XStep} from "../../stepper/XStepLabel";
import {ILoan} from "../../types";
import DetailView, {IRec} from "../../../../components/DetailView";
import ContactLink from "../../../../components/links/ContactLink";
import {getEmail, getPhone, IContact, renderName} from "../../../crm/types";
import {printDate} from "../../../../utils/dateHelpers";
import EmailLink from "../../../../components/links/EmalLink";
import PreviousLoans from "./PreviousLoans";
import XSubStep from "../../stepper/XSubStep";
import XRightLabel from "../../stepper/XRightLabel";
import SoreCard from "./ScoreCard";

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
    const applicant: IContact = props.data.applicant
    return (
        <XStep icon={SuccessIcon}
               title='Applicant Details'
               rightLabelComponent={
                   <XRightLabel
                       text='Created on'
                       date={applicant.createdAt}
                   />
               }
               open={true}
               hideContentPaper
        >
            <XSubStep title='Details'>
                <DetailView
                    data={applicantFields(props.data)}
                    columns={2}
                />
            </XSubStep>
            <XSubStep title='Previous Loans'>
                <PreviousLoans data={props.data}/>
            </XSubStep>
            <XSubStep title='Score card'>
                <SoreCard data={props.data}/>
            </XSubStep>
        </XStep>
    );
}

export default ApplicantDetails;
