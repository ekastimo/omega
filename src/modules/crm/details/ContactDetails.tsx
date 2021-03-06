import React, {useEffect, useState} from 'react';
import {RouteComponentProps, withRouter} from "react-router";

import {getRouteParam} from "../../../utils/routeHelpers";
import {IContact} from "../types";

import Error from "../../../components/Error";
import {createStyles, Grid, makeStyles, Theme} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Profile from "./info/Profile";
import Info from "./info/Info";
import {get} from "../../../utils/ajax";
import {remoteRoutes} from "../../../data/constants";
import {useDispatch, useSelector} from "react-redux";
import {crmConstants} from "../../../data/redux/crm/reducer";
import Layout from "../../../layout/Layout";
import DetailsLoader from "../../../components/loaders/DetailsLoader";

import ContactLoans from "../../loans/list/ContactLoans";

interface IProps extends RouteComponentProps {

}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(1),
            borderRadius: 0,
            minHeight: '100%',
            overflow: 'show'
        },
        divider: {
            marginTop: theme.spacing(2)
        },
        noPadding: {
            padding: 0
        }
    })
);

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            <Box paddingTop={2}>{children}</Box>
        </Typography>
    );
}

function a11yProps(index: any) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
}


const ContactDetails = (props: IProps) => {
    const contactId = getRouteParam(props, 'contactId')
    const classes = useStyles()
    const dispatch = useDispatch();
    const data: IContact | undefined = useSelector((state: any) => state.crm.selected)
    const [loading, setLoading] = useState<boolean>(true)
    const [value, setValue] = React.useState('one');
    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    };
    useEffect(() => {
        setLoading(true)
        dispatch({
            type: crmConstants.crmFetchOne,
            payload: undefined,
        })
        get(
            `${remoteRoutes.contacts}/${contactId}`,
            resp => dispatch({
                type: crmConstants.crmFetchOne,
                payload: resp,
            }),
            undefined,
            () => setLoading(false))
    }, [dispatch, contactId])

    if (loading)
        return <Layout>
            <DetailsLoader/>
        </Layout>
    return (
        <Layout>
            {
                data
                    ? <div className={classes.root}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} style={{paddingBottom: 0}}>
                                <Profile data={data}/>
                                <Divider className={classes.divider}/>
                            </Grid>
                            <Grid item xs={12} style={{paddingTop: 0}}>
                                <AppBar position="static" color="inherit" elevation={0}
                                        style={{padding: 0, height: 35, minHeight: 0}}>
                                    <Tabs value={value} onChange={handleChange} style={{height: 35, minHeight: 0}}
                                          indicatorColor='primary'>
                                        <Tab
                                            style={{padding: 0, height: 35, minHeight: 0}}
                                            value="one"
                                            label="Summary"
                                            {...a11yProps('one')}
                                        />
                                        <Tab value="two" label="Loans"
                                             style={{padding: 0, height: 35, minHeight: 0}} {...a11yProps('two')} />
                                    </Tabs>
                                </AppBar>
                                <Divider/>
                                <TabPanel value={value} index="one">
                                    <Info data={data}/>
                                </TabPanel>
                                <TabPanel value={value} index="two">
                                    <ContactLoans contact={data}/>
                                </TabPanel>
                            </Grid>
                        </Grid>
                    </div>
                    : <Error text='Failed load contact'/>
            }
        </Layout>
    );
}

export default withRouter(ContactDetails);
