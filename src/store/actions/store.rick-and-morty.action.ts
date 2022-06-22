import {ActionTree} from 'vuex';
import {IState} from '@/store/models/store.state.models';
import axios from 'axios';
import {
    IRickAndMortyAllRequestConfig,
    RickAndMortyCharacter,
    RickAndMortyResponse
} from '@/store/models/types/RickAndMorty/RickAndMortyCharacter';
import {HttpClass} from '@/plugins/http.plugin';

export const StoreRickAndMortyAction: ActionTree<void, IState> = {
    all({}, allRequestConfig: IRickAndMortyAllRequestConfig): Promise<RickAndMortyResponse> {
        const url = HttpClass.prepareUrl('https://rickandmortyapi.com/api/character', allRequestConfig.filters, {page: allRequestConfig.page});
        return axios.get<RickAndMortyResponse>(url)
            .then(response => response.data);
    },
    get({}, id: number): Promise<RickAndMortyCharacter> {
        return axios.get<RickAndMortyCharacter>('https://rickandmortyapi.com/api/character/' + id)
            .then(response => response.data);
    }
};
