import {UserType} from '@/store/models/types/User/userType';


export interface IUserState {
    user: UserType;
}

export interface IUserGetters {
    user: UserType
}

export interface IUserAction {
    get: Promise<UserType>
}
