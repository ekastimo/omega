import React from "react";
import {useField} from 'formik';
import 'date-fns';
import {isValid, parseISO} from "date-fns";
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers'
import {hasValue} from "./inputHelpers";
import {dateFormat} from "../../utils/dateHelpers";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {KeyboardDatePickerProps} from "@material-ui/pickers/DatePicker/DatePicker";

interface IProps {
    name: string
    variant?: 'outlined' | 'filled' | 'standard'
    pickerVariant?: 'inline' | 'dialog' | 'static'
}

type PickerProps = Omit<KeyboardDatePickerProps, 'variant' | 'inputVariant'>;

const XDateInput = (props: IProps & Partial<PickerProps>) => {
    const {variant, pickerVariant, ...rest} = props
    const [field, meta, helpers] = useField({name: props.name});
    const error = hasValue(meta.error) ? meta.error : undefined
    const showError = Boolean(error && meta.touched)

    function handleChange(date: MaterialUiPickersDate) {
        if (isValid(date)) {
            return helpers.setValue(date?.toISOString())
        } else {
            return helpers.setValue(null)
        }
    }

    let value: any = field.value;
    if (typeof value === 'string') {
        try {
            if (isValid(parseISO(value))) {
                //value = parseISO(value);
            } else {
                value = null
            }
        } catch (e) {
            value = null
        }
    } else if (typeof value === 'undefined') {
        value = null
    } else if (!isValid(value)) {
        value = null
    }
    return <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
            {...rest}
            fullWidth
            variant={pickerVariant}
            margin="normal"
            format={dateFormat}
            autoOk
            name={field.name}
            value={value}
            helperText={showError && error}
            error={Boolean(showError)}
            onChange={handleChange}
            onBlur={() => helpers.setTouched(true)}
            inputVariant={variant}
        />
    </MuiPickersUtilsProvider>
}

export default XDateInput
