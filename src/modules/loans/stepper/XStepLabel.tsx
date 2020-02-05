import React from 'react';
import StepLabel from '@material-ui/core/StepLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

import Grid from "@material-ui/core/Grid";
import {Flex} from "../../../components/widgets";
import StepContent from "@material-ui/core/StepContent";
import Step from "@material-ui/core/Step";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        stepPaper: {
            borderRadius: 0
        },
        stepLabel: {
            padding: 4
        },
        stepContent: {
            paddingRight: 0,
            marginTop: 0
        },
        stepRoot: {
            padding: 0
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
    }),
);

export interface IStepProps {
    icon: any
    title: string
    open?: boolean
    children?: React.ReactNode
    rightLabelComponent?: React.ReactNode
}

export const XStep = (props: IStepProps) => {
    const classes = useStyles()
    const [expanded, setExpanded] = React.useState(props.open);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return <Step active={expanded} classes={{
        root: classes.stepRoot
    }} orientation="vertical">
        <StepLabel StepIconComponent={props.icon}>
            <Paper className={classes.stepPaper} elevation={0}>
                <Grid container spacing={0} className={classes.stepLabel}>
                    <Grid item xs={6}>
                        <Flex>
                            <Typography variant='h6' style={{fontSize: '1.0rem'}}>
                                &nbsp;{props.title}
                            </Typography>
                        </Flex>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={0} justify='flex-end'>
                            {props.rightLabelComponent}
                            <Grid item>
                                <IconButton
                                    size='small'
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expanded,
                                    })}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider/>
            </Paper>
        </StepLabel>
        <StepContent className={classes.stepContent}>
            <Paper elevation={0} style={{borderRadius: 0}}>
                <Box p={2}>
                    {props.children}
                </Box>
            </Paper>
        </StepContent>
    </Step>
}
