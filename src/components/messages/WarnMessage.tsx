import React from 'react';
import {Box, colors, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

interface IProps {
    text: string
}

const WarnMessage = (props: IProps) => {
    return (
        <Box display="flex" p={2} justifyContent="center">
            <Paper style={{backgroundColor: colors.orange[50]}} elevation={0}>
                <Box p={1}>
                    <Typography>{props.text}&nbsp;!</Typography>
                </Box>
            </Paper>
        </Box>
    );
}

export default WarnMessage;
