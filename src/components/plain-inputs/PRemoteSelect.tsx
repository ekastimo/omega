import React, {ChangeEvent, useCallback, useEffect} from "react";
import {search} from "../../utils/ajax";
import Autocomplete, {createFilterOptions} from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import {hasNoValue} from "../inputs/inputHelpers";
import {ComboValue, PComboProps} from "./PComboInput";
import {Option} from "../inputs/option";

const filter = createFilterOptions<Option | string>();


const FakeProgress = () => <div style={{height: 20, width: 20}}>&nbsp;</div>


const filterOptions = (options: (Option | string)[], params: any) => {
    const filtered = filter(options, params) as Option[];
    // Suggest the creation of a new value
    if (params.inputValue !== '') {
        filtered.push({
            id: params.inputValue,
            name: `Add "${params.inputValue}"`,
        });
    }
    return filtered;
}

export interface IPRemoteProps extends Omit<PComboProps, 'options'> {
    remote: string
    filter?: any
    searchOnline?: boolean
    parser?: (d: any) => Option | string
    defaultOptions?: Option[] | string[]
}

export function PRemoteSelect(props: IPRemoteProps) {
    const [loading, setLoading] = React.useState(false);
    const [options, setOptions] = React.useState<Option[] | string[]>(props.defaultOptions || []);
    const [query, setQuery] = React.useState<string>('');
    const [inputValue, setInputValue] = React.useState('');

    const [dataCache, setDataCache] = React.useState<any>({})

    function hashCode(str: string): number {
        return str.split('').reduce((prevHash, currVal) =>
            (((prevHash << 5) - prevHash) + currVal.charCodeAt(0)) | 0, 0);
    }

    const isInCache = useCallback((filter: any) => {
        const key = hashCode(JSON.stringify(filter))
        if (dataCache[key]) {
            return dataCache[key]
        }
    },[dataCache])

    const addToCache = useCallback((filter: any, resp: any) => {
        const key = hashCode(JSON.stringify(filter))
        const newData = {...dataCache, [key]: resp}
        setDataCache(newData)
    },[dataCache])

    const fetch = useCallback((query: string) => {
        if (hasNoValue(props.remote)) {
            return
        }
        const newFilter = {...props.filter, query, limit: 50}
        const cached = isInCache(newFilter);
        if (cached) {
            setOptions(cached)
            return;
        }
        setLoading(true)
        search(props.remote, newFilter,
            resp => {
                if (props.parser) {
                    const data = resp.map(props.parser)
                    setOptions(data)
                    addToCache(newFilter, data)
                } else {
                    setOptions(resp)
                    addToCache(newFilter, resp)
                }
            },
            undefined,
            () => {
                setLoading(false)
            })
    }, [props.parser, props.filter, props.remote,isInCache,addToCache]);

    useEffect(() => {
        fetch(query)
    }, [fetch, query])

    const handleTouched = () => {
        props.onBlur && props.onBlur()
    }

    function handleChange(
        event: ChangeEvent<{}>,
        value: ComboValue, _: any
    ) {
        onChange(value)
    }

    function getOptionSelection(o: Option | string, v: Option | string) {
        if (typeof o === 'string') {
            return o === v
        }
        if (typeof o === 'object') {
            const obj = o as Option
            const val = v as Option
            return obj?.id === val?.id
        }
        return false;
    }

    function getOptionLabel(o: string | Option) {
        if (typeof o === 'string') {
            return o
        }
        if (typeof o === 'object') {
            const obj = o as Option
            return obj?.name
        }
        return ''
    }

    const {
        onChange, onBlur,
        value, label,
        variant,
        multiple,
        helperText,
        showError,
        parser: i,
        defaultOptions,
        searchOnline,
        margin = 'normal',
        freeSolo,
        textFieldProps, defaultValue,
        ...autoProps
    } = props
    // TODO fix this type
    const _value: any = value || (multiple ? [] : null);
    return (
        <Autocomplete
            {...autoProps}
            value={_value}
            multiple={multiple}
            onChange={handleChange}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
                if (searchOnline) {
                    setQuery(newInputValue)
                }
            }}
            getOptionLabel={getOptionLabel}
            getOptionSelected={getOptionSelection}
            filterOptions={props.searchOnline ? x => x : freeSolo ? filterOptions : undefined}
            options={options}
            autoComplete
            loading={loading}
            renderInput={params => {
                return <TextField
                    {...params}
                    {...textFieldProps}
                    margin={margin}
                    label={label}
                    fullWidth
                    onBlur={handleTouched}
                    error={showError}
                    helperText={showError && helperText}
                    variant={props.variant}
                    autoComplete="off"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20}/> : <FakeProgress/>}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            }}
        />
    );


}
