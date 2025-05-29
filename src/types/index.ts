// declare module "*.png" {
//   const content: any;
//   export default content;
// }


export interface Apartment {
  id : string
  title: string

  description: string
  pricePerNight: number
  city: string
  area: number
  furnished: boolean
  type: 'mieszkanie' | 'dom' | 'studio'
  images: any[]
  rating: number
}
