// src/data/amenities.ts

export interface Amenity {
    id: string;
    name: string;
}

export const amenities: Amenity[] = [
    { id: 'amenity1', name: 'WiFi' },
    { id: 'amenity2', name: 'Parking' },
    { id: 'amenity3', name: 'Winda' },
];
