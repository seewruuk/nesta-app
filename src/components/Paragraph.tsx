
/**
 * Paragraph component for rendering styled text.
 *
 * Renders a <Text> element with default typography styles,
 * which can be extended via the optional `className` prop.
 *
 * @param text - The text content to display.
 * @param className - Optional additional Tailwind class names for customization.
 */
import {Text} from "react-native";

interface ParagraphProps {
    text: string,
    className?: string

}

export default function Paragraph({text, className}: ParagraphProps) {

    const defaultClassName = "text-[15px] leading-7 text-[#1C2635]";

    return <Text className={`${defaultClassName} ${className || ''}`}>{text}</Text>
}