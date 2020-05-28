import React from "react"
import {Route, Switch} from 'react-router-dom'
import {localRoutes} from "../data/constants";
import Dashboard from "./dashboard/Dashboard";
import Contacts from "./contacts/list/Contacts";
import ContactDetails from "./contacts/details/Details";
import LoanDetails from "./loans/details/Details";
import Loans from "./loans/list/ListView";

import InvoiceDetails from "./loans/invoices/InvoiceDetails";
import InvoiceList from "./loans/invoices/InvoiceList";

import Settings from "./settings/Settings";
import Users from "./admin/users/Users";


const ContentSwitch = () => {
    return <Switch>
        <Route exact={true} path="/" component={Dashboard}/>
        <Route path={localRoutes.dashboard} component={Dashboard}/>
        <Route path={localRoutes.contactsDetails} component={ContactDetails}/>
        <Route path={localRoutes.contacts} component={Contacts}/>
        <Route path={localRoutes.loansDetails} component={LoanDetails}/>
        <Route path={localRoutes.loans} component={Loans}/>
        <Route path={localRoutes.invoicesDetails} component={InvoiceDetails}/>
        <Route path={localRoutes.invoices} component={InvoiceList}/>
        <Route path={localRoutes.users} component={Users}/>
        <Route path={localRoutes.settings} component={Settings}/>
        <Route component={Dashboard}/>
    </Switch>
}

export default ContentSwitch
