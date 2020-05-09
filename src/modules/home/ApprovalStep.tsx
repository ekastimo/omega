import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux";
import {IAuthUser, ILoginResponse, IState} from "../../data/types";
import {Grid} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import {useCalculatorStyles} from "./styles";
import grey from "@material-ui/core/colors/grey";
import XMaskedInput from "../../components/inputs/XMaskedInput";
import {hasNoValue, hasValue} from "../../components/inputs/inputHelpers";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Fab from '@material-ui/core/Fab';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Box from "@material-ui/core/Box";
import {Alert} from "@material-ui/lab";
import {printInteger} from "../../utils/numberHelpers";
import {computeLoanPayment} from "./helpers";
import {ILoanPayment, ILoanSettings} from "./types";
import Typography from "@material-ui/core/Typography";
import {handleBadRequestError, post} from "../../utils/ajax";
import {remoteRoutes} from "../../data/constants";
import {coreStartGlobalLoader, coreStopGlobalLoader, handleLogin} from "../../data/redux/coreActions";
import Toast from "../../utils/Toast";
import {addLoanSettings} from "../../data/redux/loans/reducer";
import CodeView from "../../components/CodeView";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2),
        width: 450,
        maxWidth: '100%'
    },
    stepper: {
        width: '100%'
    },
}));

interface IProps {
    amount: number
}

interface ILoanRequest {
    phone: string;
    network: string;
    amount: number;
    sessionId: string,
    shortCode: string,
    password: string,
}

const steps = {
    CHOOSE_AMOUNT: 0,
    APPROVE_PAYOUT: 1
}

export const createSuccessMessage = (payment: ILoanPayment, settings: ILoanSettings): any => {
    return <Typography>
        You have requested for <b>UGX {printInteger(payment.amount)}</b> only&nbsp;
        at an interest rate of <b>{settings.interestRate}%</b> .<br/>
        A total of <b>UGX {printInteger(payment.totalPayment)}</b> will be automatically&nbsp;
        deducted from your salary at the end of the month.<br/>
    </Typography>

}

const ApprovalStep = (props: IProps) => {
    const calcClasses = useCalculatorStyles();
    const dispatch = useDispatch();
    const classes = useStyles();
    const loanSettings = useSelector((state: IState) => state.loans.loanSettings)
    const user: IAuthUser = useSelector((state: any) => state.core.user)

    const [isComplete, setIsComplete] = useState<boolean>(false)
    const [request, setRequest] = React.useState<ILoanRequest>({
        phone: '256786000384',
        password: "Xpass@123",
        amount: props.amount,
        sessionId: "browser",
        shortCode: "-NA-",
        network: '-NA-',

    });

    const loanPayment = computeLoanPayment(request.amount, loanSettings);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRequest({
            ...request,
            [event.target.name]: event.target.value,
        });
    };

    function handleApprove() {
        console.log("Approving")
        if (
            hasNoValue(request.phone) ||
            hasNoValue(request.password)
        ) {
            Toast.warn("Please enter all required fields")
            return
        }

        if (
            request.amount > loanSettings.maxAmount ||
            request.amount < loanSettings.minAmount
        ) {
            Toast.warn("Invalid loan amount")
            return
        }
        doLogin((session: any) => {
            const {token, user}: ILoginResponse = session
            console.log("Done Logging in", {token, user})
            requestLoan(resp => {
                Toast.success("Loan created successfully")
                setIsComplete(true)
                console.log("Response", resp)
            })
        })
    }

    function doLogin(done: (dt: any) => any) {
        const login: any = {
            phone: request.phone,
            password: request.password,
        }
        dispatch(coreStartGlobalLoader())
        //Login
        post(remoteRoutes.loginPhone, login, resp => {
            dispatch(handleLogin(resp))
            done(resp)
        }, () => {
            Toast.error("Invalid credentials")
        }, () => {
            dispatch(coreStopGlobalLoader())
        })
    }

    function requestLoan(done: (resp: any) => any) {
        if (user) {
            dispatch(coreStartGlobalLoader())
            //Login
            post(
                remoteRoutes.loansRequestLoan, request,
                resp => {
                    done(resp)
                },
                (err: any = {}, res: any) => {

                    handleBadRequestError(err, res, resp => {
                        Toast.error(resp.message)
                        if (hasValue(resp.data)) {
                            dispatch(addLoanSettings(resp.data))
                        }
                        dispatch(coreStopGlobalLoader())
                    })
                },
                () => {
                    dispatch(coreStopGlobalLoader())
                })
        }
    }

    console.log(request)
    const inputPaddingX = 3;
    const inputStyle: any = {
        textAlign: 'center',
        fontSize: "1.3rem",
        backgroundColor: grey[200]
    }
    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Stepper
                        activeStep={steps.APPROVE_PAYOUT}
                        alternativeLabel orientation='horizontal'
                        className={classes.stepper}
                    >
                        <Step completed>
                            <StepLabel>Choose Amount</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Approve Payout</StepLabel>
                        </Step>
                    </Stepper>
                </Grid>
                {

                    isComplete ? <Grid item xs={12}>
                        <Alert severity='success'>
                            {createSuccessMessage(loanPayment, loanSettings)}
                        </Alert>
                    </Grid> : <>
                        <Grid item xs={12}>
                            <Alert severity='info'>
                                {createSuccessMessage(loanPayment, loanSettings)}
                            </Alert>
                        </Grid>
                        <Grid item xs={12}>
                            <Box px={inputPaddingX}>
                                <XMaskedInput
                                    hiddenLabel
                                    className={calcClasses.textField}
                                    variant="outlined"
                                    fullWidth
                                    value={request.amount}
                                    onChange={handleChange}
                                    inputProps={
                                        {
                                            style: inputStyle
                                        }
                                    }
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box px={inputPaddingX}>
                                <TextField
                                    className={calcClasses.textField}
                                    placeholder="Phone Number"
                                    hiddenLabel
                                    autoComplete="off"
                                    variant='outlined'
                                    name='phone'
                                    fullWidth
                                    value={request.phone}
                                    onChange={handleChange}
                                    inputProps={
                                        {
                                            style: inputStyle
                                        }
                                    }
                                />
                            </Box>

                        </Grid>
                        <Grid item xs={12}>
                            <Box px={inputPaddingX}>
                                <TextField
                                    className={calcClasses.textField}
                                    placeholder="Password"
                                    type="password"
                                    name='password'
                                    fullWidth
                                    autoComplete="off"
                                    variant='outlined'
                                    value={request.password}
                                    onChange={handleChange}
                                    inputProps={
                                        {
                                            style: inputStyle
                                        }
                                    }
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box width="100%" py={2} display='flex' justifyContent='center'>
                                <Fab
                                    variant="extended"
                                    color="primary"
                                    aria-label="add"
                                    className={calcClasses.button}
                                    onClick={handleApprove}
                                >
                                    <AccountBalanceWalletIcon
                                        className={calcClasses.extendedIcon}
                                    />
                                    Approve&nbsp;&nbsp;
                                </Fab>
                            </Box>
                        </Grid>
                    </>
                }
            </Grid>
        </div>
    );
}


export default ApprovalStep;
