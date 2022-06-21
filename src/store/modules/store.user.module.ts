import {Module} from 'vuex';
import {IState} from '@/store/models/store.state.models';
import {UserAction} from '@/store/actions/store.user.action';
import {IUserState} from '@/store/models/store.user.models';

export const moduleUser: Module<IUserState, IState> = {
    namespaced: true,
    actions: UserAction
}
