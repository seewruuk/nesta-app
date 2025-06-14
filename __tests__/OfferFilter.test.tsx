// __tests__/OfferFilter.test.tsx

import type { Filters } from '../src/components/FilterPanel';
import type { Apartment } from '../src/data/apartments';
import { apartments } from '../src/data/apartments';
import type { Offer } from '../src/data/offers';
import { offers } from '../src/data/offers';

describe('Logika filtrowania ofert (inline)', () => {
  // Domyślne, „puste” filtry
  const baseFilters: Filters = {
    city: '',
    priceMin: '',
    priceMax: '',
    roomsMin: '',
    roomsMax: '',
    bedroomsMin: '',
    bedroomsMax: '',
    furnished: '',
    petsAllowed: '',
    shortTermAllowed: '',
  };

  /**
   * Funkcja inline powtarzająca kod z OffersScreen.useMemo
   */
  function applyFilters(
    offersArr: Offer[],
    aptsArr: Apartment[],
    filters: Filters
  ): Offer[] {
    return offersArr.filter(o => {
      const apt = aptsArr.find(a => a.id === o.apartmentId);
      if (!apt) return false;

      // miasto
      if (
        filters.city &&
        !apt.location.city.toLowerCase().includes(filters.city.toLowerCase())
      ) {
        return false;
      }

      // ceny
      if (filters.priceMin && o.rentPrice < +filters.priceMin) return false;
      if (filters.priceMax && o.rentPrice > +filters.priceMax) return false;

      // pokoje
      if (filters.roomsMin && apt.roomsCount < +filters.roomsMin) return false;
      if (filters.roomsMax && apt.roomsCount > +filters.roomsMax) return false;

      // sypialnie
      if (filters.bedroomsMin && apt.bedroomsCount < +filters.bedroomsMin)
        return false;
      if (filters.bedroomsMax && apt.bedroomsCount > +filters.bedroomsMax)
        return false;

      // umeblowanie
      if (filters.furnished && apt.furnished !== filters.furnished)
        return false;

      // zwierzęta
      if (filters.petsAllowed && o.petsAllowed !== filters.petsAllowed)
        return false;

      // krótki najem
      if (filters.shortTermAllowed) {
        const wantShort = filters.shortTermAllowed === 'Tak';
        if (o.shortTermAllowed !== wantShort) return false;
      }

      return true;
    });
  }

  it('zwraca wszystkie oferty, gdy filtry puste', () => {
    const result = applyFilters(offers, apartments, baseFilters);
    expect(result).toHaveLength(offers.length);
    expect(result).toEqual(expect.arrayContaining(offers));
  });

  it('filtruje po mieście (np. "warszawa")', () => {
    const filters: Filters = { ...baseFilters, city: 'warszawa' };
    const result = applyFilters(offers, apartments, filters);
    expect(result.length).toBeGreaterThan(0);
    result.forEach(o => {
      const apt = apartments.find(a => a.id === o.apartmentId)!;
      expect(apt.location.city.toLowerCase()).toContain('warszawa');
    });
  });

  it('filtruje po przedziale cen min/max', () => {
    // min
    let filters: Filters = { ...baseFilters, priceMin: '3000' };
    let result = applyFilters(offers, apartments, filters);
    result.forEach(o => expect(o.rentPrice).toBeGreaterThanOrEqual(3000));

    // max
    filters = { ...baseFilters, priceMax: '2500' };
    result = applyFilters(offers, apartments, filters);
    result.forEach(o => expect(o.rentPrice).toBeLessThanOrEqual(2500));
  });

  it('filtruje po umeblowaniu = "Tak"', () => {
    const filters: Filters = { ...baseFilters, furnished: 'Tak' };
    const result = applyFilters(offers, apartments, filters);
    result.forEach(o => {
      const apt = apartments.find(a => a.id === o.apartmentId)!;
      expect(apt.furnished).toBe('Tak');
    });
  });

  it('filtruje po zwierzętach = "Nie"', () => {
    const filters: Filters = { ...baseFilters, petsAllowed: 'Nie' };
    const result = applyFilters(offers, apartments, filters);
    result.forEach(o => expect(o.petsAllowed).toBe('Nie'));
  });

  it('filtruje po krótkoterminowym najmie = "Tak"', () => {
    const filters: Filters = { ...baseFilters, shortTermAllowed: 'Tak' };
    const result = applyFilters(offers, apartments, filters);
    result.forEach(o => expect(o.shortTermAllowed).toBe(true));
  });

  it('łączy wiele filtrów razem', () => {
    const filters: Filters = {
      city: 'kraków',
      priceMin: '3000',
      priceMax: '4500',
      roomsMin: '3',
      roomsMax: '3',
      bedroomsMin: '2',
      bedroomsMax: '2',
      furnished: 'Nie',
      petsAllowed: 'Nie',
      shortTermAllowed: 'Nie',
    };
    const result = applyFilters(offers, apartments, filters);
    expect(result).toHaveLength(1);
    const o = result[0];
    const apt = apartments.find(a => a.id === o.apartmentId)!;
    expect(apt.location.city.toLowerCase()).toContain('kraków');
    expect(o.rentPrice).toBeGreaterThanOrEqual(3000);
    expect(o.rentPrice).toBeLessThanOrEqual(4500);
    expect(apt.roomsCount).toBe(3);
    expect(apt.bedroomsCount).toBe(2);
    expect(apt.furnished).toBe('Nie');
    expect(o.petsAllowed).toBe('Nie');
    expect(o.shortTermAllowed).toBe(false);
  });
});
