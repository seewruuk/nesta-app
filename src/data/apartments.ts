import {Apartment} from '@/src/types'

export const apartments: Apartment[] = [
    {
        id: '1',
        title: 'Przytulny apartament w centrum, wolne od lipca',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        price: 25000,
        city: 'Warszawa',
        area: 45,
        furnished: true,
        type: 'mieszkanie',
        images: [require('@/src/assets/images/apartment-image.png')],
        rating: 4.5,
    },
    {
        id: '2',
        title: 'Mieszkanie dla studenta do wynajęcia od zaraz',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',

        price: 3500,
        city: 'Kraków',
        area: 120,
        furnished: false,
        type: 'dom',
        images: [require('@/src/assets/images/apartment-image.png')],
        rating: 4.8,
    },
    {
        id: '3',
        title: 'Kawalerka przy plaży w centrum Gdańska',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        price: 1800,
        city: 'Gdańsk',
        area: 28,
        furnished: true,
        type: 'studio',
        images: [require('@/src/assets/images/apartment-image.png')],
        rating: 4.2,
    }
]
