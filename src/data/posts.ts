export interface Post {
    id: string;
    location: string;      
    title: string;        
    description: string;    
    isOfferLinked: boolean;  
    offerId?: string;        
    authorId: string;       
}

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