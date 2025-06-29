/**
 * Layout component.
 *
 * A simple wrapper that provides consistent padding and top spacing for screen content.
 * Useful for quickly testing or applying uniform layout styling in screens or views.
 *
 * Props:
 * - children (React.ReactNode): The nested components or elements to render inside the layout.
 *
 * Note:
 * Currently used only once in testing. Can be extended or removed based on future layout needs.
 *
 * @component
 */
import { View } from "react-native";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <View className="flex-1 pt-[80px] px-6">
            {children}
        </View>
    )
}