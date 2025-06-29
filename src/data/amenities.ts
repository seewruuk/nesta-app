/**
 * Amenities data module.
 *
 * Provides a list of predefined amenities that can be assigned to apartments.
 * Each amenity has a unique ID and a name, and can be used for filtering or displaying features of an apartment.
 *
 * Types:
 * - Amenity: Interface representing a single amenity item.
 *
 * Exports:
 * - amenities: Array of Amenity objects used throughout the app.
 *
 * @module
 */


/**
 * Represents an available amenity that can be assigned to an apartment.
 *
 * @property id - Unique identifier for the amenity.
 * @property name - Display name of the amenity (e.g., 'Wi-Fi', 'Parking', 'Washer').
 */
export interface Amenity {
    id: string;
    name: string;
}



export const amenities: Amenity[] = [
    { id: 'amenity1', name: 'WiFi' },
    { id: 'amenity2', name: 'Parking' },
    { id: 'amenity3', name: 'Winda' },
];
