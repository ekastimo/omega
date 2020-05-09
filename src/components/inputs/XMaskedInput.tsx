import React from 'react';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';
import {TextFieldProps} from "@material-ui/core/TextField/TextField";

interface NumberFormatCustomProps {
    inputRef: (instance: NumberFormat | null) => void;
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

function NumberFormatCustom(props: NumberFormatCustomProps) {
    const {inputRef, onChange, ...other} = props;
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix=""
        />
    );
}


export default function XMaskedInput(props: TextFieldProps) {
    return (
        <TextField
            {...props}
            InputProps={{
                inputComponent: NumberFormatCustom as any,
            }}
        />
    );
}
