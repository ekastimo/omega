import React from 'react';
import {Typography} from "@material-ui/core";
import CalendarIcon from '@material-ui/icons/CalendarToday';
import {printDateTime} from "../../../utils/dateHelpers";
import Box from "@material-ui/core/Box";
import {ErrorIcon, WarningIcon} from "../../../components/xicons";

interface IProps {
    text: string
    date?: Date
    error?: boolean
    warning?: boolean
}

const XRightLabel = ({text, date, error, warning}: IProps) => {
    return (
        <Box pt={0.5} display='flex' flexDirection='row'>
            {
                error || warning ?
                    <>
                        <Typography
                            variant='body2'
                            style={{marginTop: 1}}>
                            &nbsp;
                            {
                                error ?
                                    <ErrorIcon
                                        fontSize='inherit'
                                    /> :
                                    <WarningIcon
                                        fontSize='inherit'
                                    />
                            }

                        </Typography>
                        <Typography variant='body2'>
                            &nbsp;{text}
                        </Typography>
                    </> :
                    <>
                        <Typography variant='body2'>
                            &nbsp;{text}&nbsp;
                        </Typography>
                        <Typography
                            variant='body2'
                            style={{marginTop: 1}}>
                            &nbsp;
                            <CalendarIcon
                                fontSize='inherit'
                            />
                        </Typography>
                        <Typography variant='body2'>
                            {printDateTime(date)}
                        </Typography>
                    </>
            }

        </Box>
    );
}


export default XRightLabel;
