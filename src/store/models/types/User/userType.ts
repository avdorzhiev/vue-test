type TName = {
    title: string;
    first: string;
    last: string;
}


export type UserType = {
    results: {
        'gender': 'male' | 'female',
        'name': TName,
        'location': {
            'street': string,
            'city': string,
            'state': string,
            'postcode': number,
            'coordinates': {
                latitude: string;
                longitude: string;
            },
            'timezone': {
                offset: string;
                description: string;
            }
        },
        email: string,
        'dob': {
            'date': string,
            'age': number
        },
        'phone': string,
        'cell': string,
        'id': {
            'name': string;
            'value': number;
        },
        'picture': {
            large: string;
            medium: string;
            thumbnail: string;
        },
    }[]
}
