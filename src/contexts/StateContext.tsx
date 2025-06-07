import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { amenities, Amenity } from '../data/amenities';
import { apartments, Apartment } from '../data/apartments';
import { offers, Offer } from '../data/offers';

export interface State {
    amenities: Amenity[];
    apartments: Apartment[];
    offers: Offer[];
}

const initialState: State = { amenities, apartments, offers };

type Action =
    | { type: 'ADD_APARTMENT'; payload: Apartment }
    | { type: 'UPDATE_APARTMENT'; payload: Apartment }
    | { type: 'DELETE_APARTMENT'; payload: { id: string } }
    | { type: 'ADD_OFFER'; payload: Offer }
    | { type: 'UPDATE_OFFER'; payload: Offer }
    | { type: 'DELETE_OFFER'; payload: { id: string } }
    | { type: 'ADD_AMENITY'; payload: Amenity };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'ADD_APARTMENT':
            return { ...state, apartments: [...state.apartments, action.payload] };
        case 'UPDATE_APARTMENT':
            return {
                ...state,
                apartments: state.apartments.map(a => a.id === action.payload.id ? action.payload : a),
            };
        case 'DELETE_APARTMENT':
            return {
                ...state,
                apartments: state.apartments.filter(a => a.id !== action.payload.id),
                offers: state.offers.filter(o => o.apartmentId !== action.payload.id),
            };
        case 'ADD_OFFER':
            return { ...state, offers: [...state.offers, action.payload] };
        case 'UPDATE_OFFER':
            return {
                ...state,
                offers: state.offers.map(o => o.id === action.payload.id ? action.payload : o),
            };
        case 'DELETE_OFFER':
            return { ...state, offers: state.offers.filter(o => o.id !== action.payload.id) };
        case 'ADD_AMENITY':
            return { ...state, amenities: [...state.amenities, action.payload] };
        default:
            return state;
    }
}

interface ContextProps {
    state: State;
    addApartment: (apt: Apartment) => void;
    updateApartment: (apt: Apartment) => void;
    deleteApartment: (id: string) => void;
    addOffer: (offer: Offer) => void;
    updateOffer: (offer: Offer) => void;
    deleteOffer: (id: string) => void;
}

const StateContext = createContext<ContextProps | undefined>(undefined);

export const StateProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addApartment = (payload: Apartment) => dispatch({ type: 'ADD_APARTMENT', payload });
    const updateApartment = (payload: Apartment) => dispatch({ type: 'UPDATE_APARTMENT', payload });
    const deleteApartment = (id: string) => dispatch({ type: 'DELETE_APARTMENT', payload: { id } });

    const addOffer = (payload: Offer) => dispatch({ type: 'ADD_OFFER', payload });
    const updateOffer = (payload: Offer) => dispatch({ type: 'UPDATE_OFFER', payload });
    const deleteOffer = (id: string) => dispatch({ type: 'DELETE_OFFER', payload: { id } });

    return (
        <StateContext.Provider value={{ state, addApartment, updateApartment, deleteApartment, addOffer, updateOffer, deleteOffer }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = (): ContextProps => {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error('useStateContext must be used within a StateProvider');
    }
    return context;
};
