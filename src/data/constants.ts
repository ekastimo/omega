export const AUTH_KEY_TOKEN = '__ri_client__token'
export const AUTH_KEY_USER = '__ri_client__user'
export const APP_NAME = 'Azima Credit Platform'
export const COMPANY_NAME = 'Azima Credit Technologies'


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

const urls: any = {
    dev: 'http://localhost:9001',
    test: 'https://jasperapitest.azurewebsites.net',
    production: 'https://azima.co.ug:9001'
}


const evVar = process.env.REACT_APP_ENV || 'test'
const environment = evVar.trim()
console.log(`############# Env : ${environment} ###############`)
const url = urls[environment]
export const isDebug = environment === 'dev'

export const remoteRoutes = {
    authServer: url,
    login: url + '/api/auth/login',
    loginPhone: url + '/api/auth/phone-login',

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
    usersComboAll: url + '/api/user-combo/all',
    usersComboPrimary: url + '/api/user-combo/primary',

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
    loansRequestLoan: url + '/api/loans/ussd',

    documents: url + '/api/docs',
    documentsView: url + '/api/docs/view',
    documentsDownload: url + '/api/docs/download',

}



