import React from 'react';
import Box from "@material-ui/core/Box";
import DataList from "../../../components/DataList";
import {AddFabButton} from "../../../components/EditIconButton";
import {remoteRoutes} from "../../../data/constants";
import Hidden from "@material-ui/core/Hidden";
import EditDialog from "../../../components/EditDialog";
import UserEditor from "./UserEditor";
import Layout from "../../../layout/Layout";
import Header from "../../../components/Header";
import {columns, toMobile, UserListModel} from "./config";
import {useCrud} from "../../../data/hooks/useCrud";
import TableLoading from "../../../components/loaders/TableLoading";

const UsersList = () => {
    const crud = useCrud<UserListModel>({
        initialFilter: {},
        url: remoteRoutes.users
    })
    return (
        <Layout>
            <Box p={1}>
                <Header
                    title='User list'
                    onAddNew={crud.onStartNew}
                    onChange={query => crud.onFilter({query})}
                />
                {
                    crud.loading ?
                        <TableLoading/> :
                        <DataList
                            data={crud.data}
                            toMobileRow={toMobile}
                            columns={columns}
                            onEditClick={crud.onStartEdit}
                        />
                }
            </Box>
            <Hidden mdUp>
                <AddFabButton onClick={crud.onStartNew}/>
            </Hidden>
            <EditDialog
                title={crud.selected ? `Edit ${crud.selected.fullName}` : 'Create User'}
                open={crud.dialog}
                onClose={crud.onCloseDialog}
            >
                <UserEditor
                    data={crud.selected}
                    isNew={!crud.selected}
                    done={crud.onSubmitComplete}
                    onDeleted={crud.onDeleted}
                    onCancel={crud.onCloseDialog}
                />
            </EditDialog>
        </Layout>
    )
}

export default UsersList
