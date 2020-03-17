import React from 'react';
import EditDialog from "../../../../components/EditDialog";
import {DropzoneArea} from 'material-ui-dropzone'
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import Box from "@material-ui/core/Box";

interface IProps {
    show: boolean
    onClose: () => any
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        zone: {
            width: 400
        },
    }),
);

const ContactUpload = ({show, onClose}: IProps) => {
    const classes = useStyles()
    function handleChange() {

    }
    return (
        <EditDialog title='Upload Contacts' open={show} onClose={onClose}>
            <Box pb={2}>
                <DropzoneArea
                    dropzoneClass={classes.zone}
                    dropzoneText='Drop excel here or click'
                    acceptedFiles={['application/*']}
                    onChange={handleChange}
                />
            </Box>
        </EditDialog>
    );
}


export default ContactUpload;
