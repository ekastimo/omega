import {makeStyles} from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import grey from "@material-ui/core/colors/grey";

const size = 550;
const detailSize = size * 0.37;
export const useCalculatorStyles = makeStyles((theme) => ({
    root: {
        minHeight: size,
        minWidth: size,
        color: blueGrey[900]
    },
    preview: {
        color: 'white',
        paddingTop: detailSize * 0.2,
        borderRadius: detailSize / 2,
        height: detailSize,
        width: detailSize,
        backgroundColor: blueGrey[800],
        position: 'absolute'
    },
    calculator: {
        borderRadius: 70,
        width: "70%",
        margin: '0 auto'
    },
    calculatorHolder: {
        paddingTop: size * 0.25,
        backgroundColor: theme.palette.background.paper,
        width: "100%",
        minWidth: size,
        minHeight: size,
        borderRadius: size / 2,
        border: '1px solid grey'
    },
    textInput: {
        textAlign: "center",
        fontSize: "30px",
        backgroundColor: grey[100]
    },
    textField: {
        '& .MuiOutlinedInput-root': {
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
