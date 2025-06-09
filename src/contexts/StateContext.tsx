import React, {createContext, useReducer, useContext, ReactNode} from 'react';
import {amenities, Amenity} from '../data/amenities';
import {apartments, Apartment} from '../data/apartments';
import {offers, Offer} from '../data/offers';
import {users, User} from '../data/users'
import { posts, Post } from '../data/posts';

export interface State {
    amenities: Amenity[];
    apartments: Apartment[];
    offers: Offer[];
    users: User[];
    posts: Post[];
    currentUserId: string | null;
}

const initialState: State = {amenities, apartments, offers, users, posts, currentUserId: null};

type Action =
    | { type: 'ADD_APARTMENT'; payload: Apartment }
    | { type: 'UPDATE_APARTMENT'; payload: Apartment }
    | { type: 'DELETE_APARTMENT'; payload: { id: string } }
    | { type: 'ADD_OFFER'; payload: Offer }
    | { type: 'UPDATE_OFFER'; payload: Offer }
    | { type: 'DELETE_OFFER'; payload: { id: string } }
    | { type: 'ADD_USER'; payload: User }
    | { type: 'UPDATE_USER'; payload: User }
    | { type: 'DELETE_USER'; payload: { id: string } }
    | { type: 'ADD_POST'; payload: Post }
    | { type: 'UPDATE_POST'; payload: Post }
    | { type: 'DELETE_POST'; payload: { id: string } }
    | { type: 'LOGIN'; payload: { id: string } }
    | { type: 'LOGOUT' }
    | { type: 'ADD_AMENITY'; payload: Amenity };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'ADD_APARTMENT':
            return {...state, apartments: [...state.apartments, action.payload]};
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
            return {...state, offers: [...state.offers, action.payload]};
        case 'UPDATE_OFFER':
            return {
                ...state,
                offers: state.offers.map(o => o.id === action.payload.id ? action.payload : o),
            };
        case 'DELETE_OFFER':
            return {...state, offers: state.offers.filter(o => o.id !== action.payload.id)};
        case 'ADD_AMENITY':
            return {...state, amenities: [...state.amenities, action.payload]};
        case 'ADD_USER':
            return {...state, users: [...state.users, action.payload]};
        case 'UPDATE_USER':
            return {
                ...state,
                users: state.users.map(u => u.id === action.payload.id ? action.payload : u),
            };
        case 'DELETE_USER':
            return {...state, users: state.users.filter(u => u.id !== action.payload.id)};

        case 'ADD_POST':
            return { ...state, posts: [...state.posts, action.payload] };
        case 'UPDATE_POST':
            return {
                ...state,
                posts: state.posts.map(p => p.id === action.payload.id ? action.payload : p),
            };
        case 'DELETE_POST':
            return { ...state, posts: state.posts.filter(p => p.id !== action.payload.id) };
        case 'LOGIN':
            return { ...state, currentUserId: action.payload.id };
        case 'LOGOUT':
            return { ...state, currentUserId: null };
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

    addAmenity: (amenity: Amenity) => void;

    addUser: (user: User) => void;
    updateUser: (user: User) => void;
    deleteUser: (id: string) => void;

    addPost: (post: Post) => void;
    updatePost: (post: Post) => void;
    deletePost: (id: string) => void;

    login: (email: string, password: string) => { success: boolean; error?: string };
    logout: () => void;
    register: (
        email: string,
        username: string,
        password: string,
        confirmPassword: string
    ) => { success: boolean; error?: string };
}

const StateContext = createContext<ContextProps | undefined>(undefined);

export const StateProvider = ({children}: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addApartment = (payload: Apartment) => dispatch({type: 'ADD_APARTMENT', payload});
    const updateApartment = (payload: Apartment) => dispatch({type: 'UPDATE_APARTMENT', payload});
    const deleteApartment = (id: string) => dispatch({type: 'DELETE_APARTMENT', payload: {id}});

    const addOffer = (payload: Offer) => dispatch({type: 'ADD_OFFER', payload});
    const updateOffer = (payload: Offer) => dispatch({type: 'UPDATE_OFFER', payload});
    const deleteOffer = (id: string) => dispatch({type: 'DELETE_OFFER', payload: {id}});


    const addUser    = (payload: User) => dispatch({ type: 'ADD_USER', payload });
    const updateUser = (payload: User) => dispatch({ type: 'UPDATE_USER', payload });
    const deleteUser = (id: string)      => dispatch({ type: 'DELETE_USER', payload: { id } });

    const addAmenity = (payload: Amenity) => dispatch({type: 'ADD_AMENITY', payload});

    const addPost = (payload: Post) => dispatch({ type: 'ADD_POST', payload });
    const updatePost = (payload: Post) => dispatch({ type: 'UPDATE_POST', payload });
    const deletePost = (id: string) => dispatch({ type: 'DELETE_POST', payload: { id } });


    const login = (email: string, password: string) => {
        const user = state.users.find(u => u.email === email.trim());
        if (!user || user.password !== password) {
            return { success: false, error: 'Nieprawidłowy email lub hasło' };
        }
        dispatch({ type: 'LOGIN', payload: { id: user.id } });
        return { success: true };
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    const register = (
        email: string,
        username: string,
        password: string,
        confirmPassword: string
    ) => {
        if (!email.includes('@')) {
            return { success: false, error: 'Nieprawidłowy format email' };
        }
        if (password !== confirmPassword) {
            return { success: false, error: 'Hasła nie są takie same' };
        }
        if (state.users.some(u => u.email === email.trim())) {
            return { success: false, error: 'Email już istnieje' };
        }
        if (state.users.some(u => u.username === username.trim())) {
            return { success: false, error: 'Nazwa użytkownika już istnieje' };
        }
        const newUser: User = {
            id: `user${Date.now()}`,
            fullName: username.trim(),
            slug: username.trim(),
            email: email.trim(),
            username: username.trim(),
            password,
            bio: '',
            rating: 0,
            reviews: [],
            coverImage: '',
            avatar: '',
            role: 'Użytkownik',
        };
        dispatch({ type: 'ADD_USER', payload: newUser });
        dispatch({ type: 'LOGIN', payload: { id: newUser.id } });
        return { success: true };
    };


    return (
        <StateContext.Provider value={{
            state, addApartment, updateApartment, deleteApartment,
            addOffer, updateOffer, deleteOffer,
            addUser, updateUser, deleteUser , addAmenity,
            addPost, updatePost, deletePost,
            login, logout, register
        }}>
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
