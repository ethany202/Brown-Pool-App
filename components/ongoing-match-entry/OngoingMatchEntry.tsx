import { View, Pressable, TouchableOpacity, Text, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendMatchResult } from '@/app/api/api';

interface OngoingMatchProps {
    matchID: string,
    opponentName: string,
    opponentID: string,
    opponentRank: string,
    recordMatchWinCallback: Function,
    recordMatchLossCallback: Function
}

export function OngoingMatchEntry({ matchID, opponentID, opponentName, opponentRank, recordMatchWinCallback, recordMatchLossCallback }: OngoingMatchProps) {

    const [fontsLoaded, fontError] = useFonts({
        "SpaceGrotesk-Regular": require("../../assets/fonts/SpaceGrotesk-Regular.ttf"),
        "SpaceGrotesk-SemiBold": require("../../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
        "SpaceGrotesk-Bold": require("../../assets/fonts/SpaceGrotesk-Bold.ttf")
    });


    const recordResultAlert = () => {
        Alert.alert('Record Match', 'Select the winner of the match.', [
            {
                text: 'Me',
                onPress: () => recordMatchWinCallback(matchID, opponentRank)
            },
            {
                text: `${opponentName} (${opponentRank})`,
                onPress: () => recordMatchLossCallback(matchID, opponentID, opponentRank)
            },
            {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => console.log("Cancel pressed")
            }
        ])
    }

    return (
        <TouchableOpacity onPress={recordResultAlert}>
            <View style={styles.matchWrapper}>
                <Text style={[styles.opponentName, { flex: 1, color: 'black' }]}>
                    Opponent:
                </Text>
                <Text style={[styles.opponentName, { fontFamily: 'SpaceGrotesk-Bold' }]}>{opponentName} ({opponentRank}) </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    matchWrapper: {
        borderBottomWidth: 1,
        borderColor: '#D3D3D3',
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'stretch',
        paddingVertical: 15,
    },
    opponentName: {
        paddingHorizontal: 20,
        fontFamily: 'SpaceGrotesk-Regular',
        color: '#C00404',
        fontSize: 16
    }
})

