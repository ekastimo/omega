import React, {useEffect, useState} from 'react';
import {ILoan, ILoanFilter} from "../types";
import Box from "@material-ui/core/Box";
import XTable from "../../../components/table/XTable";
import {XHeadCell} from "../../../components/table/XTableHead";
import {companyLoansHeadCells, personLoansHeadCells} from "./config";
import {ContactCategory, IContact} from "../../crm/types";
import Loading from "../../../components/loaders/Loading";
import {search} from "../../../utils/ajax";
import {remoteRoutes} from "../../../data/constants";

interface IProps {
    contact: IContact
}

let headCells: XHeadCell[] = [...companyLoansHeadCells];
const ContactLoans = ({contact}: IProps) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ILoan[]>([]);

    if (contact.category === ContactCategory.Person) {
        headCells = personLoansHeadCells;
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
                loading ? <Box style={{height: 400}}><Loading/></Box> :
                    <Box>
                        <XTable
                            headCells={headCells}
                            data={data}
                            initialRowsPerPage={5}
                            usePagination={true}
                        />
                    </Box>

            }
        </Box>
    );
}


export default ContactLoans;
