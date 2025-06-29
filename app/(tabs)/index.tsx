/**
 * WelcomeScreen component.
 *
 * This is a route-level component that renders the WelcomeModal.
 * It serves as the initial screen shown to users, typically used for onboarding or welcome messages.
 *
 * @component
 */
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
