import { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Header } from '@/components/header/Header';
import { useLocalSearchParams } from "expo-router";
import { obtainMatchHistory } from '../api/api';
import { StyleSheet } from 'react-native';
import { HistoryEntry } from '@/components/history-entry/HistoryEntry';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MatchHistory() {
    const params = useLocalSearchParams()
    const profileData = JSON.parse(JSON.stringify(params))
    const [matchHistory, setMatchHistory] = useState<any>({ list: [] })

    const fetchMatchHistory = async () => {
        try {
            const currentID = await AsyncStorage.getItem('user_id') || ''
            const response = await obtainMatchHistory(currentID)

            if (response.status == 200) {
                const jsonData = await response.json()
                console.log(jsonData)
                setMatchHistory(jsonData)
                // Set Match History data
            }
        }
        catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        fetchMatchHistory()
    }, [])

    return (
        <View>
            <Header
                title="Match History"
                profileData={profileData}
            />
            <FlatList
                style={styles.historySection}
                data={matchHistory.list}
                renderItem={({ item }) => {
                    return (
                        <HistoryEntry
                            matchData={item}
                            style={styles.historyEntry}
                        />
                    )
                }}>

            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    historySection: {
        height: 500
    },
    historyEntry: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'stretch',
        // backgroundColor: '#12ae00',
        // backgroundColor: '#65A765',
        // backgroundColor: '#EE9090'
    }
})