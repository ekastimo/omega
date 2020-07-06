import React from 'react';
import {Typography} from "@material-ui/core";
import Layout from "../../layout/Layout";
import {Link} from "react-router-dom";
import {localRoutes} from "../../data/constants";


const NotFound = () => {
    return (
        <Layout title='Not found'>
            <Typography variant='h5'>Invalid Path, </Typography>
            <Link to={localRoutes.dashboard}>Take me home</Link>
        </Layout>
    );
}


export default NotFound;
