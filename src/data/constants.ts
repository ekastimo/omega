export const AUTH_TOKEN_KEY = '__omega__token'
export const AUTH_USER_KEY = '__omega__user'







export const redux = {
    doLogin: 'DO_LOGIN',
    doLogout: 'DO_LOGOUT',
    doSearch: 'DO_SEARCH',
};

export const localRoutes = {
    dashboard: '/dashboard',
    contacts: '/contacts',
    contactsDetails: '/contacts/:contactId',

    loans: '/loans',
    loansDetails: '/loans/:loanId',

    invoices: '/invoices',
    invoicesDetails: '/invoices/:invoiceId',
    users: '/admin/users',
    usersGroups: '/admin/user-groups',
    tags: '/admin/tags',
    settings: '/admin/settings',
    help: '/help',
    login: '/login'
}

export const isDebug = process.env.NODE_ENV !== 'production'
export const url = isDebug ? 'http://localhost:9001' :
    'https://jasperapitest.azurewebsites.net'

export const remoteRoutes = {
    authServer: url,
    login: url + '/api/auth/login',
    profile: url + '/api/auth/profile',
    register: url + '/api/auth/register',
    resetPass: url + '/reset',
    contacts: url + '/api/crm/contact',
    contactsAdminOrg: url + '/api/crm/admin/org',
    contactsAdminResponsible: url + '/api/crm/admin/responsible',
    contactSearch: url + '/api/crm/contact/search',
    contactById: url + '/api/crm/contact/id',
    contactsPerson: url + '/api/crm/person',
    contactsChc: url + '/api/crm/person/chc',
    contactsEmail: url + '/api/crm/email',
    contactsTag: url + '/api/crm/tag',
    contactsUrl: url + '/api/crm/url',
    contactsBankAccount: url + '/api/crm/bankaccount',
    tags: url + '/api/tags',
    users: url + '/api/users',
    userGroups: url + '/api/user-groups',
    contactsPhone: url + '/api/crm/phone',
    contactsAddress: url + '/api/crm/address',
    contactsIdentification: url + '/api/crm/identification',

    groups: url + '/api/groups/group',
    peopleUpload: url + '/api/crm/import/people',
    peopleSample: url + '/api/crm/import/sample',

    contactsCompany: url + '/api/crm/company',
    contactsAvatar: url + '/api/crm/contact/avatar',

    invoices: url + '/api/inv/invoice',
    invoicesGenerate: url + '/api/inv/process/generate',
    invoicesPay: url + '/api/inv/process/pay',
    invoicesView: url + '/api/inv/process/view',
    invoicesEmail: url + '/api/inv/process/email',

    loans: url + '/api/loans/loan',
    loansTriggerPayment: url + '/api/loans/process/payout',
    loansTriggerRecover: url + '/api/loans/process/recover',


    documents: url + '/api/docs',
    documentsView: url + '/api/docs/view',
    documentsDownload: url + '/api/docs/download',

}



