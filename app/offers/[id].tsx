/**
 * OfferDetails screen component.
 *
 * Retrieves the `id` parameter from the route parameters and renders
 * the `SingleOfferScreen` component for displaying the details of a single offer.
 *
 * @component
 */
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
