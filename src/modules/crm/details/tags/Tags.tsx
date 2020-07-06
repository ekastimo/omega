import React, {useState} from 'react';
import InfoIcon from '@material-ui/icons/Info';
import {IContact, IContactTag} from "../../types";
import Chip from '@material-ui/core/Chip';
import {AddIconButton} from "../../../../components/EditIconButton";
import EditDialog from "../../../../components/EditDialog";
import Grid from "@material-ui/core/Grid";
import TagEditor from "./TagEditor";
import SectionTitle from "../info/SectionTitle";

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
                    title='Tags'
                    editButton={<AddIconButton onClick={handleNew} style={{marginTop: 5}}/>}
                    icon={<InfoIcon fontSize='small'/>}
                />
                {/*<Divider/>*/}
            </Grid>
            <Grid item xs={12} style={{paddingTop: 0}}>
                {tags.map(it => (
                    <Chip
                        color='primary'
                        variant='outlined'
                        key={it.id}
                        style={{margin: 5, marginLeft: 0, marginTop: 0}}
                        size='small'
                        label={it.value}
                        onDelete={handleClick(it)}
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
