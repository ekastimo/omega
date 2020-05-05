import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridWrapper from "../../components/GridWrapper";
import {remoteRoutes} from "../../data/constants";
import {useDispatch} from "react-redux";
import {handleLogin, handleLogout, startLoading, stopLoading} from "../../data/redux/coreActions";
import {get, getToken} from "../../utils/ajax";
import {Box} from "@material-ui/core";

export default function Splash() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startLoading())
        get(remoteRoutes.profile,
            data => {
                dispatch(handleLogin({user: data, token: getToken()}))
            }, (err) => {
                console.log("Profile loading failed", err)
                dispatch(handleLogout())
            }, () => {
                dispatch(stopLoading())
            }
        )
    },[dispatch])


    return <GridWrapper>
        <Grid container spacing={10} justify='center' alignItems="center">
            <Grid item >
                <Box pt={5}>
                    <CircularProgress/>
                </Box>
            </Grid>
        </Grid>
    </GridWrapper>
}
