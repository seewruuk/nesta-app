// app / _layout.tsx
import "./globals.css"
import {Stack} from "expo-router";
import {StateProvider} from "@/src/contexts/StateContext";

export default function RootLayout() {
    // @ts-ignore
    return (
        <StateProvider>
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
                <Stack.Screen
                    name={"users/[slug]"}
                    options={{headerShown: false}}
                />

            </Stack>
        </StateProvider>
    )
}
