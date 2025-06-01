// app / _layout.tsx
import "./globals.css"
import {Stack} from "expo-router";
import {ApartmentsProvider} from "@/src/contexts/ApartmentsContext";

export default function RootLayout() {
    // @ts-ignore
    return (
        <ApartmentsProvider>
            <Stack>
                <Stack.Screen
                    name={"(tabs)"}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name={"offers/[id]"}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name={"login"}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name={"register"}
                    options={{headerShown: false}}
                />

            </Stack>
        </ApartmentsProvider>
    )
}
