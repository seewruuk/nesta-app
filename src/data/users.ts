// src/data/users.ts

// Typ opinii o użytkowniku
export interface Review {
    id: string;
    author: string;    // imię/nick osoby wystawiającej opinię
    text: string;      // treść opinii
    rating: number;    // ocena od 1 do 5
}

// Rola użytkownika w aplikacji
export type Role = 'Najemca' | 'Wynajmujący' | 'Administrator';

// Typ użytkownika
export interface User {
    id: string;
    fullName: string;  // imię i nazwisko
    slug: string;      // unikalny fragment URL np. "jan-kowalski"
    bio: string;       // krótki opis
    rating: number;    // średnia ocen z tablicy reviews
    reviews: Review[]; // tablica opinii
    coverImage: string;  // URL do zdjęcia w tle (może być pusty)
    avatar: string;      // URL do zdjęcia profilowego (może być pusty)
    role: Role;        // rola użytkownika
}

// Przykładowe dane użytkowników
export const users: User[] = [
    {
        id: 'user1',
        fullName: 'Jan Kowalski',
        slug: 'jan-kowalski',
        bio: 'Polecam swoje mieszkania, są spoko',
        rating: 4.5,
        reviews: [
            { id: 'r1', author: 'Anna Nowak', text: 'Super apartament, polecam!', rating: 5 },
            { id: 'r2', author: 'Piotr Zieliński', text: 'Dobre warunki, ale trochę drogo.', rating: 4 }
        ],
        coverImage: '',
        avatar: '',
        role: 'Wynajmujący'
    },
    {
        id: 'user2',
        fullName: 'Anna Nowak',
        slug: 'anna-nowak',
        bio: 'Zawsze punktualna płatniczka',
        rating: 0,
        reviews: [],
        coverImage: '',
        avatar: '',
        role: 'Najemca'
    },
    {
        id: 'user3',
        fullName: 'Piotr Zieliński',
        slug: 'piotr-zielinski',
        bio: 'Lubię krótko- i długoterminowe wynajmy',
        rating: 5,
        reviews: [
            { id: 'r3', author: 'Jan Kowalski', text: 'Świetny najemca, zero problemów.', rating: 5 }
        ],
        coverImage: '',
        avatar: '',
        role: 'Najemca'
    }
];
