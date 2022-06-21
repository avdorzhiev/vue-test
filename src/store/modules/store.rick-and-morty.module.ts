import {StoreRickAndMortyAction} from '@/store/actions/store.rick-and-morty.action';
import {Module} from 'vuex';
import {IState} from '@/store/models/store.state.models';

export const StoreRickAndMortyModule: Module<void, IState> = {
    namespaced: true,
    actions: StoreRickAndMortyAction
}
