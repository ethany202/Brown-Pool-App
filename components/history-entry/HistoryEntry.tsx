import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

interface HistoryEntryProps {
    matchData: any,
    style: any
}

export function HistoryEntry({ matchData, style }: HistoryEntryProps) {

    const [matchResult, setMatchResult] = useState<string>('L')
    const [wonMatch, setWonMatch] = useState<boolean>(false)
    const [opponentName, setOpponentName] = useState<string>('John Doe')
    const [opponentRank, setOpponentRank] = useState<string>('50')
    const [matchDate, setMatchDate] = useState<string>('2000-01-01')

    const [fontsLoaded, fontError] = useFonts({
        "SpaceGrotesk-Regular": require("../../assets/fonts/SpaceGrotesk-Regular.ttf"),
        "SpaceGrotesk-SemiBold": require("../../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
        "SpaceGrotesk-Bold": require("../../assets/fonts/SpaceGrotesk-Bold.ttf")
    });

    // Important Values: Date, 
    const viewMatchData = async () => {
        const currentID = await AsyncStorage.getItem('user_id') || '0'
        if (Number(matchData.winner_id) === Number(currentID)) {
            setMatchResult('W')
        }
        else {
            setMatchResult('L')
        }

        setWonMatch(matchData.winner_id == currentID)
        setOpponentName(matchData.opponent_name)
        setOpponentRank(matchData.opponent_rank)
        setMatchDate(matchData.match_date.substring(0, 10))
    }

    useEffect(() => {
        viewMatchData()
    }, [])

    return (
        <View style={[style, wonMatch ? styles.winBackground : styles.loseBackground, {
            // marginHorizontal: 50,
            paddingHorizontal: 25,
            paddingVertical: 12,
        }]}>
            <Text style={[styles.entryStyle, {
                flex: 1
            }]}>
                {matchResult}
            </Text>
            <Text style={[styles.entryStyle, {
                flex: 2
            }]}>
                {opponentName} ({opponentRank})
            </Text>
            <Text style={[styles.entryStyle, {
                flex: 0
            }]}>
                {matchDate}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    winBackground: {
        backgroundColor: '#65A765',
    },
    loseBackground: {
        backgroundColor: '#EE9090'
    },
    entryStyle: {
        fontSize: 18,
        fontFamily: 'SpaceGrotesk-SemiBold',
        color: 'white'
    }
})