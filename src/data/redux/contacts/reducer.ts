import {
    IAddress,
    IBankAccount,
    IContact, IContactTag, IContactUrl,
    IEmail,
    IIdentification,
    IPerson,
    IPhone
} from "../../../modules/contacts/types";

export const crmConstants = {
    crmFetchAll: "crmFetchAll",
    crmFetchRecent: "crmFetchRecent",
    crmFetchLoading: "crmFetchLoading",
    crmFetchOne: "crmFetchOne",
    crmAddContact: "crmAddContact",
    crmEditPerson: "crmEditPerson",

    crmAddEmail: "crmAddEmail",
    crmEditEmail: "crmEditEmail",
    crmDeleteEmail: "crmDeleteEmail",

    crmAddPhone: "crmAddPhone",
    crmEditPhone: "crmEditPhone",
    crmDeletePhone: "crmDeletePhone",

    crmAddAddress: "crmAddAddress",
    crmEditAddress: "crmEditAddress",
    crmDeleteAddress: "crmDeleteAddress",

    crmAddIdentification: "crmAddIdentification",
    crmEditIdentification: "crmEditIdentification",
    crmDeleteIdentification: "crmDeleteIdentification",

    crmAddTag: "crmAddTag",
    crmEditTag: "crmEditTag",
    crmDeleteTag: "crmDeleteTag",

    crmAddUrl: "crmAddUrl",
    crmEditUrl: "crmEditUrl",
    crmDeleteUrl: "crmDeleteUrl",

    crmAddBankAccount: "crmAddBankAccount",
    crmEditBankAccount: "crmEditBankAccount",
    crmDeleteBankAccount: "crmDeleteBankAccount",

    crmAddOccasion: "crmAddOccasion",
    crmEditOccasion: "crmEditOccasion",
    crmDeleteOccasion: "crmDeleteOccasion",

    coreLogout: "CORE_LOGOUT"
}

export interface ICrmState {
    data: IContact[]
    recent: IContact[]
    selected?: IContact
    loading: boolean
}

const initialState: ICrmState = {
    data: [],
    recent: [],
    loading: true,
    selected: undefined
}

export default function reducer(state = initialState, action: any) {
    switch (action.type) {
        case crmConstants.crmFetchRecent: {
            const recent: IContact[] = action.payload
            return {...state, recent}
        }

        case crmConstants.crmFetchAll: {
            const data: IContact[] = action.payload
            return {...state, data, loading: false,}
        }

        case crmConstants.crmFetchLoading: {
            return {...state, loading: action.payload}
        }

        case crmConstants.crmAddContact: {
            const newContact: IContact[] = action.payload
            return {...state, data: [...state.data, newContact]}
        }

        case crmConstants.crmEditPerson: {
            const person: IPerson = action.payload
            if (state.selected) {
                const selected: IContact = {...state.selected, person}
                return {...state, selected}
            }
            return state
        }

        case crmConstants.crmFetchOne: {
            const selected: IContact = action.payload
            return {...state, selected}
        }

        case crmConstants.crmAddEmail: {
            const email: IEmail = action.payload
            if (state.selected) {
                const {emails, ...rest} = state.selected
                const selected: IContact = {...rest, emails: [...emails, email]}
                return {...state, selected}
            }
            return state
        }

        case crmConstants.crmEditEmail: {
            const email: IEmail = action.payload
            if (state.selected) {
                const {emails: oldEmails, ...rest} = state.selected
                const emails = oldEmails.map(it => it.id === email.id ? email : it)
                const selected: IContact = {...rest, emails}
                return {...state, selected}
            }
            return state
        }

        case crmConstants.crmDeleteEmail: {
            const id: string = action.payload
            if (state.selected) {
                const {emails, ...rest} = state.selected
                const selected: IContact = {...rest, emails: emails.filter(it => it.id === id)}
                return {...state, selected}
            }
            return state
        }
        case crmConstants.crmAddPhone: {
            const phone: IPhone = action.payload
            if (state.selected) {
                const {phones, ...rest} = state.selected
                const selected: IContact = {...rest, phones: [...phones, phone]}
                return {...state, selected}
            }
            return state
        }

        case crmConstants.crmEditPhone: {
            const phone: IPhone = action.payload
            if (state.selected) {
                const {phones: oldPhones, ...rest} = state.selected
                const phones = oldPhones.map(it => it.id === phone.id ? phone : it)
                const selected: IContact = {...rest, phones}
                return {...state, selected}
            }
            return state
        }

        case crmConstants.crmDeletePhone: {
            const id: string = action.payload
            if (state.selected) {
                const {phones, ...rest} = state.selected
                const selected: IContact = {...rest, phones: phones.filter(it => it.id === id)}
                return {...state, selected}
            }
            return state
        }

        case crmConstants.crmAddIdentification: {
            const identification: IIdentification = action.payload
            if (state.selected) {
                const {identifications, ...rest} = state.selected
                const selected: IContact = {...rest, identifications: [...identifications, identification]}
                return {...state, selected}
            }
            return state
        }

        case crmConstants.crmEditIdentification: {
            const identification: IIdentification = action.payload
            if (state.selected) {
                const {identifications: oldIdentifications, ...rest} = state.selected
                const identifications = oldIdentifications.map(it => it.id === identification.id ? identification : it)
                const selected: IContact = {...rest, identifications}
                return {...state, selected}
            }
            return state
        }
        case crmConstants.crmDeleteIdentification: {
            const id: string = action.payload
            if (state.selected) {
                const {identifications, ...rest} = state.selected
                const selected: IContact = {...rest, identifications: identifications.filter(it => it.id === id)}
                return {...state, selected}
            }
            return state
        }

        case crmConstants.crmAddAddress: {
            const address: IAddress = action.payload
            if (state.selected) {
                const {addresses, ...rest} = state.selected
                const selected: IContact = {...rest, addresses: [...addresses, address]}
                return {...state, selected}
            }
            return state
        }

        case crmConstants.crmEditAddress: {
            const address: IAddress = action.payload
            if (state.selected) {
                const {addresses: oldAddresses, ...rest} = state.selected
                const addresses = oldAddresses.map(it => it.id === address.id ? address : it)
                const selected: IContact = {...rest, addresses}
                return {...state, selected}
            }
            return state
        }

        case crmConstants.crmDeleteAddress: {
            const id: string = action.payload
            if (state.selected) {
                const {addresses, ...rest} = state.selected
                const selected: IContact = {...rest, addresses: addresses.filter(it => it.id === id)}
                return {...state, selected}
            }
            return state
        }

        case crmConstants.crmAddBankAccount: {
            const bankAccount: IBankAccount = action.payload
            if (state.selected) {
                const {bankAccounts, ...rest} = state.selected
                const selected: IContact = {...rest, bankAccounts: [...bankAccounts, bankAccount]}
                return {...state, selected}
            }
            return state
        }

        case crmConstants.crmEditBankAccount: {
            const bankAccount: IBankAccount = action.payload
            if (state.selected) {
                const {bankAccounts: oldBankAccounts, ...rest} = state.selected
                const bankAccounts = oldBankAccounts.map(it => it.id === bankAccount.id ? bankAccount : it)
                const selected: IContact = {...rest, bankAccounts}
                return {...state, selected}
            }
            return state
        }
        case crmConstants.crmDeleteBankAccount: {
            const id: string = action.payload
            if (state.selected) {
                const {bankAccounts, ...rest} = state.selected
                const selected: IContact = {...rest, bankAccounts: bankAccounts.filter(it => it.id === id)}
                return {...state, selected}
            }
            return state
        }

        case crmConstants.crmAddTag: {
            const tag: IContactTag = action.payload
            if (state.selected) {
                const {tags, ...rest} = state.selected
                const selected: IContact = {...rest, tags: [...tags, tag]}
                return {...state, selected}
            }
            return state
        }

        case crmConstants.crmEditTag: {
            const tag: IContactTag = action.payload
            if (state.selected) {
                const {tags: oldTags, ...rest} = state.selected
                const tags = oldTags.map(it => it.id === tag.id ? tag : it)
                const selected: IContact = {...rest, tags}
                return {...state, selected}
            }
            return state
        }

        case crmConstants.crmDeleteTag: {
            const id: string = action.payload
            if (state.selected) {
                const {tags, ...rest} = state.selected
                const selected: IContact = {...rest, tags: tags.filter(it => it.id === id)}
                return {...state, selected}
            }
            return state
        }



        case crmConstants.crmAddUrl: {
            const url: IContactUrl = action.payload
            if (state.selected) {
                const {urls, ...rest} = state.selected
                const selected: IContact = {...rest, urls: [...urls, url]}
                return {...state, selected}
            }
            return state
        }

        case crmConstants.crmEditUrl: {
            const url: IContactUrl = action.payload
            if (state.selected) {
                const {urls: oldUrls, ...rest} = state.selected
                const urls = oldUrls.map(it => it.id === url.id ? url : it)
                const selected: IContact = {...rest, urls}
                return {...state, selected}
            }
            return state
        }

        case crmConstants.crmDeleteUrl: {
            const id: string = action.payload
            if (state.selected) {
                const {urls, ...rest} = state.selected
                const selected: IContact = {...rest, urls: urls.filter(it => it.id === id)}
                return {...state, selected}
            }
            return state
        }

        default: {
            return state
        }
    }
}
