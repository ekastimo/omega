import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux";
import {AppUser, LoginResponse, AppState} from "../../data/types";
import {Grid, useMediaQuery} from "@material-ui/core";
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
import {printFloatNumber, printInteger} from "../../utils/numberHelpers";
import {computeLoanPayment} from "./helpers";
import {homeSteps, ILoanPayment, IWebAppLoanRequest} from "./types";
import Typography from "@material-ui/core/Typography";
import {handleBadRequestError, post} from "../../utils/ajax";
import {AUTH_KEY_TOKEN, AUTH_KEY_USER, remoteRoutes} from "../../data/constants";
import Toast from "../../utils/Toast";
import {addLoanSettings} from "../../data/redux/loans/reducer";
import {XSlider} from "../../components/inputs/XSlider";
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from "@material-ui/core/Link";
import EmailLink from "../../components/links/EmalLink";
import useTheme from "@material-ui/core/styles/useTheme";
import {ILoanSettings} from "../loans/types";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            width: 450,
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
        maxWidth: '100%',
        borderRadius: 32,
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(2)
        }
    },
    stepper: {
        width: '100%'
    },
}));

interface IProps {
    amount: number
}


interface InfoMessageProps {
    payment: ILoanPayment
    settings: ILoanSettings
}

const termsLink = './Terms.pdf'

export const InfoMessage = ({payment, settings}: InfoMessageProps) => {
    return <Alert severity='info'>
        <Typography>
            <b>UGX&nbsp;{printFloatNumber(payment.interest)}</b> is the
            interest amount ({settings.interestRate}% interest rate).&nbsp;
            A total of <b>UGX {printInteger(payment.totalPayment)}</b> will
            automatically be deducted from your salary at the end of the month.
        </Typography>
    </Alert>
}

interface SuccessMessageProps extends InfoMessageProps {
    data: any
    user: AppUser
}

export const SuccessMessage = ({payment, settings, data, user}: SuccessMessageProps) => {
    return <Grid container spacing={2}>
        <Grid item xs={12}>
            <Alert severity='success'>
                <Typography>
                    Hello {user.fullName},<br/>
                    You have requested for a loan of <b>UGX&nbsp;{printFloatNumber(payment.amount)}</b>&nbsp;
                    interest rate <b>{settings.interestRate}%</b> (UGX {printFloatNumber(payment.interest)}).&nbsp;
                    <br/><br/>
                    Your application reference number is <b>{data.referenceNumber}</b>
                    <br/><br/>
                    You will receive an email on <b>{user.email}</b> shortly informing you of the status of your
                    transaction.
                    <br/><br/>
                    A total of <b>UGX {printInteger(payment.totalPayment)}</b> will be
                    automatically deducted from your salary at the end of the month.
                    <br/><br/>
                    In case of any queries, please reach out to our help line at <b>+256752683894</b>.&nbsp;
                    Or send us an email at <EmailLink value='support@azima.co.ug'/>.
                    <br/><br/>
                    <Link href={termsLink} target='_blank'>Terms and conditions</Link>&nbsp;
                    apply
                </Typography>
            </Alert>
        </Grid>
        <Grid item xs={12}>

        </Grid>
    </Grid>
}

export const createMessage = (message: string): any => {
    return <Alert severity='error'>
        <Typography>
            {message}
        </Typography>
    </Alert>
}

const ApprovalStep = (props: IProps) => {
    const calcClasses = useCalculatorStyles();
    const dispatch = useDispatch();
    const classes = useStyles();
    const loanSettings = useSelector((state: AppState) => state.loans.loanSettings)


    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const [loanData, setLoanData] = useState<any | null>(null)
    const [session, setSession] = useState<any | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<any | null>(null)
    const [password, setPassword] = useState<string>("")
    const [request, setRequest] = React.useState<IWebAppLoanRequest>({
        phone: "",
        category: "WebApp",
        amount: props.amount,
        sessionId: "browser",
        shortCode: "-NA-",
        network: '-NA-',
        terms: false
    });

    const loanPayment = computeLoanPayment(request.amount, loanSettings);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'password') {
            setPassword(event.target.value)
        } else if (event.target.name === 'amount') {
            handleAmountChange(event, event.target.value)
        } else {
            setRequest({
                ...request,
                [event.target.name]: event.target.value,
            });
        }
    };

    const handleAmountChange = (e: any, value: any) => {
        const amount = Number(value);
        if (amount >= loanSettings.minAmount && amount <= loanSettings.maxAmount) {
            const req = {
                ...request, amount
            }
            setRequest(req);
        }
    }

    function handleAgreement(evt: any, terms: boolean) {
        const req = {
            ...request, terms
        }
        setRequest(req);
    }

    function handleApprove() {
        console.log("Approving")
        if (
            hasNoValue(request.phone) ||
            hasNoValue(password)
        ) {
            Toast.warn("Please enter all required fields")
            return
        }

        if (!request.terms) {
            Toast.warn("Please read and agree to the terms and conditions")
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
            const {token, user}: LoginResponse = session
            console.log("Done Logging in", {token, user})
            requestLoan(session, resp => {
                Toast.success("Loan created successfully")
                setLoanData(resp)
            })
        })
    }

    function doLogin(done: (dt: any) => any) {
        const login: any = {
            phone: request.phone,
            password,
        }
        setLoading(true)
        //Login
        post(remoteRoutes.loginPhone, login, resp => {
            const {token, user}: LoginResponse = resp
            localStorage.setItem(AUTH_KEY_TOKEN, token)
            localStorage.setItem(AUTH_KEY_USER, JSON.stringify(user))
            setSession({...resp})
            done(resp)
        }, () => {
            Toast.error("Authentication failed")
        }, () => {
            setLoading(false)
        })
    }

    function requestLoan(sess: any, done: (resp: any) => any) {
        if (sess) {
            setLoading(true)
            //Login
            post(
                remoteRoutes.loansRequestLoan, request,
                resp => {
                    done(resp)
                },
                (err: any = {}, res: any) => {
                    handleBadRequestError(err, res, resp => {
                        setErrorMessage(createMessage(resp.message))
                        if (hasValue(resp.data)) {
                            dispatch(addLoanSettings(resp.data))
                        }
                        setLoading(false)
                    })
                },
                () => {
                    setLoading(false)
                })
        }
    }

    let inputPaddingX = 3;
    if (isSmall) {
        inputPaddingX = 1;
    }

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
                        activeStep={homeSteps.APPROVE_PAYOUT}
                        orientation='horizontal'
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
                    loanData ? <Grid item xs={12}>
                        <SuccessMessage
                            payment={loanPayment}
                            settings={loanSettings}
                            data={loanData}
                            user={session.user}
                        />
                    </Grid> : <>
                        <Grid item xs={12}>
                            {
                                errorMessage || <InfoMessage
                                    payment={loanPayment}
                                    settings={loanSettings}
                                />
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <Box px={inputPaddingX}>

                                <XMaskedInput
                                    hiddenLabel
                                    className={calcClasses.textField}
                                    variant="outlined"
                                    fullWidth
                                    size='small'
                                    name='amount'
                                    value={request.amount}
                                    onChange={handleChange}
                                    inputProps={
                                        {
                                            style: inputStyle
                                        }
                                    }
                                    disabled={loading}
                                />
                                <XSlider
                                    step={loanSettings.stepAmount}
                                    value={Number(request.amount)}
                                    min={loanSettings.minAmount}
                                    max={loanSettings.maxAmount}
                                    onChange={handleAmountChange}
                                    disabled={loading}
                                />
                                <Box width="100%" display='flex'>
                                    <Box width="50%">
                                        <Typography variant='body2' color='primary'>
                                            {printFloatNumber(loanSettings.minAmount)}
                                        </Typography>
                                    </Box>
                                    <Box width="50%" display='flex' justifyContent='flex-end'>
                                        <Typography variant='body2' color='primary'>
                                            {printFloatNumber(loanSettings.maxAmount)}
                                        </Typography>
                                    </Box>
                                </Box>
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
                                    size='small'
                                    value={request.phone}
                                    onChange={handleChange}
                                    inputProps={
                                        {
                                            style: inputStyle
                                        }
                                    }
                                    disabled={loading}
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
                                    size='small'
                                    autoComplete="off"
                                    variant='outlined'
                                    value={password}
                                    onChange={handleChange}
                                    disabled={loading}
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
                                <FormControlLabel
                                    value="end"
                                    checked={request.terms}
                                    disabled={loading}
                                    onChange={handleAgreement}
                                    control={<Checkbox color="primary"/>}
                                    label={<Typography style={{color: 'black'}}>
                                        I have read and agree to the
                                        &nbsp;<Link href={termsLink} target='_blank'>terms and conditions</Link>&nbsp;
                                        of the Azima Customer Agreement
                                    </Typography>}
                                    labelPlacement="end"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            {
                                loading &&
                                <Box width="100%" py={2} display='flex' justifyContent='flex-end'>
                                    <CircularProgress/>
                                </Box>
                            }

                        </Grid>
                        <Grid item xs={10}>
                            <Box width="100%" py={2} pr={3} display='flex' justifyContent='flex-end'>
                                <Fab
                                    variant="extended"
                                    color="primary"
                                    aria-label="add"
                                    className={calcClasses.button}
                                    onClick={handleApprove}
                                    disabled={loading}
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
