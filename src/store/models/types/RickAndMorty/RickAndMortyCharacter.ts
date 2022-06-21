export enum RickAndMortyCharacterStatusEnum {
    Dead = 'Dead',
    Alive = 'Alive',
    unknown = 'unknown',
}

export enum RickAndMortyCharacterGenderEnum {
    unknown = 'unknown',
    Female = 'Female',
    Male = 'Male',
    Genderless = 'Genderless',
}

export interface IRickAndMortyAllRequestConfig  {
    page?: number,
    filters?: {
        name?: string,
        status?: RickAndMortyCharacterStatusEnum,
        type?: string,
        gender?: RickAndMortyCharacterGenderEnum,
    }
}

export type RickAndMortyResponse = {
    info: {
        count: number;
        pages: number;
        next: string;
        prev: string;
    };
    results: RickAndMortyCharacter[]
}

export type RickAndMortyCharacter = {
    id: number;
    name: string;
    status: RickAndMortyCharacterStatusEnum;
    species: string;
    type: string;
    gender: RickAndMortyCharacterGenderEnum;
    image: string;
    location: {name: string; url: string},
    origin: {name: string; url: string},
    created: string;
}
