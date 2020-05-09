import React from 'react';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {printFloatNumber} from "../../../utils/numberHelpers";
import {XSlider} from "../../../components/inputs/XSlider";
import XMaskedInput from "../../../components/inputs/XMaskedInput";
import grey from "@material-ui/core/colors/grey";
import {useCalculatorStyles} from "../styles";
import {ILoanSettings} from "../types";


interface IProps {
    loanSettings: ILoanSettings,
    onChange: (a: number) => void
    value: number
}

const AmountPicker = ({loanSettings, onChange, value}: IProps) => {
    const classes = useCalculatorStyles();
    const handleChange = (e: any, value: any) => {
        const numValue = parseInt(value);
        if (numValue >= loanSettings.minAmount && numValue <= loanSettings.maxAmount) {
            onChange(numValue)
        }
    }

    function handleTextChange(e: any) {
        const value = e.target.value;
        const numValue = parseInt(value);
        if (numValue >= loanSettings.minAmount && numValue <= loanSettings.maxAmount) {
            onChange(numValue)
        }
    }

    return (
        <div>
            <Box width="100%" display='flex'>
                <Box width="50%">
                    <Typography variant='h6'>
                        {printFloatNumber(loanSettings.minAmount)}
                    </Typography>
                </Box>
                <Box width="50%" display='flex' justifyContent='flex-end'>
                    <Typography
                        variant='h6'
                        component='label'
                    >{printFloatNumber(loanSettings.maxAmount)}
                    </Typography>
                </Box>
            </Box>
            <Box width="100%">
                <XSlider
                    step={10000}
                    value={value}
                    min={loanSettings.minAmount}
                    max={loanSettings.maxAmount}
                    onChange={handleChange}
                />
            </Box>
            <Box width="100%" pb={2}>
                <XMaskedInput
                    margin='dense'
                    className={classes.textField}
                    variant="outlined"
                    fullWidth
                    hiddenLabel
                    value={value}
                    onChange={handleTextChange}
                    inputProps={{
                        style: {
                            textAlign: 'center',
                            fontSize: "1.7rem",
                            backgroundColor: grey[200]
                        },
                        max: loanSettings.maxAmount,
                        min: loanSettings.minAmount
                    }}
                />
            </Box>
        </div>
    );
}


export default AmountPicker;
