import React, {useEffect, useState} from 'react';
import {Box} from "@material-ui/core";
import {ILoan, ILoanFilter} from "../../types";
import {renderStatus, renderSubStatus} from "../../list/config";
import {XHeadCell} from "../../../../components/table/XTableHead";
import Loading from "../../../../components/loaders/Loading";
import XTable from "../../../../components/table/XTable";
import {search} from "../../../../utils/ajax";
import {remoteRoutes} from "../../../../data/constants";
import LoanLink from "../../../../components/links/LoanLink";
import {printDateTime} from "../../../../utils/dateHelpers";
import {printMoney} from "../../../../utils/numberHelpers";

interface IProps {
    data: ILoan
}

export const headCells: XHeadCell[] = [
    {
        name: 'applicationDate',
        label: 'Date',
        render: (value, rec) => <LoanLink id={rec.id} name={printDateTime(value)}/>
    },
    {
        name: 'status', label: 'Status',
        render: renderStatus
    },
    {
        name: 'subStatus', label: 'Sub-Status', render: renderSubStatus
    },
    {
        name: 'amount', label: 'Amount', render: value => printMoney(value)
    }
];


const PreviousLoans = ({data}: IProps) => {
    const [loading, setLoading] = useState(false);
    const [loans, setLoans] = useState<ILoan[]>([]);
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
                            initialRowsPerPage={loans.length > 3 ? 3 : 1}
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
