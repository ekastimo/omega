import React, {useCallback, useEffect, useRef, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {useSelector} from "react-redux";
import {createStyles, makeStyles} from "@material-ui/core";
import Layout from "../../../layout/Layout";
import Box from "@material-ui/core/Box";
import {useParams} from "react-router";
import Grid from "@material-ui/core/Grid";
import {trimGuid} from "../../../utils/stringHelpers";
import {downLoad, get} from "../../../utils/ajax";
import {remoteRoutes} from "../../../data/constants";
import ErrorMessage from "../../../components/messages/ErrorMessage";
import {IInvoice, InvoiceStatus} from "./types";
import {isPrimaryUser} from "../../../data/appRoles";
import Button from "@material-ui/core/Button";
import PrintIcon from "@material-ui/icons/Print";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import EmailIcon from '@material-ui/icons/Email';
import {dataFields, renderInvoiceStatus} from "./config";
import EditDialog from "../../../components/EditDialog";
import InvoiceRecover from "./InvoiceRecover";
import Toast from "../../../utils/Toast";
import {DetailViewX} from "../../../components/DetailView";
import {hasValue} from "../../../components/inputs/inputHelpers";
import PaySlip from "./PaySlip";
import DetailsLoader from "../../../components/loaders/DetailsLoader";


const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            padding: 0,
            backgroundColor: 'transparent'
        },
        paperStyle: {
            borderRadius: 0
        },
        frameHolder: {
            width: '100%',
            height: '100%',
            minHeight: 700
        },
        iframe: {
            width: '100%',
            height: '100%',
            border: 'none',
            overflow: 'hidden'
        }
    }),
);

const InvoiceDetails = () => {
    const user = useSelector((state: any) => state.core.user)
    const [loading, setLoading] = useState(false);
    const [frameSrc, setFrameSrc] = useState<string | null>(null);
    const {invoiceId} = useParams<any>();
    const [dialog, setDialog] = useState<boolean>(false)
    const [showPayment, setShowPayment] = useState<boolean>(false)
    const frame = useRef<HTMLIFrameElement>(null);
    const classes = useStyles()
    const [data, setData] = useState<IInvoice | null>(null)

    useEffect(() => {
        const invoiceUrl = `${remoteRoutes.invoicesView}/${invoiceId}`;
        downLoad(invoiceUrl, blobData => {
            const url = URL.createObjectURL(blobData)
            setFrameSrc(url)
        })
    }, [invoiceId])

    function handleViewPayment() {
        setShowPayment(true)
    }

    const loadData = useCallback(() => {
        setLoading(true)
        const url = `${remoteRoutes.invoices}/${invoiceId}`
        get(url, resp => {
            setData(resp)
        }, undefined, () => {
            setLoading(false)
        })
    }, [invoiceId])

    function handleEmailInvoice() {
        setLoading(true)
        const url = `${remoteRoutes.invoicesEmail}/${invoiceId}`
        get(url, resp => {
            Toast.success(resp.message)
        }, undefined, () => {
            setLoading(false)
        })
    }


    useEffect(() => {
        loadData()
    }, [loadData])


    function handlePrintInvoice() {
        if (frame.current != null) {
            frame.current.contentWindow?.print()
        }
    }

    function handleClearInvoice() {
        setDialog(true)
    }

    const handleComplete = () => {
        handleClose()
        loadData()
    }

    const handleClose = () => {
        setDialog(false)
    }


    if (loading)
        return (
            <Layout>
                <DetailsLoader/>
            </Layout>
        );
    if (data === null)
        return (
            <Layout>
                <ErrorMessage text="Failed to load invoice details"/>
            </Layout>
        );
    const isNotPaid = data.status !== InvoiceStatus.Paid
    const isPaid = data.status === InvoiceStatus.Paid
    const hasPaySlip = hasValue(data.documentId)


    return (
        <Layout>
            <Grid container spacing={2}>
                <Grid item sm={6}>
                    <Typography variant='h5'>
                        Invoice Details #{trimGuid(data.id)}
                        &nbsp;&nbsp;
                        {renderInvoiceStatus(data.status)}
                    </Typography>
                </Grid>
                <Grid item sm={6}>
                    <Box display='flex' flexDirection="row-reverse" pr={5}>
                        <Button
                            size='medium'
                            variant="outlined"
                            color="primary"
                            startIcon={<PrintIcon/>}
                            onClick={handlePrintInvoice}
                        >
                            Print
                        </Button>
                        &nbsp;&nbsp;
                        {
                            isPrimaryUser(user) && isNotPaid &&
                            <Button
                                size='medium'
                                variant="outlined"
                                color="primary"
                                startIcon={<AutorenewIcon/>}
                                onClick={handleClearInvoice}
                            >
                                Recover
                            </Button>
                        }
                        &nbsp;&nbsp;
                        {
                            isPrimaryUser(user) && isNotPaid &&
                            <Button
                                size='medium'
                                variant="outlined"
                                color="primary"
                                startIcon={<EmailIcon/>}
                                onClick={handleEmailInvoice}
                            >
                                Send Email
                            </Button>
                        }&nbsp;&nbsp;
                        {
                            isPrimaryUser(user) && isPaid && hasPaySlip &&
                            <Button
                                size='medium'
                                variant="outlined"
                                color="primary"
                                startIcon={<EmailIcon/>}
                                onClick={handleViewPayment}
                            >
                                View Payment
                            </Button>
                        }
                    </Box>
                </Grid>
                <Grid item sm={3} lg={3}>
                    <Box p={3} pt={2}>
                        <Box width='250px'>
                            <DetailViewX data={dataFields(data)}/>
                        </Box>
                    </Box>
                </Grid>
                <Grid item sm={9} lg={9}>
                    <div className={classes.frameHolder}>
                        {
                            frameSrc ?
                                <iframe
                                    ref={frame}
                                    title='Invoice'
                                    src={frameSrc}
                                    className={classes.iframe}
                                    scrolling='auto'
                                /> :
                                <Typography>Loading invoice</Typography>
                        }
                    </div>
                </Grid>
            </Grid>
            <EditDialog
                disableBackdropClick
                title='Recover invoice'
                open={dialog}
                onClose={handleClose}>
                <InvoiceRecover
                    onComplete={handleComplete}
                    onCancel={handleClose}
                    data={data}
                />
            </EditDialog>
            {
                data?.documentId &&
                <EditDialog
                    maxWidth='lg'
                    title='Pay slip'
                    open={showPayment}
                    onClose={() => setShowPayment(false)}>
                    <PaySlip
                        documentId={data?.documentId}
                        onCancel={() => setShowPayment(false)}
                    />
                </EditDialog>
            }

        </Layout>
    );
}

export default InvoiceDetails;
