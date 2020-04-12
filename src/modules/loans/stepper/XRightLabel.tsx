import React from 'react';
import {Typography} from "@material-ui/core";
import CalendarIcon from '@material-ui/icons/CalendarToday';
import {printDateTime} from "../../../utils/dateHelpers";
import Box from "@material-ui/core/Box";
import {ErrorIcon} from "../../../components/xicons";

interface IProps {
    text: string
    date?: Date
    error?: boolean
}

const XRightLabel = ({text, date, error}: IProps) => {
    return (
        <Box pt={0.5} display='flex' flexDirection='row'>
            {
                error ?
                    <>
                        <Typography
                            variant='body2'
                            style={{marginTop: 1}}>
                            &nbsp;
                            <ErrorIcon
                                fontSize='inherit'
                            />
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
