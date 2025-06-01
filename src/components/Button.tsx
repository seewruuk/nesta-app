import {Pressable, Text} from "react-native";


interface ButtonProps {
    text: string;
    onPress?: () => void;
}

export default function Button({text, onPress} : ButtonProps){
    return (
        <Pressable
            onPress={onPress}
            className="bg-primary items-center px-4 font-semibold py-4 rounded-xl"
        >
            <Text>{text}</Text>
        </Pressable>
    );
}