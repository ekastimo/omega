import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/core/styles';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import {ToastContainer} from "react-toastify";
import store from "./data/redux/store";
import App from './App';
import * as serviceWorker from './serviceWorker';
import theme from './theme';
import {Provider} from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <ToastContainer/>
            <CssBaseline/>
            <App />
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.register({
    onUpdate: registration => {
        if (window.confirm("New content available, update now?")) {
            window.location.reload()
            if (registration.waiting)
                registration.waiting.postMessage({type: 'SKIP_WAITING'});
        }
    }
});
