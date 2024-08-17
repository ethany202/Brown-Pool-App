import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { useState, useMemo, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PlayerEntryProps {
    userID: string,
    rank: number,
    name: string,
    points: number,
    fontColor: string,
    style: any
}

export function PlayerEntry({ userID, rank, name, points, fontColor, style }: PlayerEntryProps) {

    const [fontsLoaded, fontError] = useFonts({
        "SpaceGrotesk-Regular": require("../../assets/fonts/SpaceGrotesk-Regular.ttf"),
        "SpaceGrotesk-SemiBold": require("../../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
        "SpaceGrotesk-Bold": require("../../assets/fonts/SpaceGrotesk-Bold.ttf")
    });

    const [fontChoice, setFontChoice] = useState<string>('SpaceGrotestk-Regular')
    const [isSelf, setIsSelf] = useState<boolean>(false)

    const updateFontChoice = async () => {
        if (Number(userID) === Number(await AsyncStorage.getItem('user_id'))) {
            setFontChoice('SpaceGrotesk-SemiBold')
            setIsSelf(true)
        }
    }

    useEffect(() => {
        updateFontChoice()
    }, [])

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
                color: fontColor,
                fontFamily: fontChoice
            }]}>
                {rank}
            </Text>
            <Text style={[styles.entryFont, {
                flex: 2,
                color: fontColor,
                fontFamily: fontChoice
            }]}>

                {isSelf && <Text>
                    *
                </Text>}{name}
            </Text>
            <Text style={[styles.entryFont, {
                flex: 0,
                color: fontColor,
                fontFamily: fontChoice
            }]}>
                {points}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    entryFont: {
        fontSize: 20,
    }
})