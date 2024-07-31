import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

interface PlayerEntryProps {
    rank: number,
    name: string,
    points: number,
    fontColor: string,
    style: any
}

export function PlayerEntry({ rank, name, points, fontColor, style }: PlayerEntryProps) {

    const [fontsLoaded, fontError] = useFonts({
        "SpaceGrotesk-Regular": require("../../assets/fonts/SpaceGrotesk-Regular.ttf"),
        "SpaceGrotesk-SemiBold": require("../../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
        "SpaceGrotesk-Bold": require("../../assets/fonts/SpaceGrotesk-Bold.ttf")
    });

    return (
        <View style={[style, {
            // marginHorizontal: 50,
            paddingHorizontal: 10,
            marginVertical: 10,
            paddingVertical: 10,
            borderBottomWidth: 0.5
        }]}>
            <Text style={[styles.entryFont, {
                flex: 1,
                color: fontColor
            }]}>
                {rank}
            </Text>
            <Text style={[styles.entryFont, {
                flex: 2,
                color: fontColor
            }]}>
                {name}
            </Text>
            <Text style={[styles.entryFont, {
                flex: 0,
                color: fontColor
            }]}>
                {points}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    entryFont: {
        fontSize: 20,
        fontFamily: 'SpaceGrotesk-Regular',
    }
})