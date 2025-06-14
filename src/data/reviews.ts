// src/data/reviews.ts

// Pojedyncza recenzja — może dotyczyć użytkownika lub apartamentu
export interface Review {
  id: string;
  authorId: string;    // kto dodał recenzję
  targetType: 'user' | 'apartment';
  targetId: string;    // ID usera lub apartmentu
  text: string;
  rating: number;      // 1–5
  date: string;        // ISO string
}

// Przykładowe recenzje
export const reviews: Review[] = [
  {
    id: 'rev1',
    authorId: 'user2',        // Anna Nowak
    targetType: 'user',
    targetId: 'user1',        // Jan Kowalski
    text: 'Świetny właściciel, mieszkanie super.',
    rating: 5,
    date: '2025-03-01T12:00:00Z',
  },
  {
    id: 'rev2',
    authorId: 'user3',
    targetType: 'apartment',
    targetId: 'apt1',         // mieszkanie Jana
    text: 'Bardzo wygodne, polecam!',
    rating: 4,
    date: '2025-03-02T15:30:00Z',
  },
];
