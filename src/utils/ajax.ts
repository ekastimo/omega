import * as superagent from 'superagent'
import Toast from './Toast'
import {AUTH_KEY_TOKEN, AUTH_KEY_USER} from "../data/constants";
import {hasValue} from "../components/inputs/inputHelpers";

export const getToken = (): string | null => {
    return localStorage.getItem(AUTH_KEY_TOKEN)
}

type CallbackFunction = (data?: any) => void;
type ErrorCallback = (err: any, res: superagent.Response) => void;
type EndCallback = (data?: any) => void;

export const handleError = (err: any = {}, res: superagent.Response) => {
    const defaultMessage = "Invalid request, please contact admin";
    if ((res && res.forbidden) || (res && res.unauthorized)) {
        Toast.error("Authentication Error")
        localStorage.removeItem(AUTH_KEY_TOKEN)
        localStorage.removeItem(AUTH_KEY_USER)
        window.location.reload()
    } else if (res && res.badRequest) {
        if (isStandardValidationError(res.body)) {
            // Handled in the check (isStandardValidationError)
            return
        }
        const {message, errors = []} = res.body
        let msg = message + '\n'
        for (const err of errors) {
            const error = Object.values(err)[0]
            msg += (error + '\n')
        }
        Toast.error(msg || defaultMessage)
    } else if (isClientError(res)) {
        const {message} = res.body || {}
        Toast.error(message || defaultMessage)
    } else {
        const message = err.message || 'Unknown error, contact admin'
        const finalMessage = message.indexOf("offline") !== -1
            ? "Can't reach server, Check connectivity"
            : message
        Toast.error(finalMessage)
    }
}

export interface IClientError {
    type: string;
    title: string;
    status: number;
    traceId: string;
    errors: any;
}

/*

{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "traceId": "|1ab3c932-4acb553f43ec470c.",
  "errors": {
    "Network": [
      "The Network field is required."
    ]
  }
}

 */
//TODO handle all errors
const isStandardValidationError = (data: any): boolean => {
    const error: IClientError = data
    if (hasValue(error.title) && error.title.indexOf("validation errors") > -1) {
        Toast.error(error.title)
        return true;
    }
    return false
}

const isClientError = (res: any) => {
    return (res && res.clientError) || (res && res.notAcceptable) || (res && res.error)
}


export const handleBadRequestError = (err: any = {}, res: superagent.Response, cb: (data: any) => void) => {
    const defaultMessage = "Invalid request, please contact admin";
    if ((res && res.forbidden) || (res && res.unauthorized)) {
        Toast.error("Authentication Error")

    } else if (res && res.badRequest) {
        if (!isStandardValidationError(res.body)) {
            cb(res.body)
        }
    } else if (isClientError(res)) {
        const {message} = res.body || {}
        Toast.error(message || defaultMessage)
    } else {
        const message = err.message || 'Unknown error, contact admin'
        const finalMessage = message.indexOf("offline") !== -1
            ? "Can't reach server, Check connectivity"
            : message
        Toast.error(finalMessage)
    }
}

const timeout = 0
export const isAuthError = (err: any = {}, res: superagent.Response) => {
    if (err) {
        console.log(err)
        return false
    }
    return (res && res.forbidden) || (res && res.unauthorized)
}

export const handleResponse = (callBack: CallbackFunction, errorCallBack?: ErrorCallback, endCallBack?: EndCallback) => (err: any, res: superagent.Response) => {
    try {
        if (err || !res.ok) {
            if (errorCallBack) {
                errorCallBack(err, res)
            } else {
                handleError(err, res)
            }
        } else {
            callBack(res.body)
        }
    } catch (e) {
        console.error("Failed to process response", e)
    } finally {
        if (endCallBack) {
            endCallBack()
        }
    }
}

export const get = (url: string, callBack: CallbackFunction, errorCallBack?: ErrorCallback, endCallBack?: EndCallback) => {
    superagent.get(url)
        .set('Authorization', `Bearer ${getToken()}`)
        .set('Accept', 'application/json')
        .timeout(timeout)
        .end(handleResponse(callBack, errorCallBack, endCallBack))
}

export const search = (url: string, data: any, callBack: CallbackFunction, errorCallBack?: ErrorCallback, endCallBack?: EndCallback) => {
    superagent.get(url)
        .set('Authorization', `Bearer ${getToken()}`)
        .set('Accept', 'application/json')
        .query(data)
        .timeout(timeout)
        .end(handleResponse(callBack, errorCallBack, endCallBack))
}


export const post = (url: string, data: any, callBack: CallbackFunction, errorCallBack?: ErrorCallback, endCallBack?: EndCallback) => {
    superagent.post(url)
        .set('Authorization', `Bearer ${getToken()}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(data)
        .timeout(timeout)
        .end(handleResponse(callBack, errorCallBack, endCallBack))
}


export const postFile = (url: string, data: any, callBack: CallbackFunction, errorCallBack?: ErrorCallback, endCallBack?: EndCallback) => {
    superagent.post(url)
        .set('Authorization', `Bearer ${getToken()}`)
        .set('Accept', 'application/json')
        .send(data)
        .timeout(timeout)
        .end(handleResponse(callBack, errorCallBack, endCallBack))
}

export const put = (url: string, data: any, callBack: CallbackFunction, errorCallBack?: ErrorCallback, endCallBack?: EndCallback) => {
    superagent.put(url)
        .set('Authorization', `Bearer ${getToken()}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(data)
        .timeout(timeout)
        .end(handleResponse(callBack, errorCallBack, endCallBack))
}

export const del = (url: string, callBack: CallbackFunction, errorCallBack?: ErrorCallback, endCallBack?: EndCallback) => {
    superagent.delete(url)
        .set('Authorization', `Bearer ${getToken()}`)
        .set('Accept', 'application/json')
        .timeout(timeout)
        .end(handleResponse(callBack, errorCallBack, endCallBack))
}

export const downLoad = (url: string, callBack: CallbackFunction, errorCallBack?: ErrorCallback, endCallBack?: EndCallback) => {
    superagent.get(url)
        .set('Authorization', `Bearer ${getToken()}`)
        .responseType('blob')
        .end(handleResponse(callBack, errorCallBack, endCallBack))
}

export const triggerDownLoad = (data: Blob, fileName = 'export.csv') => {
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(data);
    a.download = fileName;
    a.click();
}


