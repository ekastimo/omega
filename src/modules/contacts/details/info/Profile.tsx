import React from 'react';
import Grid from '@material-ui/core/Grid';
import {ContactCategory, getNin, IContact, renderName} from "../../types";
import {Box, createStyles, makeStyles, Theme} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import PeopleIcon from "@material-ui/icons/Business";
import {grey} from "@material-ui/core/colors";
import {ErrorIcon, SuccessIcon} from "../../../../components/xicons";

interface IProps {
    data: IContact
}

const CBLabel = ({children, ok = true}: any) => {
    return <Box display='flex'>
        <Box width={15} style={{display:'inline-block',height:'100%' ,paddingTop:2}} >
            <Typography variant='body2' component="span">
                {ok ? <SuccessIcon fontSize='inherit'/> : <ErrorIcon fontSize='inherit'/>}
            </Typography>
        </Box>
        <Box style={{display:'inline-block' ,height:'100%' }}>
            <Typography variant='body2' component="span" >
                {children}
            </Typography>
        </Box>
    </Box>
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(2),
            borderRadius: 0
        },

        image: {
            height: 70,
            width: 70,
            marginRight: theme.spacing(1),
            marginTop: theme.spacing(1)
        },
        nameHolder: {
            paddingTop: theme.spacing(1)
        }
    })
);

const Profile = ({data}: IProps) => {
    const classes = useStyles()
    const nin = getNin(data)
    const isPerson = data.category === ContactCategory.Person
    return (
        <Grid container>
            <Grid item sm={6}>
                <Grid container justify="flex-start" alignItems="flex-start">
                    <Avatar className={classes.image}>{isPerson ? <PersonIcon fontSize='large'/> :
                        <PeopleIcon fontSize='large'/>}</Avatar>
                    <Grid item className={classes.nameHolder}>
                        <Typography variant='h5'>{renderName(data)}</Typography>
                        <Typography variant='body2'>{data.category}</Typography>
                        {
                            isPerson ?
                                <Typography variant='body2'>NIN: {nin}</Typography> :
                                <Typography variant='body2'>TIN: {nin}</Typography>
                        }

                    </Grid>
                </Grid>
            </Grid>
            <Grid item sm={6}>
                <Box style={{border: `1px solid ${grey[400]}`}} p={1}>
                    <Box pb={1}><Typography variant='body2'><b>KYC Summary</b></Typography></Box>
                    <Box display='flex'>
                        <Box width='30%'>
                            <CBLabel>AML Ok</CBLabel>
                            <CBLabel ok={false}>Risk Profile</CBLabel>
                            <CBLabel>NIN</CBLabel>
                        </Box>
                        <Box width='50%'>
                            <CBLabel ok={false}>Sanctions</CBLabel>
                            <CBLabel>PEP</CBLabel>
                            <CBLabel>CRB</CBLabel>
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Profile;
