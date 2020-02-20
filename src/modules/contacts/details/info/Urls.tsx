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
import {linkColor} from "../../../../theme/custom-colors";

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
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <SectionTitle
                    title='Urls'
                    editButton={<AddIconButton onClick={handleNew} style={{marginTop:5}}/>}
                    icon={<PublicIcon fontSize='small'/>}
                />
                {/*<Divider/>*/}
            </Grid>
            {urls.map(it => (
                <Grid item xs={12} key={it.id}>
                    <SectionItem buttons={
                        <Box>
                            <EditIconButton onClick={handleClick(it)}/>
                            <DeleteIconButton onClick={handleDelete(it)}/>
                        </Box>
                    }>
                        <Box pb={1}>
                            <a href={it.value} target='_blank' rel="noopener noreferrer" style={{color:linkColor}}>
                                <Typography variant='body1' noWrap display='inline'>{trimString(it.value,23)}</Typography>
                            </a>
                            <Typography variant='caption' display='inline'>&nbsp;({it.category})&nbsp;&nbsp;</Typography>
                        </Box>
                    </SectionItem>
                </Grid>
            ))}
            <EditDialog title={selected ? "Edit URL" : "New URL"} open={dialog} onClose={handleClose}>
                <UrlEditor data={selected} isNew={!selected} contactId={id} done={handleClose}/>
            </EditDialog>
        </Grid>
    );
}

export default Urls;
