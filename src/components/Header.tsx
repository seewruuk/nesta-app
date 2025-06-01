import { Text } from 'react-native'
import React from 'react'


interface HeaderProps {
    text: string,
    className?: string
}

export default function Header({ text, className }: HeaderProps) {

    const defaultClassName = "text-[28px] font-semibold text-black leading-snug";

    return <Text className={`${defaultClassName} ${className || ''}`}>{text}</Text>
}
