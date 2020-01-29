import React, {useState} from 'react';
import MailIcon from '@material-ui/icons/Mail';
import {IBankAccount, IContact} from "../../types";
import BankAccountEditor from "../editors/BankAccountEditor";
import EditIconButton, {AddIconButton, DeleteIconButton} from "../../../../components/EditIconButton";
import EditDialog from "../../../../components/EditDialog";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import SectionTitle from "./SectionTitle";
import DetailView, {IRec} from "../../../../components/DetailView";
import {SectionItemGrid} from "./SectionItem";
import {Divider} from "@material-ui/core";

interface IProps {
    data: IContact
}
export const createFields = (data: IBankAccount): IRec[] => {
    return [
        {
            label: 'Bank',
            value:data.bank
        },
        {
            label: 'Branch',
            value: data.branch
        },
        {
            label: 'Act. Name',
            value: data.name
        },
        {
            label: 'Act.  Number',
            value: data.number
        }
    ]

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
                    title='Bank Accounts'
                    editButton={<AddIconButton onClick={handleNew} style={{marginTop:5}}/>}
                    icon={<MailIcon fontSize='small'/>}
                />
                <Divider/>
            </Grid>
            {bankAccounts.map(it => (
                <Grid item xs={6} key={it.id}>
                <SectionItemGrid buttons={<Box>
                    <EditIconButton onClick={handleClick(it)}/>
                    <DeleteIconButton onClick={handleDelete(it)}/>
                </Box>}>
                    <DetailView data={createFields(it)} useGrid={false}/>
                </SectionItemGrid>
                </Grid>
            ))}
            <EditDialog title={selected ? "Edit Bank Account" : "New Bank Account"} open={dialog} onClose={handleClose}>
                <BankAccountEditor data={selected} isNew={!selected} contactId={id} done={handleClose}/>
            </EditDialog>
        </Grid>
    );
}

export default BankAccounts;
