/**
 * Header component.
 *
 * A reusable text component that displays a bold, black header with customizable styling.
 * Designed to maintain consistent heading appearance throughout the app, with optional class overrides.
 *
 * Props:
 * - text (string): The text content of the header.
 * - className (string, optional): Additional Tailwind-style classes to override or extend default styles.
 *
 * @component
 */
import { Text } from 'react-native'
import React from 'react'


interface HeaderProps {
    text: string,
    className?: string
}

export default function Header({ text, className }: HeaderProps) {

    const defaultClassName = "text-[20px] font-bold text-black leading-snug";

    return <Text className={`${defaultClassName} ${className || ''}`}>{text}</Text>
}
