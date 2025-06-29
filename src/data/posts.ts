/**
 * Posts data module.
 *
 * Provides a list of user-generated posts displayed on the public side of the app.
 * Each post contains location, title, description, and optionally a link to a rental offer.
 * Typically used to display announcements, inquiries, or offers in the community section.
 *
 * Types:
 * - Post: Interface defining the structure of a post.
 *
 * Exports:
 * - posts: Array of Post objects available for listing and filtering.
 *
 * @module
 */



/**
 * Represents a public post created by a user.
 *
 * @property id - Unique identifier of the post.
 * @property location - The city or district where the post is relevant.
 * @property title - The headline of the post.
 * @property description - Full content or message of the post.
 * @property isLinkedOffer - Indicates whether the post is associated with an offer.
 * @property offerId - ID of the linked offer, if applicable.
 * @property authorId - ID of the user who created the post.
 */

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