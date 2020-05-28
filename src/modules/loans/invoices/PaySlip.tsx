import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";

import {Alert} from "@material-ui/lab";
import Loading from "../../../components/Loading";
import PdfViewer from "../../../components/PdfViewer";
import {remoteRoutes} from "../../../data/constants";
import {downLoad, get} from "../../../utils/ajax";
import {IXDocument} from "../../../data/types";

const useStyles = makeStyles(() =>
    createStyles({
        body: {
            height: 'calc(100% - 100px)'
        },
        imgHolder: {
            height: "100%",
            width: '100%',
            textAlign: 'center'
        },
        img: {
            maxWidth: "100%",
            height: 'auto',
            maxHeight: "100%",
            margin: '0 auto'
        },
    }),
);

interface IProps {
    documentId: string
    onCancel: () => any
}

const PaySlip = ({documentId}: IProps) => {
    const [loading, setLoading] = useState(false);
    const [downLoading, setDownLoading] = useState(false);
    const [document, setDocument] = useState<IXDocument | null>(null);
    const [docUrl, setDocUrl] = useState<any>(null);

    useEffect(() => {
        setLoading(true)
        const url = `${remoteRoutes.documentsView}/${documentId}`
        get(url, resp => {
            setDocument(resp)
        }, undefined, () => {
            setLoading(false)
        })
    }, [documentId])

    useEffect(() => {
        setDownLoading(true)
        const url = `${remoteRoutes.documentsDownload}/${documentId}`
        downLoad(url, blobData => {
            const url = URL.createObjectURL(blobData)
            setDocUrl(url)
        }, undefined, () => {
            setDownLoading(false)
        })
    }, [documentId])

    const classes = useStyles();
    return (
        <div style={{height: '100%', minWidth: 500, minHeight: 500, width: '100%'}}>
            {
                loading || downLoading ?
                    <Loading/> :
                    (document && docUrl) ?
                        <div className={classes.body}>
                            {
                                document.contentType.indexOf('image') > -1 ? (
                                    <div className={classes.imgHolder}>
                                        <img
                                            className={classes.img}
                                            src={docUrl}
                                            alt='Pay slip'
                                        />
                                    </div>
                                ) : (
                                    <PdfViewer data={docUrl}/>
                                )
                            }
                        </div>
                        :
                        <Box p={3}>
                            <Alert severity="error">Failed to load documents</Alert>
                        </Box>
            }

        </div>
    );
}


export default PaySlip;
