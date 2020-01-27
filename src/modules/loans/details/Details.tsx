import React, {useEffect, useState} from 'react';
import {getRouteParam} from "../../../utils/routHelpers";
import {useDispatch, useSelector} from "react-redux";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {IState} from "../../../data/types";
import {fakeLoan, ILoan} from "../types";
import {loanConstants} from "../../../data/redux/loans/reducer";
import Layout from "../../../components/layout/Layout";
import CodeView from "../../../components/CodeView";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {RouteComponentProps, withRouter} from "react-router";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},

    })
);

const Details = (props: RouteComponentProps) => {
    const [loading, setLoading] = useState(false);
    const loanId = getRouteParam(props, 'loanId')
    const classes = useStyles()
    const dispatch = useDispatch();
    const data: ILoan | undefined = useSelector((state: IState) => state.loans.selected)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            const data = fakeLoan()
            dispatch({
                type: loanConstants.loanFetchOne,
                payload: data,
            })
            setLoading(false)
        }, 500)
    }, [dispatch])
    return (
        <Layout>
            <Box p={2}><Typography>{loanId}</Typography></Box>
            <CodeView data={data}/>
        </Layout>
    );
}

export default withRouter(Details);
