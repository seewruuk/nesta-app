// import React, { createContext, useContext, useState } from 'react'
// import { apartments } from "../data/apartments"
// // import {Apartment} from "@/src/types";
//
// const ApartmentsContext = createContext<{
//     list: Apartment[]
// }>({ list: [] })
//
// // @ts-ignore
// export const ApartmentsProvider: React.FC = ({ children }) => {
//     const [list] = useState<Apartment[]>(apartments)
//     return (
//         <ApartmentsContext.Provider value={{ list }}>
//     {children}
//     </ApartmentsContext.Provider>
// )
// }
//
// export const useApartments = () => useContext(ApartmentsContext)
