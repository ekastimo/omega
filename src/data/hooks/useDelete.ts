import {useState} from 'react';
import {del} from "../../utils/ajax";
import Toast from "../../utils/Toast";
import {useDispatch} from "react-redux";

export interface Props {
    url: string
    id: any
    action: string
    onDone?: () => any
}

export function useDelete<T extends { id: any }>(props: Props) {
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch();

    function handleDelete() {
        setLoading(true)
        del(
            props.url,
            () => {
                Toast.success("Operation succeeded")
                console.log("Dispatch",{
                    type: props.action,
                    payload: props.id,
                })
                dispatch({
                    type: props.action,
                    payload: props.id,
                })
                props.onDone && props.onDone()
            },
            undefined,
            () => {
                setLoading(false)
            })
    }

    return {
        loading, handleDelete
    }
}
