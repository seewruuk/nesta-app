// app /(offers)/[id].tsx
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {useLocalSearchParams} from "expo-router";

const OfferDetails = () => {

    const { id } = useLocalSearchParams();


    return (
        <View>
            <Text>OfferDetails for {id}</Text>
        </View>
    )
}

export default OfferDetails
