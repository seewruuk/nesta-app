// src/data/posts.ts

// Typ ogłoszenia o poszukiwaniu współlokatora
export interface Post {
    id: string;
    location: string;        // np. "Warszawa", "Gdynia"
    title: string;           // nagłówek
    description: string;     // dłuższy opis ogłoszenia
    isOfferLinked: boolean;  // czy post jest powiązany z ofertą
    offerId?: string;        // id oferty (jeśli isOfferLinked = true)
    authorId: string;        // id użytkownika, który wystawia wpis
}

// Przykładowe dane postów
export const posts: Post[] = [
    {
        id: 'post1',
        location: 'Warszawa',
        title: 'Szukam współlokatorki blisko centrum',
        description: 'Cześć! Szukam współlokatorki do 3-pokojowego mieszkania w Śródmieściu. Pokój wolny od 1 sierpnia. Miłośniczki kotów mile widziane.',
        isOfferLinked: false,
        authorId: 'user2'
    },
    {
        id: 'post2',
        location: 'Gdańsk',
        title: 'Pokój we Wrzeszczu, oferta od lipca',
        description: 'Do wynajęcia pokój w mieszkaniu 3-pokojowym. Mieszkanie umeblowane, szybki internet. Oferta połączona z ofertą, sprawdź szczegóły.',
        isOfferLinked: true,
        offerId: 'offer3',
        authorId: 'user1'
    },
    {
        id: 'post3',
        location: 'Wrocław',
        title: 'Szukam chłopaka do wspólnego mieszkania',
        description: 'Studentka medycyny szuka współlokatora. Dobre połączenie komunikacyjne, w pobliżu Uniwersytetu.',
        isOfferLinked: false,
        authorId: 'user3'
    }
];