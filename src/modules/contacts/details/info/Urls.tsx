import React, {useState} from 'react';
import PublicIcon from '@material-ui/icons/Public';
import {IContact, IContactUrl} from "../../types";
import EditIconButton, {AddIconButton, DeleteIconButton} from "../../../../components/EditIconButton";
import EditDialog from "../../../../components/EditDialog";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import UrlEditor from "../editors/UrlEditor";
import {trimString} from "../../../../utils/stringHelpers";
import SectionTitle from "./SectionTitle";
import SectionItem from "./SectionItem";

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

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <SectionTitle
                    title='Urls'
                    editButton={<AddIconButton onClick={handleNew}/>}
                    icon={<PublicIcon fontSize='small'/>}
                />
                <Divider/>
            </Grid>
            {urls.map(it => (
                <Grid item xs={12} key={it.id}>
                    <SectionItem buttons={
                        <Box>
                            <EditIconButton onClick={handleClick(it)}/>
                            <DeleteIconButton onClick={handleDelete(it)}/>
                        </Box>
                    }>
                        <Box flexGrow={1}>
                            <a href={it.value} target='_blank' rel="noopener noreferrer">
                                <Typography variant='body1' noWrap>{trimString(it.value, 30)}</Typography>
                            </a>
                            <Typography variant='caption'>{it.category}</Typography>
                        </Box>
                    </SectionItem>
                </Grid>
            ))}
            <EditDialog title={selected ? "Edit Tag" : "New Tag"} open={dialog} onClose={handleClose}>
                <UrlEditor data={selected} isNew={!selected} contactId={id} done={handleClose}/>
            </EditDialog>
        </Grid>
    );
}

export default Urls;
