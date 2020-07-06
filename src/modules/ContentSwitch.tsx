import React, {lazy, Suspense} from 'react';
import {Route, Switch} from 'react-router-dom'
import {localRoutes} from "../data/constants";

import LayoutLoading from "./auth/LayoutLoading";
import Home from "./home/Home";

const Dashboard = lazy(() => import( "./dashboard/Dashboard"));
const Contacts = lazy(() => import( "./crm/list/ContactsList"));
const ContactDetails = lazy(() => import( "./crm/details/ContactDetails"));
const UsersList = lazy(() => import( "./admin/users/UsersList"));

const LoanDetails = lazy(() => import( "./loans/details/Details"));
const Loans = lazy(() => import( "./loans/list/LoansList"));

const InvoiceDetails = lazy(() => import( "./loans/invoices/InvoiceDetails"));
const InvoiceList = lazy(() => import( "./loans/invoices/InvoiceList"));

const ContentSwitch = () => {
    return <Suspense fallback={<LayoutLoading/>}>
        <Switch>
            <Route exact={true} path="/" component={Dashboard}/>
            <Route path={localRoutes.dashboard} component={Dashboard}/>
            <Route path={localRoutes.contactsDetails} component={ContactDetails}/>
            <Route path={localRoutes.contacts} component={Contacts}/>
            <Route path={localRoutes.users} component={UsersList}/>
            <Route path={localRoutes.loansDetails} component={LoanDetails}/>
            <Route path={localRoutes.loans} component={Loans}/>
            <Route path={localRoutes.invoicesDetails} component={InvoiceDetails}/>
            <Route path={localRoutes.invoices} component={InvoiceList}/>
            <Route component={Home}/>
        </Switch>
    </Suspense>
}


export default ContentSwitch
