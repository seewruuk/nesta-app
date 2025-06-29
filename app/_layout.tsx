import { StateProvider } from "@/src/contexts/StateContext";
import { Stack } from "expo-router";
import "./globals.css";

export default function RootLayout() {
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
                <Stack.Screen
                    name={"transactions/[id]"}
                    options={{headerShown: false}}
                />

            </Stack>
        </StateProvider>
    )
}
