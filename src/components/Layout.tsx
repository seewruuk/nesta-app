import { View } from "react-native";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <View className="flex-1 pt-[80px] px-6">

            {children}

        </View>
    )
}