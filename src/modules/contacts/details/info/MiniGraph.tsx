import React from 'react';
import {Pie} from 'react-chartjs-2';
import {makeStyles, useTheme} from '@material-ui/styles';
import {Divider, Theme, Typography} from '@material-ui/core';
import AssessmentIcon from "@material-ui/icons/AssessmentOutlined";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {IContact} from "../../types";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: '100%'
    },
    chartContainer: {
        position: 'relative',
        height: '150px'
    }
}));

interface IProps {
    data: IContact
}

const MiniGraph = (props: IProps) => {
    const classes = useStyles();
    const theme: Theme = useTheme();
    const data = {
        type: 'pie',
        datasets: [{
            data: [70, 30],
            backgroundColor: [
                theme.palette.error.main,
                theme.palette.primary.main
            ],
        }],
        labels: [
            'Taken',
            'Paid'
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        cutoutPercentage: 0,
        layout: {padding: 0},
    };
    const title = <div style={{display: 'flex', flexDirection: 'row',paddingBottom:theme.spacing(1)}}>
        <AssessmentIcon fontSize='small'/><Typography variant='body2'>&nbsp;<b>Loan Summary</b></Typography>
    </div>
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Box display="flex" px={1}>
                    <Box flexGrow={1} pt={1}>
                        {title}
                    </Box>
                </Box>
                <Divider/>
            </Grid>
            <Grid item xs={12}>
                <div className={classes.chartContainer}>
                    <Pie
                        data={data}
                        options={options}
                    />
                </div>
            </Grid>
        </Grid>
    );
};


export default MiniGraph;
