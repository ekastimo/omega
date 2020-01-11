import React, {useState} from 'react';
import PhoneIcon from '@material-ui/icons/Phone';
import {IContact, IPhone} from "../../types";
import EditIconButton, {AddIconButton, DeleteIconButton} from "../../../../components/EditIconButton";
import EditDialog from "../../../../components/EditDialog";
import PhoneEditor from "../editors/PhoneEditor";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

interface IProps {
    data: IContact
}

const Phones = (props: IProps) => {
    const [selected, setSelected] = useState<IPhone | null>(null)
    const [dialog, setDialog] = useState(false)

    const handleClick = (phone: IPhone) => () => {
        setSelected(phone)
        setDialog(true)
    }

    const handleClose = () => {
        setDialog(false)
        setSelected(null)
    }

    const handleDelete = (phone: IPhone) => () => {
        //TODO
    }

    const handleNew = () => {
        setSelected(null)
        setDialog(true)
    }

    const {phones, id = ''} = props.data
    const title = <div style={{display: 'flex', flexDirection: 'row'}}>
        <PhoneIcon fontSize='small'/><Typography variant='body2'>&nbsp;<b>Phones</b></Typography>
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
            {phones.map(it => (
                <Grid item xs={12} key={it.id}>
                    <Box display="flex" p={1}>
                        <Box flexGrow={1}>
                            <Typography variant='body1'>{it.value}</Typography>
                            <Typography variant='caption'>{it.category}</Typography>
                        </Box>
                        <Box>
                            <EditIconButton onClick={handleClick(it)}/>
                            <DeleteIconButton onClick={handleDelete(it)}/>
                        </Box>
                    </Box>
                </Grid>
            ))}
            <EditDialog title={selected ? "Edit Phone" : "New Phone"} open={dialog} onClose={handleClose}>
                <PhoneEditor data={selected} isNew={!selected} contactId={id} done={handleClose}/>
            </EditDialog>
        </Grid>
    );
}

export default Phones;
