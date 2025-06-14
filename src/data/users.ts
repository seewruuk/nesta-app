// src/data/users.ts

export interface Review {
  id: string;
  author: string;
  text: string;
  rating: number;
}

export type Role = 'Użytkownik' | 'Najemca' | 'Wynajmujący' | 'Administrator';

export interface User {
  id: string;
  fullName: string;  // imię i nazwisko
  slug: string;      // unikalny fragment URL
  email: string;
  username: string;
  password: string;
  bio: string;       // krótki opis
  rating: number;    // średnia ocen (obliczana z globalnej tablicy reviews)
  coverImage: string;  // URL do zdjęcia w tle
  avatar: string;      // URL do zdjęcia profilowego
  role: Role;
}

export const users: User[] = [
  {
    id: 'user1',
    fullName: 'Jan Kowalski',
    slug: 'jan-kowalski',
    email: 'jan@example.com',
    username: 'admin',
    password: 'admin',
    bio: 'Polecam swoje mieszkania, są spoko',
    rating: 4.5,
    coverImage: '',
    avatar: '',
    role: 'Wynajmujący'
  },
  {
    id: 'user2',
    fullName: 'Anna Nowak',
    slug: 'anna-nowak',
    email: 'anna@example.com',
    username: 'anna.n',
    password: 'secret321',
    bio: 'Zawsze punktualna płatniczka',
    rating: 0,
    coverImage: '',
    avatar: '',
    role: 'Najemca'
  },
  {
    id: 'user3',
    fullName: 'Piotr Zieliński',
    slug: 'piotr-zielinski',
    email: 'piotr@example.com',
    username: 'piotr.z',
    password: 'hunter2',
    bio: 'Lubię krótko- i długoterminowe wynajmy',
    rating: 5,
    coverImage: '',
    avatar: '',
    role: 'Najemca'
  }
];
