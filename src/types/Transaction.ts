export interface Transaction {
    /** Unikalny identyfikator transakcji */
    id: string
    /** Opis transakcji */
    description: string
    /** Data transakcji w formacie ISO (np. "2025-05-29T14:30:00Z") */
    date: string
    /** Kwota transakcji */
    amount: number
    /** Waluta (np. "PLN", "USD") */
    currency: string
    /** Status transakcji */
    status: 'Zaksięgowano' | 'Oczekuje na płatność' | 'W trakcie' | string
}