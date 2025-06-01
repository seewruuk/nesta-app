import {Text} from "react-native";

interface ParagraphProps {
    text: string,
    className?: string

}

export default function Paragraph({text, className}: ParagraphProps) {

    const defaultClassName = "text-[15px] leading-7 text-[#1C2635]";

    return <Text className={`${defaultClassName} ${className || ''}`}>{text}</Text>
}