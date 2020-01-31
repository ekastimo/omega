import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {intRange} from "../../../utils/numberHelpers";
import {fakeLoan, ILoan} from "../types";
import Box from "@material-ui/core/Box";
import XTable from "../../../components/table/XTable";
import {XHeadCell} from "../../../components/table/XTableHead";
import {columns, contactLoanSumHeaderCells, personLoansHeadCells, personLoansSumHeadCells} from "./config";
import {ContactCategory, IContact} from "../../contacts/types";
import Loading from "../../../components/Loading";

interface IProps {
    contact: IContact
}

let headCells: XHeadCell[] = [...contactLoanSumHeaderCells];
const ContactLoansSummary = ({contact}: IProps) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ILoan[]>([]);

    if (contact.category === ContactCategory.Person) {
        headCells = personLoansSumHeadCells;
    }
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            const data = intRange(1, 4).map(fakeLoan)
            setData(data)
            setLoading(false)
        }, 1000)
    }, [dispatch])
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
