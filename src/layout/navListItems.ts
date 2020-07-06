import AppsIcon from "@material-ui/icons/Apps";
import PeopleIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";
import MoneyIcon from "@material-ui/icons/Money";
import FileIcon from "@material-ui/icons/FileCopy";
import {localRoutes} from "../data/constants";

export const menuItems = [
    {
        name: "Dashboard",
        route: localRoutes.dashboard,
        icon: AppsIcon
    },
    {
        icon: MoneyIcon,
        name: "Loans",
        route: localRoutes.loans
    },
    {
        icon: FileIcon,
        name: "Invoices",
        route: localRoutes.invoices
    },
    {
        icon: PeopleIcon,
        name: "Contacts",
        route: localRoutes.contacts
    },
    {
        name: "Admin",
        route: localRoutes.settings,
        icon: SettingsIcon,
        items: [
            {
                name: "Users",
                route: localRoutes.users
            }
        ]
    }
]
