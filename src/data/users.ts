/**
 * Users data module.
 *
 * Contains a predefined list of users for the application, used for state initialization or testing.
 * Each user object includes personal data and role information (e.g., tenant or landlord).
 *
 * Types:
 * - User: Interface describing the structure of a user object.
 *
 * Exports:
 * - users: An array of User objects representing sample user accounts.
 *
 * @module
 */

export interface Review {
  id: string;
  author: string;
  text: string;
  rating: number;
}

export type Role = 'Użytkownik' | 'Najemca' | 'Wynajmujący' | 'Administrator';




export interface User {
  id: string;
  fullName: string;  
  slug: string;      
  email: string;
  username: string;
  password: string;
  bio: string;       
  rating: number;    
  coverImage: string; 
  avatar: string;     
  role: Role;
}

export const users: User[] = [
  {
    id: 'user1',
    fullName: 'Jan Kowalski',
    slug: 'jan-kowalski',
    email: 'admin',
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
