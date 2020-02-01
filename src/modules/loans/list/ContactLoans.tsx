import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {intRange} from "../../../utils/numberHelpers";
import {fakeLoan, ILoan} from "../types";
import Box from "@material-ui/core/Box";
import XTable from "../../../components/table/XTable";
import {XHeadCell} from "../../../components/table/XTableHead";
import {companyLoansHeadCells, personLoansHeadCells} from "./config";
import {ContactCategory, IContact} from "../../contacts/types";
import Loading from "../../../components/Loading";

interface IProps {
    contact: IContact
}

let headCells: XHeadCell[] = [...companyLoansHeadCells];
const ContactLoans = ({contact}: IProps) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ILoan[]>([]);

    if (contact.category === ContactCategory.Person) {
        headCells = personLoansHeadCells;
    }
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            const data = intRange(1, 7).map(fakeLoan)
            setData(data)
            setLoading(false)
        }, 1000)
    }, [dispatch])
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