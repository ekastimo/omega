import React from 'react';
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import {createStyles, Divider, makeStyles, Theme, useTheme} from "@material-ui/core";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

interface IProps {
    children?: any
    title: string
    rightComponent?: any
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            borderRadius: 0
        },
        header: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        }
    })
);

const XSubStep = ({children, title, rightComponent}: IProps) => {
    const classes = useStyles()
    const theme = useTheme()
    return (
        <Box pb={1}>
            <Card className={classes.root} elevation={0}>
                <CardHeader
                    className={classes.header}
                    title={
                        <Grid container spacing={0}>
                            <Grid item xs={6}>
                                <Typography variant="h6" style={{fontSize: '0.85rem'}}>
                                    {title}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container spacing={0} justify='flex-end'>
                                    {rightComponent}
                                </Grid>
                            </Grid>
                        </Grid>
                    }
                />
                <Divider/>
                <CardContent style={{paddingBottom: theme.spacing(1)}}>
                    {children}
                </CardContent>
            </Card>
        </Box>
    );
}

export default XSubStep;
