import React, {useState} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {Paper} from "@material-ui/core";
import {printFloatNumber} from "../../utils/numberHelpers";
import grey from "@material-ui/core/colors/grey";
import blueGrey from "@material-ui/core/colors/blueGrey";

export const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

const size = 500;
const detailSize = size * 0.37;
const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: size,
        minWidth: size,
        color: blueGrey[900]
    },
    preview: {
        color: 'white',
        paddingTop: detailSize * 0.1,
        borderRadius: detailSize / 2,
        height: detailSize,
        width: detailSize,
        backgroundColor: blueGrey[800],
        position: 'absolute'
    },
    calculator: {
        borderRadius: 70,
        width: "70%",
        margin: '0 auto'
    },
    calculatorHolder: {
        paddingTop: size * 0.25,
        backgroundColor: theme.palette.background.paper,
        width: "100%",
        minWidth: size,
        minHeight: size,
        borderRadius: size / 2,
    }
}));


interface ILoanData {
    maxAmount: number
    minAmount: number
    interestRate: number

}

const LoanCalculator = () => {
    const loanData: ILoanData = {
        maxAmount: 1000000,
        interestRate: 8.5,
        minAmount: 100000
    }
    const defaultLoan = loanData.maxAmount / 2;
    const [amount, setAmount] = useState<any>(defaultLoan)

    const classes = useStyles();
    const handleChange = (e: any, value: any) => {
        setAmount(value)
    }
    const downPayment = ((amount * loanData.interestRate) / 100) + amount;

    function handleTextChange(e: any) {
        setAmount(e.target.value)
    }

    return (
        <div className={classes.root}>
            <Box display='flex' justifyContent='flex-end'>
                <div className={classes.preview}>
                    <Box width='100%' p={3}>
                        <Typography variant='subtitle1' align="center">
                            {printFloatNumber(downPayment)}
                        </Typography>
                        <Typography variant='caption' align="center" component='div'>
                            minimum pay at the end of month
                        </Typography>
                        <Typography variant='caption' align="center" component='div'>
                            ({loanData.interestRate}% interest rate)
                        </Typography>
                    </Box>
                </div>
            </Box>
            <Box p={3}>
                <div className={classes.calculatorHolder}>
                    <div className={classes.calculator}>
                        <Box width="100%" py={2}>
                            <Typography component="h1" variant="h5" align="center" gutterBottom>
                                Mortgage Calculator
                            </Typography>
                        </Box>
                        <Box width="100%" py={2}>
                            <TextField
                                fullWidth
                                label="Filled"
                                variant="filled"
                                onChange={handleTextChange}
                                value={amount}
                            />
                        </Box>
                        <Box width="100%" pt={2} display='flex'>
                            <Box width="50%">
                                <Typography variant='body1'>
                                    {printFloatNumber(loanData.minAmount)}
                                </Typography>
                            </Box>
                            <Box width="50%" display='flex' justifyContent='flex-end'>
                                <Typography variant='body1'
                                            component='label'
                                >{printFloatNumber(loanData.maxAmount)}
                                </Typography>
                            </Box>
                        </Box>
                        <Box width="100%">
                            <PrettoSlider
                                value={amount}
                                min={loanData.minAmount}
                                max={loanData.maxAmount}
                                onChange={handleChange}
                            />
                        </Box>
                    </div>
                </div>
            </Box>
        </div>
    );
}


export default LoanCalculator;


