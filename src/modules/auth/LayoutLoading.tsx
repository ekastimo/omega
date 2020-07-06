import React from 'react';
import {Typography} from "@material-ui/core";
import Layout from "../../layout/Layout";
import DetailsLoader from "../../components/loaders/DetailsLoader";

const LayoutLoading = () => {
    return (
        <Layout title='Loading...'>
            <Typography variant='h5'>Loading...</Typography>
            <DetailsLoader/>
        </Layout>
    );
}


export default LayoutLoading;
