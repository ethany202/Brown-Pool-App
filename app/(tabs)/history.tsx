import { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { Header } from '@/components/header/Header';
import { obtainMatchHistory } from '../api/api';
import { StyleSheet } from 'react-native';
import { HistoryEntry } from '@/components/history-entry/HistoryEntry';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MatchHistory() {

    const [matchHistory, setMatchHistory] = useState<any>({ list: [] })
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetchMatchHistory()
            setRefreshing(false);
        }, 2000);
    }, []);

    const fetchMatchHistory = async () => {
        try {
            const currentID = await AsyncStorage.getItem('user_id') || ''
            const response = await obtainMatchHistory(currentID)

            if (response.status == 200) {
                const jsonData = await response.json()
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
            <Header title="Match History" />
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
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh} />}>

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
    }
})