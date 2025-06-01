export interface Apartment {
  id : string
  title: string
  description: string
  price: number
  city: string
  area: number
  furnished: boolean
  type: 'mieszkanie' | 'dom' | 'studio'
  images: any[]
  rating: number
}
