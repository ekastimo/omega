import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";
import palette from './palette';
const theme = createMuiTheme({
    palette,
    typography: {
        fontSize: 13
    }
});
export default responsiveFontSizes(theme);
