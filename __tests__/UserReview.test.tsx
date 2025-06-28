// __tests__/stateContextReview.test.ts

import { reducer } from '../src/contexts/StateContext';
import type { State, Action } from '../src/contexts/StateContext';
import type { Review } from '../src/data/reviews';
import type { User }   from '../src/data/users';
import type { Apartment } from '../src/data/apartments';

describe('Reducer – ADD_REVIEW', () => {
  const baseState: Omit<State, 'reviews' | 'users' | 'apartments'> & {
    reviews: Review[];
    users: User[];
    apartments: Apartment[];
  } = {
    amenities: [],
    offers: [],
    posts: [],
    currentUserId: null,

    reviews: [],

    users: [
      {
        id: 'user1',
        fullName: 'Test User',
        slug: 'test-user',
        email: '',
        username: '',
        password: '',
        bio: '',
        rating: 0,
        coverImage: '',
        avatar: '',
        role: 'Użytkownik',
      },
    ],

    apartments: [],
  };

  it('should add a review and set the user rating to the review score', () => {
    const action: Action = {
      type: 'ADD_REVIEW',
      payload: {
        id: 'rev1',
        authorId: 'user2',
        targetType: 'user',
        targetId: 'user1',
        text: 'Świetny user!',
        rating: 5,
        date:  '2025-06-01T12:00:00Z',
      },
    };

    const nextState = reducer(baseState as State, action);

    expect(nextState.reviews).toHaveLength(1);
    expect(nextState.reviews[0]).toEqual(action.payload);

    const user = nextState.users.find(u => u.id === 'user1')!;
    expect(user.rating).toBe(5);
  });

  it('should update the user’s average rating after adding a second review', () => {
    const preloadedState: State = {
      ...baseState as State,
      reviews: [
        {
          id: 'rev1',
          authorId: 'user2',
          targetType: 'user',
          targetId: 'user1',
          text: 'Super!',
          rating: 5,
          date:  '2025-06-01T12:00:00Z',
        },
      ],
      users: [
        { ...baseState.users[0], rating: 5 },
      ],
    };

    const action2: Action = {
      type: 'ADD_REVIEW',
      payload: {
        id: 'rev2',
        authorId: 'user3',
        targetType: 'user',
        targetId: 'user1',
        text: 'Ok, ale mogłoby być lepiej.',
        rating: 3,
        date:  '2025-06-02T15:00:00Z',
      },
    };

    const nextState = reducer(preloadedState, action2);

    expect(nextState.reviews).toHaveLength(2);

    const user = nextState.users.find(u => u.id === 'user1')!;
    expect(user.rating).toBe(4);  // (5 + 3) / 2
  });
});
