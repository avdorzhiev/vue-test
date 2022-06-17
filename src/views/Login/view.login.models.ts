export enum RegisterFormEventEnum {
    'register-new-user' = 'register-new-user',
}

export interface IUser {
    username: string,
    password: string,
    id: number
}
