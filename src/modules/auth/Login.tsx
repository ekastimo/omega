import React from 'react';
import {Button} from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Form, Formik, FormikHelpers} from 'formik';
import {useDispatch} from 'react-redux'
import {doLogin} from "../../data/redux/coreActions";

import * as yup from "yup";
import {post} from "../../utils/ajax";
import {isDebug, remoteRoutes} from "../../data/constants";
import Toast from "../../utils/Toast";
import XTextInput from "../../components/inputs/XTextInput";
import {useLoginStyles} from "./loginStyles";
import Box from "@material-ui/core/Box";
import {LoginResponse} from "../../data/types";
import {useHistory} from "react-router";

const initialValues = isDebug ? {
        "username": "ekastimo@gmail.com",
        "password": "Xpass@123"
    } :
    {
        "username": "",
        "password": ""
    }

const schema = yup.object().shape(
    {
        username: yup.string()
            .email('Invalid email')
            .required("Email is required"),
        password: yup.string()
            .required("Password is required")
    }
);

function Login() {
    const classes = useLoginStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const onSubmit = (data: any, actions: FormikHelpers<any>) => {
        post(remoteRoutes.login, data, (resp: LoginResponse) => {
            actions.setSubmitting(false)
            dispatch(doLogin(resp))
            history.push("/")
        }, () => {
            actions.setSubmitting(false)
            Toast.error("Invalid username/password")
        })
    }

    return (
        <Box display='flex' justifyContent='center'>
            <Box>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockIcon/>
                    </Avatar>
                    <Typography component="h1">
                        Sign in
                    </Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={schema}
                        onSubmit={onSubmit}
                    >{
                        (formState) => {
                            return <Form className={classes.form}>
                                <XTextInput
                                    type='email'
                                    name='username'
                                    label='Email'
                                    autoComplete="username"
                                    autoFocus
                                    margin="normal"
                                    variant='outlined'
                                />
                                <XTextInput
                                    type='password'
                                    name='password'
                                    label='Password'
                                    autoComplete="password"
                                    margin="normal"
                                    variant='outlined'
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    disabled={formState.isSubmitting}
                                >
                                    Sign in
                                </Button>
                            </Form>
                        }
                    }
                    </Formik>
                </Paper>
            </Box>
        </Box>
    );
}

export default Login


