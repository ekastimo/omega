import React from "react";
import {isEmpty} from "lodash";
import XTextInput from "./XTextInput";
import {IColumn, InputType} from "../dynamic-editor/types";
import XDateInput from "./XDateInput";
import XRadioInput from "./XRadioInput";
import XSelectInput from "./XSelectInput";
import XTextAreaInput from "./XTextAreaInput";
import {Option} from "./option";

export const toOptions = (data: string[]): Option[] => {
    return data.map(it => ({name: it, id: it}))
}

export const comboParser = ({id, name}: any):Option => ({id: id, name})


export const hasValue = (data: any) => {
    return !isEmpty(data)
}

export const hasNoValue = (data: any) => {
    return isEmpty(data)
}

export const renderInput = ({inputType, name, label, inputProps, ...rest}: IColumn) => {
    if (inputType) {
        const type: InputType = inputType
        const inputProperties = {name, label, ...inputProps}
        switch (type) {
            case InputType.Text:
                return <XTextInput
                    {...inputProperties}
                />
            case InputType.Date:
                return <XDateInput
                    {...inputProperties}
                />
            case InputType.Radio:
                return <XRadioInput
                    {...inputProperties}
                />
            case InputType.TextArea:
                return <XTextAreaInput
                    {...inputProperties}
                />
            case InputType.Select:
                return <XSelectInput
                    {...inputProperties}
                />
            default:
                return <XTextInput
                    {...inputProperties}
                />
        }
    }


}
