import React, {useState} from 'react';
import InfoIcon from '@material-ui/icons/Info';
import {IContact, IContactUrl} from "../../types";
import EditIconButton, {AddIconButton, DeleteIconButton} from "../../../../components/EditIconButton";
import EditDialog from "../../../../components/EditDialog";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import UrlEditor from "../editors/UrlEditor";
import {trimString} from "../../../../utils/stringHelpers";

interface IProps {
    data: IContact
}
const Urls = (props: IProps) => {
    const [selected, setSelected] = useState<IContactUrl | null>(null)
    const [dialog, setDialog] = useState(false)
    const {urls, id = ''} = props.data

    const handleClick = (dt: IContactUrl) => () => {
        setSelected(dt)
        setDialog(true)
    }

    const handleDelete = (dt: IContactUrl) => () => {
        //TODO
    }

    const handleClose = () => {
        setDialog(false)
        setSelected(null)
    }

    const handleNew = () => {
        setSelected(null)
        setDialog(true)
    }

    const title = <div style={{display: 'flex', flexDirection: 'row'}}>
        <InfoIcon fontSize='small'/><Typography variant='body2'>&nbsp;<b>Contact Urls</b></Typography>
    </div>
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Box display="flex" px={1} >
                    <Box flexGrow={1} pt={1}>
                        {title}
                    </Box>
                    <Box >
                        <AddIconButton onClick={handleNew}/>
                    </Box>
                </Box>
                <Divider/>
            </Grid>
            <Grid item xs={12}>
                {urls.map(it => (
                    <Box display="flex" p={1}>
                        <Box flexGrow={1}>
                            <a href={it.value} target='_blank' rel="noopener noreferrer" >
                                <Typography variant='body1' noWrap >{trimString(it.value,30)}</Typography>
                            </a>
                            <Typography variant='caption'>{it.category}</Typography>
                        </Box>
                        <Box>
                            <EditIconButton onClick={handleClick(it)}/>
                            <DeleteIconButton onClick={handleDelete(it)}/>
                        </Box>
                    </Box>
                ))}
            </Grid>
            <EditDialog title={selected ? "Edit Tag" : "New Tag"} open={dialog} onClose={handleClose}>
                <UrlEditor data={selected} isNew={!selected} contactId={id} done={handleClose}/>
            </EditDialog>
        </Grid>
    );
}

export default Urls;
