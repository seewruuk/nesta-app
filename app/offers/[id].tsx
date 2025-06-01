import React from 'react'
import {useLocalSearchParams} from "expo-router";
import SingleOfferScreen from "@/src/components/SingleOfferScreen";

const OfferDetails = () => {

    const { id } = useLocalSearchParams();

    return (
        <SingleOfferScreen id={id} />
     )
}

export default OfferDetails
