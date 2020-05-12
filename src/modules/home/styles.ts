import {makeStyles} from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import grey from "@material-ui/core/colors/grey";

const size = 550;
const previewSize = size * 0.37;

export const useCalculatorStyles = makeStyles((theme) => ({
    root: {
        width: size,
        color: blueGrey[900],
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
        [theme.breakpoints.up('md')]: {
            minHeight: size,
        }
    },
    preview: {
        backgroundColor: blueGrey[800],
        color: 'white',
        [theme.breakpoints.up('md')]: {
            paddingTop: previewSize * 0.2,
            borderRadius: previewSize / 2,
            height: previewSize,
            width: previewSize,
            position: 'absolute'
        },
        [theme.breakpoints.down('sm')]: {
            borderColor: blueGrey[800],
            border: '1px solid',
            borderRadius: 24,
        }
    },
    calculator: {
        borderRadius: 70,
        width: "70%",
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            width: "90%",
        },
    },
    calculatorHolder: {
        border: '1px solid grey',
        paddingTop: size * 0.1,
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        borderRadius: 24,
        [theme.breakpoints.up('md')]: {
            paddingTop: size * 0.25,
            minWidth: size,
            minHeight: size,
            borderRadius: size / 2,
            border: '1px solid grey',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(2)
        }
    },
    textInput: {
        textAlign: "center",
        fontSize: "30px",
        backgroundColor: grey[50],
    },
    textField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 32,
            '& input': {
                borderRadius: 32,
            },
            '& fieldset': {
                borderColor: theme.palette.primary.light,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.dark,
            },
        },
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    button: {
        fontSize: '1.05rem'
    }
}));
