import React, {useEffect, useState} from 'react';
import {Box} from "@material-ui/core";
import {ILoan, ILoanFilter} from "../types";
import {ContactCategory, IContact} from "../../contacts/types";
import {contactPrevHeaderCells, personPrevHeaderCells} from "../list/config";
import {XHeadCell} from "../../../components/table/XTableHead";
import Loading from "../../../components/Loading";
import XTable from "../../../components/table/XTable";
import {search} from "../../../utils/ajax";
import {remoteRoutes} from "../../../data/constants";

interface IProps {
    data: ILoan
}

let headCells: XHeadCell[] = [...contactPrevHeaderCells];
const PreviousLoans = ({data}: IProps) => {
    const contact: IContact = data.applicant
    const [loading, setLoading] = useState(false);
    const [loans, setLoans] = useState<ILoan[]>([]);
    if (contact.category === ContactCategory.Person) {
        headCells = personPrevHeaderCells;
    }
    useEffect(() => {
        const filter: ILoanFilter = {
            showAssigned: true,
            showNew: true,
            applicantId: data.applicantId
        }
        setLoading(true)
        search(remoteRoutes.loans, filter, (resp: ILoan[]) => {
            //remove Active loan
            const newLoans = resp.filter(it => it.id !== data.id)
            setLoans(newLoans)

        }, undefined, () => {
            setLoading(false)
        })
    }, [data.applicantId, data.id])
    return (
        <div>
            {
                loading ? <Loading/> :
                    <Box p={0}>
                        <XTable
                            headCells={headCells}
                            data={loans}
                            initialRowsPerPage={3}
                            usePagination={false}
                            headerSize='small'
                            bodySize='small'
                        />
                    </Box>
            }
        </div>
    );
}
export default PreviousLoans;
