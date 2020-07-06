import React, {useEffect, useState} from 'react';
import {ILoan, ILoanFilter} from "../types";
import Box from "@material-ui/core/Box";
import XTable from "../../../components/table/XTable";
import {XHeadCell} from "../../../components/table/XTableHead";
import {contactLoanSumHeaderCells, personLoansSumHeadCells} from "./config";
import {ContactCategory, IContact} from "../../crm/types";
import Loading from "../../../components/loaders/Loading";
import {search} from "../../../utils/ajax";
import {remoteRoutes} from "../../../data/constants";

interface IProps {
    contact: IContact
}

let headCells: XHeadCell[] = [...contactLoanSumHeaderCells];
const ContactLoansSummary = ({contact}: IProps) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ILoan[]>([]);
    const isPerson = contact.category === ContactCategory.Person;
    if (isPerson) {
        headCells = personLoansSumHeadCells;
    }
    useEffect(() => {
        const isPerson = contact.category === ContactCategory.Person;
        const filter: ILoanFilter = {
            showAssigned: true,
            showNew: true,
            applicantId: isPerson ? contact.id : undefined,
            organizationId: isPerson ? undefined : contact.id
        }
        setLoading(true)
        search(remoteRoutes.loans, filter, (resp: ILoan[]) => {
            setData(resp)
        }, undefined, () => {
            setLoading(false)
        })
    }, [contact.category, contact.id])
    return (
        <Box width='100%'>
            {
                loading ? <Loading/> :
                    <Box p={0}>
                        <XTable
                            headCells={headCells}
                            data={data}
                            initialRowsPerPage={3}
                            usePagination={false}
                            headerSize='small'
                            bodySize='small'
                        />
                    </Box>
            }
        </Box>
    );
}


export default ContactLoansSummary;
