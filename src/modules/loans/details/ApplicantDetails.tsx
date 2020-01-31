import React from 'react';
import {SuccessIcon} from "../../../components/xicons";
import {XStep} from "../stepper/XStepLabel";
import {Box} from "@material-ui/core";
import {ILoan} from "../types";
import Summary from "./Summary";

interface IProps {
    data: ILoan
}

const ApplicantDetails = (props: IProps) => {
    return (
        <XStep icon={SuccessIcon} title='Applicant Details' rightLabelComponent={''} open={true}>
            <Box>
                <Summary data={props.data}/>
            </Box>
        </XStep>
    );
}

export default ApplicantDetails;
