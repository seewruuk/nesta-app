/**
 * Offers data module.
 *
 * Contains a predefined list of rental offers used within the application.
 * Each offer is linked to a specific apartment and includes details such as pricing, availability,
 * tenant preferences, additional fees, and user reservations.
 *
 * Types:
 * - Offer: Interface defining a rental offer structure.
 * - ReservedAppointment: Interface representing a reservation made by a user.
 *
 * Exports:
 * - offers: Array of Offer objects available for display and reservation in the app.
 *
 * @module
 */



/**
 * Represents a single reservation made by a user for a specific time slot.
 *
 * @property date - Reservation date in 'YYYY-MM-DD' format.
 * @property time - Reservation time in 'HH:mm' format.
 * @property userId - ID of the user who made the reservation.
 */
export interface ReservedAppointment {
    date: string;
    time: string;
    userId: string;
}


/**
 * Represents a rental offer for a specific apartment.
 *
 * @property id - Unique identifier for the offer.
 * @property title - Title or headline of the offer.
 * @property description - Full description of the offer's terms and apartment features.
 * @property apartmentId - ID of the apartment linked to the offer.
 * @property authorId - ID of the user who created the offer.
 * @property rentPrice - Monthly rental price in PLN.
 * @property deposit - Required deposit in PLN.
 * @property extraFees - Object containing information about internet and utilities fees.
 * @property availableFrom - Starting date of availability (ISO string).
 * @property minTermMonths - Minimum number of months for rental.
 * @property shortTermAllowed - Whether short-term rentals are allowed.
 * @property preferredTenants - Array indicating the preferred types of tenants (e.g., 'students', 'non-smokers').
 * @property reservedAppointments - Array of time slots already reserved by users.
 * @property parkingIncluded - Whether parking is included in the offer.
 * @property elevator - Whether the apartment building has an elevator.
 * @property wheelchairAccess - Whether the apartment is wheelchair accessible.
 * @property petsAllowed - Whether pets are allowed (true/false or a string).
 * @property tvInternet - Whether TV/Internet is included in the rent.
 * @property heatingType - Type of heating used in the apartment (e.g., 'gas', 'central').
 * @property smokingAllowed - Whether smoking is allowed (true/false or limited).
 * @property cellar - Whether a cellar is available.
 */
export interface Offer {
    id: string;
    apartmentId: string;
    authorId: string;
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
    reservedAppointments?: ReservedAppointment[];
    tenantId?: string;
}

export const offers: Offer[] = [
    {
        id: 'offer1',
        apartmentId: 'apt1',
        authorId:  'user1',
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
        tenantId: 'user2'
    },
    {
        id: 'offer2',
        apartmentId: 'apt2',
        authorId:  'user2',
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
        authorId:  'user1',
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
        authorId:  'user1',
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
        authorId:  'user3',
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
        authorId:  'user1',
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
        authorId:  'user1',
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
