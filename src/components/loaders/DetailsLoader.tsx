import React from 'react';
import {Skeleton} from "@material-ui/lab";
import {Box} from "@material-ui/core";


const DetailsLoader = () => {
    return (
        <div>
            <Box p={2}>
                <Skeleton variant="rect" width='100%' height={100}/>
            </Box>
            <Box p={2}>
                <Skeleton variant="rect" width='100%' height={300}/>
            </Box>
            <Box p={2}>
                <Skeleton variant="rect" width='100%' height={100}/>
            </Box>
        </div>
    );
}


export default DetailsLoader;
