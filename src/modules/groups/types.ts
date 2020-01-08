export interface IGroup{
    id?: string
    name: string
    category: any
    privacy: GroupPrivacy
    details?: string
    parent: any | null
}

export enum GroupPrivacy {
    Private = "Private",
    Public = "Public"
}

export enum GroupRole {
    Member = 'Member',
    Leader = "Leader"
}

export interface IStats {
    isComplete: boolean
    percentage: number
    childCount: number
}
