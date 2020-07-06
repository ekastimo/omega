import {AppUser} from "../data/types";

export function isSuper(user: AppUser | null) {
    return (user && user?.roles.indexOf("SUPER") > -1)
}
