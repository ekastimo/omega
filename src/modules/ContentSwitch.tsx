import React, {Suspense, lazy} from 'react';
import {Route, Switch} from 'react-router-dom'
import {localRoutes} from "../data/constants";
import Loading from "../components/Loading";

const Dashboard = lazy(() => import( "./dashboard/Dashboard"));
const Contacts = lazy(() => import( "./contacts/list/Contacts"));
const ContactDetails = lazy(() => import( "./contacts/details/Details"));

const LoanDetails = lazy(() => import( "./loans/details/Details"));
const Loans = lazy(() => import( "./loans/list/LoansList"));

const InvoiceDetails = lazy(() => import( "./loans/invoices/InvoiceDetails"));
const InvoiceList = lazy(() => import( "./loans/invoices/InvoiceList"));

const Settings = lazy(() => import( "./settings/Settings"));
const Users = lazy(() => import( "./admin/users/Users"));
const Home = lazy(() => import( "./home/Home"));


const ContentSwitch = () => {
    return <Suspense fallback={Loading}>
        <Switch>
            <Route exact={true} path="/" component={Home}/>
            <Route path={localRoutes.dashboard} component={Dashboard}/>
            <Route path={localRoutes.contactsDetails} component={ContactDetails}/>
            <Route path={localRoutes.contacts} component={Contacts}/>
            <Route path={localRoutes.loansDetails} component={LoanDetails}/>
            <Route path={localRoutes.loans} component={Loans}/>
            <Route path={localRoutes.invoicesDetails} component={InvoiceDetails}/>
            <Route path={localRoutes.invoices} component={InvoiceList}/>
            <Route path={localRoutes.users} component={Users}/>
            <Route path={localRoutes.settings} component={Settings}/>
            <Route component={Home}/>
        </Switch>
    </Suspense>
}

export default ContentSwitch
