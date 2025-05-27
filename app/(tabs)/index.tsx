import React from 'react'
import { View, ScrollView, Image, Dimensions, ImageSourcePropType} from 'react-native'
import {WelcomeModal} from '@/src/components/WelcomeModal'
import {images} from '@/src/constants/images'

const {width, height} = Dimensions.get('window')

export default function WelcomeScreen() {
    return (
        <WelcomeModal />
    )
}
