import {toast} from 'react-toastify';
import {ToastPosition} from "react-toastify/dist/types";

const defPosition:ToastPosition = "top-center"

export default class Toast {
    public static success(message: string, position = defPosition) {
        toast.success(message, {
            position
        });
    }

    public static error(message: string, position = defPosition) {
        toast.error(message, {
            position
        });
    }

    public static warn(message: string, position = defPosition) {
        toast.warn(message, {
            position
        });
    }

    public static info(message: string, position = defPosition) {
        toast.info(message, {
            position
        });
    }
}
