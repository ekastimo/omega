import React, {useState} from 'react';
import MailIcon from '@material-ui/icons/Mail';
import {IBankAccount, IContact} from "../../types";
import BankAccountEditor from "../editors/BankAccountEditor";
import EditIconButton, {AddIconButton, DeleteIconButton} from "../../../../components/EditIconButton";
import EditDialog from "../../../../components/EditDialog";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import SectionTitle from "./SectionTitle";
import SectionItem from "./SectionItem";

interface IProps {
    data: IContact
}

const BankAccounts = (props: IProps) => {
    const [selected, setSelected] = useState<IBankAccount | null>(null)
    const [dialog, setDialog] = useState(false)
    const {bankAccounts, id = ''} = props.data

    const handleClick = (email: IBankAccount) => () => {
        setSelected(email)
        setDialog(true)
    }

    const handleDelete = (email: IBankAccount) => () => {
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
                    title='BankAccounts'
                    editButton={<AddIconButton onClick={handleNew}/>}
                    icon={<MailIcon fontSize='small'/>}
                />
                {/*<Divider/>*/}
            </Grid>
            {bankAccounts.map(it => (
                <Grid item xs={12} key={it.id}>
                    <SectionItem buttons={
                        <Box>
                            <EditIconButton onClick={handleClick(it)}/>
                            <DeleteIconButton onClick={handleDelete(it)}/>
                        </Box>
                    }>
                        <Box flexGrow={1}>
                            <Typography variant='body1' noWrap>{it.name}</Typography>
                            <Typography variant='body2' noWrap>{it.number}</Typography>
                            <Typography variant='caption'>{it.bank}</Typography>
                        </Box>
                    </SectionItem>
                </Grid>
            ))}
            <EditDialog title={selected ? "Edit Bank Account" : "New Bank Account"} open={dialog} onClose={handleClose}>
                <BankAccountEditor data={selected} isNew={!selected} contactId={id} done={handleClose}/>
            </EditDialog>
        </Grid>
    );
}

export default BankAccounts;
