import {colors} from '@material-ui/core';

const white = '#FFFFFF';

const palette={
    primary: {
        contrastText: white,
        dark: "#194657",
        main: "#24647D",
        light: "#4f8397"
    },
    secondary: {
        contrastText: white,
        dark: colors.blue[900],
        main: colors.blue['A400'],
        light: colors.blue['A400']
    },
    error: {
        contrastText: white,
        dark: colors.red[900],
        main: colors.red[600],
        light: colors.red[400]
    },
    text: {
        primary: colors.blueGrey[900],
        secondary: colors.blueGrey[600]
    },
    background: {
        default: '#F4F6F8',
        paper: white
    }
};
export default palette
