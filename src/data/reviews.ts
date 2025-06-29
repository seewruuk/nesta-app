
/**
 * Reviews data module.
 *
 * Contains a static list of user-generated reviews for apartments or landlords.
 * Each review includes the author's details, target (user/apartment), comment content, and rating.
 * Used to populate review sections and support feedback features in the application.
 *
 * Types:
 * - Review: Interface describing a single review entry.
 *
 * Exports:
 * - reviews: Array of Review objects used throughout the app.
 *
 * @module
 */
export interface Review {
  id: string;
  authorId: string;   
  targetType: 'user' | 'apartment';
  targetId: string;   
  text: string;
  rating: number;    
  date: string;       
}

export const reviews: Review[] = [
  {
    id: 'rev1',
    authorId: 'user2',        
    targetType: 'user',
    targetId: 'user1',        
    text: 'Świetny właściciel, mieszkanie super.',
    rating: 5,
    date: '2025-03-01T12:00:00Z',
  },
  {
    id: 'rev2',
    authorId: 'user3',
    targetType: 'apartment',
    targetId: 'apt1',         
    text: 'Bardzo wygodne, polecam!',
    rating: 4,
    date: '2025-03-02T15:30:00Z',
  },
];
