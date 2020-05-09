import React, {useState} from 'react';

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {printFloatNumber} from "../../utils/numberHelpers";
import Fab from '@material-ui/core/Fab';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import {useSelector} from "react-redux";
import {IState} from "../../data/types";
import {useCalculatorStyles} from "./styles";
import AmountPicker from "./components/AmountPicker";
import {computeLoanPayment} from "./helpers";


interface IProps {
    onApply: (amount: number) => void
}

const LoanCalculator = (props: IProps) => {
    const classes = useCalculatorStyles();
    const loanSettings = useSelector((state: IState) => state.loans.loanSettings)
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
            <Box display='flex' justifyContent='flex-end'>
                <div className={classes.preview}>
                    <Box width='100%' p={3}>
                        <Typography variant='h5' align="center">
                            {printFloatNumber(interest)}
                        </Typography>
                        <Typography variant='body2' align="center" component='div'>
                            minimum interest amount
                        </Typography>
                        <Typography variant='body2' align="center" component='div'>
                            ({loanSettings.interestRate}% interest rate)
                        </Typography>
                    </Box>
                </div>
            </Box>
            <Box p={3}>
                <div className={classes.calculatorHolder}>
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
            </Box>
        </div>
    );
}


export default LoanCalculator;


