import React from 'react';
import {createStyles, makeStyles, Theme, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {Dialog, DialogContent, DialogTitle} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import {appBarColor} from "../layout/styles";

interface IProps {
    open: boolean
    onClose: () => any
    title: string
    children?: any
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
    disableBackdropClick?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            backgroundColor: appBarColor,
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
        body: {
            [theme.breakpoints.up('md')]: {
                minWidth: 350
            }
        },
    }),
);

const EditDialog = (props: IProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            fullScreen={isSmall}
            maxWidth={props.maxWidth}
            disableBackdropClick={props.disableBackdropClick}
        >
            {
                isSmall ?
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={props.onClose} aria-label="close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                {props.title}
                            </Typography>
                        </Toolbar>
                    </AppBar> :
                    <DialogTitle>{props.title}</DialogTitle>
            }
            <DialogContent>
                <div className={classes.body}>
                    {props.children}
                </div>
            </DialogContent>
        </Dialog>
    );
}


export default EditDialog;
