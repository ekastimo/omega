import {localRoutes} from "../../data/constants";
import AppsIcon from "@material-ui/icons/Apps";
import PeopleIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";
import MoneyIcon from "@material-ui/icons/Money";

export const menuItems = [
    {
        name: "Dashboard",
        route: localRoutes.dashboard,
        icon: AppsIcon
    },
    {
        icon: MoneyIcon,
        name: "Loans",
        route: localRoutes.cases
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
            },
            {
                name: "User Groups",
                route: localRoutes.usersGroups
            },
            {
                name: "Settings",
                route: localRoutes.settings
            },
        ]
    }
]
