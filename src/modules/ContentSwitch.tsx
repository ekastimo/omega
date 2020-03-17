import React from "react"
import {Link, Route, Switch} from 'react-router-dom'
import {localRoutes} from "../data/constants";
import Dashboard from "./dashboard/Dashboard";
import Contacts from "./contacts/list/Contacts";
import ContactDetails from "./contacts/details/Details";
import LoanDetails from "./loans/details/Details";
import Loans from "./loans/list/FullList";
import Settings from "./settings/Settings";
import Layout from "../components/layout/Layout";
import Users from "./admin/users/Users";


const ContentSwitch = () => {
    return <Switch>
        <Route exact={true} path="/" component={Dashboard}/>
        <Route path={localRoutes.dashboard} component={Dashboard}/>
        <Route path={localRoutes.contactsDetails} component={ContactDetails}/>
        <Route path={localRoutes.contacts} component={Contacts}/>
        <Route path={localRoutes.loansDetails} component={LoanDetails}/>
        <Route path={localRoutes.loans} component={Loans}/>
        <Route path={localRoutes.users} component={Users}/>
        <Route path={localRoutes.settings} component={Settings}/>
        <Route component={NoMatch}/>
    </Switch>
}

const NoMatch = () => (
    <Layout>
        <h2>Oops nothing here!!</h2>
        <Link to="/">Take me home</Link>
    </Layout>
)

export default ContentSwitch
