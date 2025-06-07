// src/data/offers.ts

import { apartments } from './apartments';

export interface Offer {
    id: string;
    apartmentId: string;
    title: string;
    status: 'Szkic' | 'Opublikowany';
    description: string;
    rentPrice: number;
    deposit: number;
    extraFees: {
        internet: 'Dodatkowe' | 'Wliczone';
        utilities: 'Dodatkowe' | 'Wliczone';
    };
    availableFrom: string;
    minTermMonths: number;
    shortTermAllowed: boolean;
    preferredTenants: string[];
    parkingIncluded: boolean;
    elevator: boolean;
    wheelchairAccess: boolean;
    petsAllowed: 'Tak' | 'Nie' | 'Do ustalenia';
    tvInternet: boolean;
    heatingType: string;
    smokingAllowed: 'Tak' | 'Nie' | 'Do ustalenia';
    cellar: boolean;
}

export const offers: Offer[] = [
    {
        id: 'offer1',
        apartmentId: 'apt1',
        title: 'Przytulne mieszkanie w centrum Warszawy, wolne od lipca!',
        status: 'Opublikowany',
        description: 'Umeblowane dwupokojowe mieszkanie w ścisłym centrum...',
        rentPrice: 3500,
        deposit: 3500,
        extraFees: { internet: 'Wliczone', utilities: 'Dodatkowe' },
        availableFrom: '2025-07-01',
        minTermMonths: 6,
        shortTermAllowed: false,
        preferredTenants: ['Student', 'Para'],
        parkingIncluded: true,
        elevator: true,
        wheelchairAccess: false,
        petsAllowed: 'Do ustalenia',
        tvInternet: true,
        heatingType: 'Gazowe',
        smokingAllowed: 'Nie',
        cellar: false,
    },
    {
        id: 'offer2',
        apartmentId: 'apt2',
        title: 'Jasny pokój na parterze w Krakowie',
        status: 'Szkic',
        description: 'Pokój z dostępem do kuchni, idealny dla studenta...',
        rentPrice: 1500,
        deposit: 1500,
        extraFees: { internet: 'Dodatkowe', utilities: 'Wliczone' },
        availableFrom: '2025-06-15',
        minTermMonths: 12,
        shortTermAllowed: true,
        preferredTenants: ['Student'],
        parkingIncluded: false,
        elevator: false,
        wheelchairAccess: true,
        petsAllowed: 'Tak',
        tvInternet: true,
        heatingType: 'Elektryczne',
        smokingAllowed: 'Do ustalenia',
        cellar: true,
    },
    {
        id: 'offer3',
        apartmentId: 'apt3',
        title: 'Eleganckie 3-pokoje we Wrzeszczu',
        status: 'Opublikowany',
        description: 'Przestronne mieszkanie, blisko SKM i tramwaju. Idealne dla rodziny.',
        rentPrice: 4500,
        deposit: 4500,
        extraFees: { internet: 'Wliczone', utilities: 'Dodatkowe' },
        availableFrom: '2025-08-01',
        minTermMonths: 12,
        shortTermAllowed: false,
        preferredTenants: ['Rodzina', 'Para'],
        parkingIncluded: true,
        elevator: true,
        wheelchairAccess: true,
        petsAllowed: 'Tak',
        tvInternet: true,
        heatingType: 'Gazowe',
        smokingAllowed: 'Nie',
        cellar: false,
    },
    {
        id: 'offer4',
        apartmentId: 'apt3',
        title: 'Komfortowe 3 pokoje z widokiem',
        status: 'Szkic',
        description: 'Nowoczesne wnętrza, balkon z panoramą miasta.',
        rentPrice: 4800,
        deposit: 4800,
        extraFees: { internet: 'Dodatkowe', utilities: 'Wliczone' },
        availableFrom: '2025-09-15',
        minTermMonths: 6,
        shortTermAllowed: true,
        preferredTenants: ['Student', 'Para'],
        parkingIncluded: false,
        elevator: true,
        wheelchairAccess: false,
        petsAllowed: 'Do ustalenia',
        tvInternet: true,
        heatingType: 'Elektryczne',
        smokingAllowed: 'Do ustalenia',
        cellar: true,
    },
    {
        id: 'offer5',
        apartmentId: 'apt4',
        title: 'Przytulne 2-pokoje pod Ratuszem',
        status: 'Opublikowany',
        description: 'Idealne dla singla lub pary, blisko restauracji i sklepów.',
        rentPrice: 3200,
        deposit: 3200,
        extraFees: { internet: 'Wliczone', utilities: 'Wliczone' },
        availableFrom: '2025-07-10',
        minTermMonths: 6,
        shortTermAllowed: false,
        preferredTenants: ['Para', 'Singiel'],
        parkingIncluded: false,
        elevator: false,
        wheelchairAccess: false,
        petsAllowed: 'Nie',
        tvInternet: true,
        heatingType: 'Elektryczne',
        smokingAllowed: 'Nie',
        cellar: false,
    },
    {
        id: 'offer6',
        apartmentId: 'apt5',
        title: 'Przestronny dom na Wildzie',
        status: 'Opublikowany',
        description: 'Dom z ogrodem, garażem i możliwością palenia na zewnątrz.',
        rentPrice: 7000,
        deposit: 7000,
        extraFees: { internet: 'Dodatkowe', utilities: 'Dodatkowe' },
        availableFrom: '2025-10-01',
        minTermMonths: 12,
        shortTermAllowed: false,
        preferredTenants: ['Rodzina'],
        parkingIncluded: true,
        elevator: false,
        wheelchairAccess: false,
        petsAllowed: 'Tak',
        tvInternet: true,
        heatingType: 'Gazowe',
        smokingAllowed: 'Do ustalenia',
        cellar: true,
    },
    {
        id: 'offer7',
        apartmentId: 'apt5',
        title: 'Dom z dużym ogrodem – idealny dla zwierząt',
        status: 'Szkic',
        description: 'Duża przestrzeń, miejsce na grilla i basen ogrodowy.',
        rentPrice: 7500,
        deposit: 7500,
        extraFees: { internet: 'Wliczone', utilities: 'Dodatkowe' },
        availableFrom: '2025-11-01',
        minTermMonths: 6,
        shortTermAllowed: true,
        preferredTenants: ['Rodzina', 'Para'],
        parkingIncluded: true,
        elevator: false,
        wheelchairAccess: false,
        petsAllowed: 'Tak',
        tvInternet: true,
        heatingType: 'Gazowe',
        smokingAllowed: 'Tak',
        cellar: true,
    },
];
