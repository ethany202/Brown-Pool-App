import { View, ScrollView, Text, FlatList } from "react-native";
import { Header } from "@/components/header/Header";
import { PlayerEntry } from "@/components/player-entry/PlayerEntry";

import { getLeaderboard } from "../api/api";
import { StyleSheet } from "react-native";
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { useLocalSearchParams } from "expo-router";

export default function Leaderboard() {

    const params = useLocalSearchParams()
    const profileData = JSON.parse(JSON.stringify(params))
    const [leaderboardInfo, setLeaderboardInfo] = useState<any>({ list: [] })
    const [fontsLoaded, fontError] = useFonts({
        "SpaceGrotesk-Regular": require("../../assets/fonts/SpaceGrotesk-Regular.ttf"),
        "SpaceGrotesk-SemiBold": require("../../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
        "SpaceGrotesk-Bold": require("../../assets/fonts/SpaceGrotesk-Bold.ttf")
    });


    async function fetchLeaderboard() {
        const leaderboard = await getLeaderboard()
        setLeaderboardInfo(leaderboard)
    }

    useEffect(() => {
        fetchLeaderboard()
        //console.log(leaderboardInfo)
    }, [])

    return (
        <View>
            <Header
                title="Leaderboard"
                profileData={profileData} />
            <View style={styles.entryStyle}>
                <Text style={{
                    flex: 1,
                    fontSize: 15,
                    fontFamily: 'SpaceGrotesk-Regular'
                }}>
                    Rank
                </Text>
                <Text style={{
                    flex: 1,
                    fontSize: 15,
                    fontFamily: 'SpaceGrotesk-Regular'
                }}>
                    Player
                </Text>
                <Text style={{
                    flex: 0,
                    fontSize: 15,
                    fontFamily: 'SpaceGrotesk-Regular'
                }}>
                    Points
                </Text>
            </View>
            <FlatList
                style={styles.leaderboardSection}
                data={leaderboardInfo.list}
                renderItem={({ item }) => {
                    if (item.rank_number % 2 == 1) {
                        return (
                            <PlayerEntry
                                rank={item.rank_number}
                                name={item.name}
                                points={item.points}
                                fontColor='#C00404'
                                style={styles.entryStyle}
                            />
                        )
                    }
                    else {
                        return (
                            <PlayerEntry
                                rank={item.rank_number}
                                name={item.name}
                                points={item.points}
                                fontColor='black'
                                style={styles.entryStyle}
                            />
                        )
                    }

                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    leaderboardSection: {
        // flex: 1
        height: 400
    },
    entryStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'stretch',
        marginHorizontal: 40
    },
})
