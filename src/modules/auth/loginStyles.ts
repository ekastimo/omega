import {makeStyles, Theme} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";

export const useLoginStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            [theme.breakpoints.up(400 + theme.spacing(3 * 2),)]: {
                width: 400,
            },
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            marginTop: theme.spacing(3),
        },
    }),
);
