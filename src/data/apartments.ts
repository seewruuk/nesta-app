/**
 * Apartments data module.
 *
 * Provides a static list of apartment objects available in the system.
 * Each apartment includes structural details, location info, amenity references, and images.
 * Apartments are referenced by rental offers and serve as the primary real estate units in the app.
 *
 * Types:
 * - Apartment: Interface describing the structure of an apartment object.
 *
 * Exports:
 * - apartments: Array of Apartment objects.
 *
 * @module
 */




/**
 * Represents a residential apartment listed in the system.
 *
 * @property id - Unique identifier for the apartment.
 * @property type - Type of apartment (e.g., 'Studio', '2 Bedroom').
 * @property area - Total area of the apartment in square meters.
 * @property roomsCount - Total number of rooms.
 * @property bedroomsCount - Number of bedrooms.
 * @property bathroomsCount - Number of bathrooms.
 * @property floor - The floor number the apartment is located on.
 * @property furnished - Indicates whether the apartment is furnished.
 * @property amenities - Array of amenity IDs assigned to this apartment.
 * @property images - Array of image URLs for the apartment gallery.
 * @property location - Object containing city, district, full address, and Google Maps link.
 */
export interface Apartment {
    id: string;
    images: string[];
    type: string;
    area: number;
    roomsCount: number;
    bedroomsCount: number;
    floor: string;
    bathroomsCount: number;
    furnished: 'Tak' | 'Nie' | 'Częściowo';
    location: {
        city: string;
        district: string;
        fullAddress: string;
        coordinates: { lat: number; lng: number };
    };
    googleMapsLink: string;
    amenities: string[];
    rating: number;
}



/**
 * Provides location details for an apartment.
 *
 * @property city - The city where the apartment is located.
 * @property district - District or neighborhood.
 * @property fullAddress - Full street address with number.
 * @property googleMapsLink - URL to view the apartment on Google Maps.
 */
export const apartments: Apartment[] = [
    {
        id: 'apt1',
        images: ['https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
        type: 'Mieszkanie',
        area: 50.5,
        roomsCount: 2,
        bedroomsCount: 1,
        floor: '1 piętro',
        bathroomsCount: 1,
        furnished: 'Tak',
        location: {
            city: 'Warszawa',
            district: 'Śródmieście',
            fullAddress: 'Sezamkowa 43/2',
            coordinates: { lat: 52.2297, lng: 21.0122 },
        },
        googleMapsLink: 'https://maps.google.com/?q=52.2297,21.0122',
        amenities: ['amenity1', 'amenity2'],
        rating: 4.3,
    },
    {
        id: 'apt2',
        images: ['https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
        type: 'Pokój',
        area: 20.0,
        roomsCount: 1,
        bedroomsCount: 1,
        floor: 'Parter',
        bathroomsCount: 1,
        furnished: 'Częściowo',
        location: {
            city: 'Kraków',
            district: 'Stare Miasto',
            fullAddress: 'Kwiatowa 5/1',
            coordinates: { lat: 50.0647, lng: 19.9450 },
        },
        googleMapsLink: 'https://maps.google.com/?q=50.0647,19.9450',
        amenities: ['amenity1'],
        rating: 0, 
    },

    {
        id: 'apt3',
        images: ['https://images.pexels.com/photos/813692/pexels-photo-813692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
        type: 'Mieszkanie',
        area: 75.0,
        roomsCount: 3,
        bedroomsCount: 2,
        floor: '2 piętro',
        bathroomsCount: 2,
        furnished: 'Częściowo',
        location: {
            city: 'Gdańsk',
            district: 'Wrzeszcz',
            fullAddress: 'Grunwaldzka 150/5',
            coordinates: { lat: 54.3790, lng: 18.6045 },
        },
        googleMapsLink: 'https://maps.google.com/?q=54.3790,18.6045',
        amenities: ['amenity2', 'amenity3'],
        rating: 4.0, 
    },
    {
        id: 'apt4',
        images: ['https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
        type: 'Mieszkanie',
        area: 40.0,
        roomsCount: 2,
        bedroomsCount: 1,
        floor: 'Parter',
        bathroomsCount: 1,
        furnished: 'Tak',
        location: {
            city: 'Wrocław',
            district: 'Stare Miasto',
            fullAddress: 'Rynek 12/3',
            coordinates: { lat: 51.1080, lng: 17.0325 },
        },
        googleMapsLink: 'https://maps.google.com/?q=51.1080,17.0325',
        amenities: ['amenity1'],
        rating: 3.0,
    },
    {
        id: 'apt5',
        images: ['https://images.pexels.com/photos/275484/pexels-photo-275484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
        type: 'Dom',
        area: 120.0,
        roomsCount: 4,
        bedroomsCount: 3,
        floor: '1 piętro',
        bathroomsCount: 2,
        furnished: 'Częściowo',
        location: {
            city: 'Poznań',
            district: 'Wilda',
            fullAddress: 'Kilińskiego 45',
            coordinates: { lat: 52.4020, lng: 16.9280 },
        },
        googleMapsLink: 'https://maps.google.com/?q=52.4020,16.9280',
        amenities: ['amenity1', 'amenity2'],
        rating: 2.0
    },
];
