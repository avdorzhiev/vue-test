import {ActionTree} from 'vuex';
import axios from 'axios';

import {IState} from '@/store/models/store.state.models';
import {UserType} from '@/store/models/types/User/userType';
import {IUserState} from '@/store/models/store.user.models';

export const UserAction: ActionTree<IUserState, IState> = {
    get(): Promise<UserType> {
        return axios.get<UserType>('https://randomuser.me/api/')
            .then(response => response.data);
    }
};
