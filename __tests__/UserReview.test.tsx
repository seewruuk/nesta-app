// __tests__/stateContextReview.test.ts

import { reducer } from '../src/contexts/StateContext';
import type { State } from '../src/contexts/StateContext';
import type { Review } from '../src/data/reviews';
import type { User } from '../src/data/users';
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

    // początkowo żadnych recenzji
    reviews: [],

    // pojedynczy użytkownik do testu
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

    // pusty zbiór mieszkań – nie będziemy tu testować apartamentów
    apartments: [],
  };

  it('powinien dodać recenzję i ustawić rating użytkownika na wartość recenzji', () => {
    const action = {
      type: 'ADD_REVIEW' as const,
      payload: {
        id: 'rev1',
        authorId: 'user2',
        targetType: 'user',
        targetId: 'user1',
        text: 'Świetny user!',
        rating: 5,
        date: '2025-06-01T12:00:00Z',
      },
    };

    const nextState = reducer(baseState as State, action);
    // recenzja dodana
    expect(nextState.reviews).toHaveLength(1);
    expect(nextState.reviews[0]).toEqual(action.payload);

    // rating usera przeliczony na średnią = 5
    const user = nextState.users.find(u => u.id === 'user1')!;
    expect(user.rating).toBe(5);
  });

  it('powinien zaktualizować średnią rating użytkownika po dodaniu drugiej recenzji', () => {
    // wstępny stan: jedna recenzja o wartości 5
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
          date: '2025-06-01T12:00:00Z',
        },
      ],
      users: [
        { ...baseState.users[0], rating: 5 },
      ],
    };

    const action2 = {
      type: 'ADD_REVIEW' as const,
      payload: {
        id: 'rev2',
        authorId: 'user3',
        targetType: 'user',
        targetId: 'user1',
        text: 'Ok, ale mogłoby być lepiej.',
        rating: 3,
        date: '2025-06-02T15:00:00Z',
      },
    };

    const nextState = reducer(preloadedState, action2);
    // teraz powinny być dwie recenzje
    expect(nextState.reviews).toHaveLength(2);

    // średnia rating = (5 + 3) / 2 = 4
    const user = nextState.users.find(u => u.id === 'user1')!;
    expect(user.rating).toBe(4);
  });
});
