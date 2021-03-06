import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import {Box} from "@material-ui/core";

const Loading = () => {
    return (
        <Box width='100%' display='flex' alignContent='center' justifyContent='center' mt={15}>
            <CircularProgress />
        </Box>
    );
}
export default Loading;
