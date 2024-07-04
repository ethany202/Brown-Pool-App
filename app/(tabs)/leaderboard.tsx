import { View, ScrollView, Text, FlatList } from "react-native";
import { Header } from "@/components/header/Header";
import { PlayerEntry } from "@/components/player-entry/PlayerEntry";

import { getLeaderboard } from "../api/api";
import { StyleSheet } from "react-native";
import { useState, useEffect } from 'react';

export default function Leaderboard() {

    const [leaderboardInfo, setLeaderboardInfo] = useState<any>({ list: [] })

    async function fetchLeaderboard() {
        const leaderboard = await getLeaderboard()
        console.log(leaderboard)
        setLeaderboardInfo(leaderboard)
    }

    useEffect(() => {
        fetchLeaderboard()
        //console.log(leaderboardInfo)
    }, [])

    return (
        <View>
            <Header title="Leaderboard" />
            <View style={styles.entryStyle}>
                <Text style={{
                    flex: 1,
                    fontSize: 15
                }}>
                    Rank
                </Text>
                <Text style={{
                    flex: 1,
                    fontSize: 15
                }}>
                    Player
                </Text>
                <Text style={{
                    flex: 0,
                    fontSize: 15
                }}>
                    Points
                </Text>
            </View>
            <FlatList
                style={styles.leaderboardSection}
                data={leaderboardInfo.list}
                renderItem={({ item }) => {
                    return (
                        <PlayerEntry
                            rank={item.rank_number}
                            name={item.name}
                            points={item.points}
                            style={styles.entryStyle}
                        />
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    leaderboardSection: {

    },
    entryStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'stretch',
        marginHorizontal: 40
    },

})
