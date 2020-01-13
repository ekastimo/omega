import React, {useState} from 'react';
import InfoIcon from '@material-ui/icons/Info';
import {IContact, IContactTag} from "../../types";
import Chip from '@material-ui/core/Chip';
import {AddIconButton} from "../../../../components/EditIconButton";
import EditDialog from "../../../../components/EditDialog";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import TagEditor from "../editors/TagEditor";

interface IProps {
    data: IContact
}
const Tags = (props: IProps) => {
    const [selected, setSelected] = useState<IContactTag | null>(null)
    const [dialog, setDialog] = useState(false)
    const {tags, id = ''} = props.data

    const handleClick = (dt: IContactTag) => () => {
        setSelected(dt)
        setDialog(true)
    }

    const handleDelete = (dt: IContactTag) => () => {
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
        <InfoIcon fontSize='small'/><Typography variant='body2'>&nbsp;<b>Contact tags</b></Typography>
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
                {tags.map(it => (
                    <Chip
                        style={{margin:5}}
                        size='small'
                        label={it.value}
                        onDelete={handleDelete(it)}
                        onClick={handleClick(it)}
                    />
                ))}
            </Grid>
            <EditDialog title={selected ? "Edit Tag" : "New Tag"} open={dialog} onClose={handleClose}>
                <TagEditor data={selected} isNew={!selected} contactId={id} done={handleClose}/>
            </EditDialog>
        </Grid>
    );
}

export default Tags;
