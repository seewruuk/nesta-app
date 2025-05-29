export interface Message {
    /** Unikalny identyfikator wiadomości */
    id: string
    /** Nadawca wiadomości */
    sender: string
    /** Data/godzina wysłania w formacie ISO */
    date: string
    /** Treść wiadomości */
    content: string
}