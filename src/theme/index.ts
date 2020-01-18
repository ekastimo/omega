import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";
import palette from './palette';
const theme = createMuiTheme({
    palette,
    typography: {
        fontFamily: [
            '"Segoe UI"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        fontSize: 13
    }
});
export default responsiveFontSizes(theme);
