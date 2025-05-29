import {Apartment} from '@/src/types'

export const apartments: Apartment[] = [
    {
        id: '1',
        title: 'Przytulny apartament w centrum',
        description: 'Nowoczesne mieszkanie 2-pokojowe w sercu miasta.',
        pricePerNight: 200,
        city: 'Warszawa',
        area: 45,
        furnished: true,
        type: 'mieszkanie',
        images: [require('@/src/assets/images/bg.png')],
        rating: 4.5,
    },
    {
        id: '2',
        title: 'Dom z ogrodem',
        description: 'Przestronny dom z dużym ogrodem.',
        pricePerNight: 350,
        city: 'Kraków',
        area: 120,
        furnished: false,
        type: 'dom',
        images: [require('@/src/assets/images/rankingGradient.png')],
        rating: 4.8,
    },
    {
        id: '3',
        title: 'Kawalerka przy plaży',
        description: 'Urocza kawalerka blisko morza.',
        pricePerNight: 180,
        city: 'Gdańsk',
        area: 28,
        furnished: true,
        type: 'studio',
        images: [require('@/src/assets/images/highlight.png')],
        rating: 4.2,
    }
]
