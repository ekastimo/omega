import React, {useState} from 'react';
import {IContact, IIdentification} from "../../types";
import {printDate} from "../../../../utils/dateHelpers";
import EditIconButton, {AddIconButton, DeleteIconButton} from "../../../../components/EditIconButton";
import {Divider} from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import EditDialog from "../../../../components/EditDialog";
import IdentificationEditor from "../editors/IdentificationEditor";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

interface IProps {
    data: IContact
}

const Identifications = ({data}: IProps) => {
    const {identifications, id = ''} = data
    const [selected, setSelected] = useState<IIdentification | null>(null)
    const [dialog, setDialog] = useState(false)


    const handleClick = (dt: IIdentification) => () => {
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

    const handleDelete = (dt: IIdentification) => () => {
        //TODO
    }
    const title = <div style={{display: 'flex', flexDirection: 'row'}}>
        <ListIcon fontSize='small' /><Typography variant='body2'>&nbsp;<b>Identifications</b></Typography>
    </div>
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Box display="flex" px={1}>
                    <Box flexGrow={1} pt={1}>
                        {title}
                    </Box>
                    <Box >
                        <AddIconButton onClick={handleNew}/>
                    </Box>
                </Box>
                <Divider/>
            </Grid>
            {identifications.map(it => (
                <Grid item xs={12} key={it.id}>
                    <Box display="flex" p={1}>
                        <Box flexGrow={1}>
                            <Typography variant='body1'>{it.value}</Typography>
                            <Typography variant='caption'>{it.category},&nbsp;</Typography>
                            <Typography variant='caption'>
                                {printDate(it.issueDate)}&nbsp;to&nbsp;{printDate(it.expiryDate)}
                            </Typography>
                        </Box>
                        <Box>
                            <EditIconButton onClick={handleClick(it)}/>
                            <DeleteIconButton onClick={handleDelete(it)}/>
                        </Box>
                    </Box>
                </Grid>
            ))}
            <EditDialog title={selected ? "Edit Identification" : "New Identification"} open={dialog} onClose={handleClose}>
                <IdentificationEditor data={selected} isNew={!selected} contactId={id} done={handleClose}/>
            </EditDialog>
        </Grid>
    );
}
export default Identifications;
