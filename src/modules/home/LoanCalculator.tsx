import React, {useState} from 'react';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {printFloatNumber} from "../../utils/numberHelpers";
import Fab from '@material-ui/core/Fab';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import {useSelector} from "react-redux";
import {AppState} from "../../data/types";
import {useCalculatorStyles} from "./styles";
import AmountPicker from "./components/AmountPicker";
import {computeLoanPayment} from "./helpers";
import HiddenJs from "@material-ui/core/Hidden/HiddenJs";

interface IProps {
    onApply: (amount: number) => void
}

interface IPreviewProps {
    interest: number
    interestRate: number
}

export const Preview = ({interest, interestRate}: IPreviewProps) => {
    const classes = useCalculatorStyles();
    return <div className={classes.preview}>
        <Box width='100%' p={3}>
            <Typography variant='h5' align="center">
                {printFloatNumber(interest)}
            </Typography>
            <Typography variant='body2' align="center" component='div'>
                minimum interest amount
            </Typography>
            <Typography variant='body2' align="center" component='div'>
                ({interestRate}% interest rate)
            </Typography>
        </Box>
    </div>
}

const LoanCalculator = (props: IProps) => {
    const classes = useCalculatorStyles();
    const loanSettings = useSelector((state: AppState) => state.loans.loanSettings)
    const [amount, setAmount] = useState<any>(loanSettings.maxAmount / 2)
    const handleChange = (value: number) => {
        setAmount(value)
    }

    const {interest} = computeLoanPayment(amount, loanSettings);

    function handleGetNow() {
        props.onApply(amount)
    }

    return (
        <div className={classes.root}>
            <HiddenJs smDown>
                <Box display='flex' justifyContent='flex-end' style={{position: 'relative', height: 50}}>
                    <Preview
                        interest={interest}
                        interestRate={loanSettings.interestRate}
                    />
                </Box>
            </HiddenJs>
            <div className={classes.calculatorHolder}>
                <HiddenJs mdUp>
                    <Box display='flex' width='100%' justifyContent='center' pb={3}>
                        <Preview
                            interest={interest}
                            interestRate={loanSettings.interestRate}
                        />
                    </Box>
                </HiddenJs>
                <div className={classes.calculator}>
                    <Box width="100%" pb={2}>
                        <Typography component="h1" variant="h5" align="center" gutterBottom>
                            Mortgage Calculator
                        </Typography>
                    </Box>
                    <AmountPicker
                        loanSettings={loanSettings}
                        onChange={handleChange}
                        value={amount}
                    />
                    <Box width="100%" py={2} display='flex' justifyContent='center'>
                        <Fab variant="extended"
                             color="primary"
                             aria-label="add"
                             className={classes.button}
                             onClick={handleGetNow}
                        >
                            <AccountBalanceWalletIcon className={classes.extendedIcon}/>
                            Get it now&nbsp;&nbsp;
                        </Fab>
                    </Box>
                </div>
            </div>
        </div>
    );
}


export default LoanCalculator;


