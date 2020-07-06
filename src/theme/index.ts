import {red} from '@material-ui/core/colors';
import {createMuiTheme} from '@material-ui/core/styles';
import {themeColor} from "./custom-colors";

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        primary: {
            main: themeColor,
        },
        secondary: {
            main: themeColor,
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(','),
        fontSize: 13.5
    }
});

export default theme;
