import {UserType} from '@/store/models/types/User/userType';
import {RickAndMortyCharacter, RickAndMortyResponse} from '@/store/models/types/RickAndMorty/RickAndMortyCharacter';

export interface IStoreRickAndMortyAction {
    all: Promise<RickAndMortyResponse>
    get(characterId: number): Promise<RickAndMortyCharacter>
}
