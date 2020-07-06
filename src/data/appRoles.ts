import {AppUser} from "./types";

export const appRoles = {
    Super: "SUPER",
    Admin: "ADMIN",
    Primary: "PRIMARY",
    ClientAdmin: "CLIENT_ADMIN",
    CrmManager: "CRM_MANAGER",
    LoansManager: "LOANS_MANAGER",

    User: "USER",
}

export const primaryRoles = [appRoles.Admin, appRoles.Primary]
export const clientRoles = [appRoles.ClientAdmin, appRoles.CrmManager, appRoles.LoansManager]
export const backOfficeRoles = [...primaryRoles, appRoles.ClientAdmin, appRoles.CrmManager, appRoles.LoansManager]
export const primaryAssignRoles = [...backOfficeRoles, appRoles.User]
export const clientAssignRoles = [...clientRoles, appRoles.User]

export const hasRole = (user: AppUser, role: string): boolean => {
    return user.roles.indexOf(role) > -1
}

export const hasAnyRole = (user: AppUser, roles: string[]): boolean => {
    return roles.some(it => hasRole(user, it))
}

export const isPrimaryUser = (user: AppUser) => {
    return hasAnyRole(user, [...primaryRoles, appRoles.Super])
}

export const isBackOfficeUser = (user: AppUser) => {
    return hasAnyRole(user, [...backOfficeRoles, appRoles.Super])
}

export const isClientAdmin = (user: AppUser) => {
    return hasAnyRole(user, [appRoles.ClientAdmin])
}
