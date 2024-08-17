import {
    Text, View, TextInput, TouchableOpacity, FlatList,
    SectionList, RefreshControl, Alert
} from 'react-native';
import { Header } from '@/components/header/Header';
import { useState, useEffect, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import {
    getAllPlayers, sendChallenge, obtainOngoingMatches, obtainMatchRequests,
    declineChallenge, acceptChallenge, sendMatchResult
} from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OngoingMatchEntry } from '@/components/ongoing-match-entry/OngoingMatchEntry';
import { MatchRequest } from '@/components/match-request/MatchRequest';
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width;
const matchEntriesHorizontalMargin = 20

export default function Home() {

    /**
     * Creating matches ==> Send request to backend to create match ONCE request is processed
     * Requests are displayed on HOME page
     */
    const [isInputFocused, setInputFocused] = useState<boolean>(false)
    const [allPlayers, setAllPlayers] = useState<Array<any>>([])
    const [filteredPlayers, setFilteredPlayers] = useState<Array<any>>([])
    const [playerSearch, setPlayerSearch] = useState<string>('')
    const [selectedPlayerID, setSelectedPlayerID] = useState<string>('')

    const [ongoingMatches, setOngoingMatches] = useState<any>({ list: [] })
    const [matchRequests, setMatchRequests] = useState<any>({ list: [] })
    const [matchEntrySections, setMatchEntrySections] = useState<any>([{ title: 'Ongoing Matches', data: [] }, { title: 'Incoming Requests', data: [] }])

    /**
     * Style-based elements
     */
    const [searchPlayerHeight, setSearchPlayerHeight] = useState<number>(0);
    const [fontsLoaded, fontError] = useFonts({
        "SpaceGrotesk-Regular": require("../../assets/fonts/SpaceGrotesk-Regular.ttf"),
        "SpaceGrotesk-SemiBold": require("../../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
        "SpaceGrotesk-Bold": require("../../assets/fonts/SpaceGrotesk-Bold.ttf")
    });

    /**
     * Refresh elements
     */
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            refreshMatchData()
            setRefreshing(false);
        }, 2000);
    }, []);

    /**
     * Alert do show that challenge has been sent
     */
    const createChallengeSentAlert = () => {
        Alert.alert('Challenge sent', 'Your challenge has been sent.', [
            {
                text: 'OK',
                onPress: () => console.log("Challenge sent"),
            }
        ])
    }

    const pullAllPlayers = async () => {
        const playersResult = await getAllPlayers()

        if (playersResult.status === 200) {
            const playersResultJSON = await playersResult.json()
            setAllPlayers(playersResultJSON.list)
        }
    }

    const executeSendChallenge = async () => {
        const userID = await AsyncStorage.getItem('user_id') || ''
        const challengeResponse = await sendChallenge(userID, selectedPlayerID)

        if (challengeResponse.status === 200) {
            createChallengeSentAlert()
            setPlayerSearch('')
        }
    }

    const getOngoingMatches = async () => {
        const userID = await AsyncStorage.getItem('user_id') || ''
        const response = await obtainOngoingMatches(userID)

        if (response.status === 200) {
            setOngoingMatches(await response.json())
        }
    }

    const getMatchRequests = async () => {
        const userID = await AsyncStorage.getItem('user_id') || ''
        const response = await obtainMatchRequests(userID)

        if (response.status === 200) {
            setMatchRequests(await response.json())
        }
    }

    const renderMatchEntries = ({ item }: { item: any }) => {
        if (!item.is_ongoing_match) {
            return (
                <MatchRequest
                    inMatch={ongoingMatches.list.length > 0}
                    matchID={item.match_id}
                    opponentName={item.opponent}
                    opponentRank={item.opponent_rank}
                    acceptChallengeCallback={callAcceptChallenge}
                    declineChallengeCallback={callDeclineChallenge} />
            )
        }
        else {
            return (
                <OngoingMatchEntry
                    matchID={item.match_id}
                    opponentID={item.opponent_id}
                    opponentName={item.opponent}
                    opponentRank={item.opponent_rank}
                    recordMatchResultCallback={recordMatchResult} />
            )
        }
    };


    const recordMatchResult = async (matchID: string, winnerID: string, userID: string, opponentID: string) => {
        const response = await sendMatchResult(matchID, winnerID, userID, opponentID)
        if (response.status === 200) {
            getOngoingMatches()
        }
    }

    const callAcceptChallenge = async (matchID: string) => {
        const acceptResponse = await acceptChallenge(matchID)
        if (acceptResponse.status === 200) {
            getOngoingMatches()
            getMatchRequests()
        }
    }

    const callDeclineChallenge = async (matchID: string) => {
        const declineResponse = await declineChallenge(matchID)
        if (declineResponse.status === 200) {
            getMatchRequests()
        }
    }

    const refreshMatchData = () => {
        pullAllPlayers()
        getOngoingMatches()
        getMatchRequests()
    }

    useEffect(() => {
        refreshMatchData()
    }, [])

    useEffect(() => {
        const playerRegex = new RegExp(`.*${playerSearch}.*`)
        var matchingPlayers = new Array<any>()

        allPlayers.forEach((element: any) => {
            if (playerRegex.test(element.email)) {
                matchingPlayers.push(element)
            }
        });
        setFilteredPlayers(matchingPlayers)

    }, [playerSearch])

    useEffect(() => {
        if (ongoingMatches.list && matchRequests.list) {
            setMatchEntrySections([
                {
                    title: 'Ongoing Matches',
                    data: ongoingMatches.list
                },
                {
                    title: 'Incoming Requests',
                    data: matchRequests.list
                }
            ])
        }
    }, [ongoingMatches, matchRequests])

    return (
        <View>
            <Header title="Current Match" />
            <View style={styles.pageContent}>
                <View>
                    <View style={styles.searchBarStyle}>
                        <TextInput
                            onFocus={() => setInputFocused(true)}
                            style={styles.searchInput}
                            placeholder="Search email..."
                            onChangeText={setPlayerSearch}
                            value={playerSearch}
                            onLayout={(event) => {
                                setSearchPlayerHeight(event.nativeEvent.layout.height)
                            }}
                        />
                        <TouchableOpacity
                            style={styles.challengeButton}
                            onPress={executeSendChallenge}>
                            <Text style={styles.buttonText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                    {isInputFocused &&
                        <FlatList
                            style={styles.inputResults}
                            data={filteredPlayers}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSelectedPlayerID("" + item.user_id)
                                            setPlayerSearch(item.email)
                                            setInputFocused(false)
                                        }}
                                        style={styles.playerResult}>
                                        <Text
                                            style={{
                                                fontSize: 16
                                            }}
                                        >{item.email}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />}
                </View>
                <View
                    style={[styles.matchesStyle,
                    {
                        top: searchPlayerHeight,
                    }]}>
                    {matchEntrySections && <SectionList
                        sections={matchEntrySections}
                        style={styles.matchesListComponent}
                        renderItem={renderMatchEntries}
                        showsHorizontalScrollIndicator={false}
                        renderSectionHeader={({ section: { title } }) => (
                            <View style={styles.listHeaderView}>
                                <Text style={styles.listHeaderStyle}>{title}</Text>
                            </View>
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh} />
                        }>
                    </SectionList>}
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    pageContent: {

    },
    searchBarStyle: {
        flexDirection: 'row'
    },
    searchInput: {
        height: 40,
        borderWidth: 1.25,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        marginLeft: 30,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontFamily: 'SpaceGrotesk-Regular',
        fontSize: 16,
        flex: 2.5,
        color: 'black',
        borderRightWidth: 0,
        borderColor: '#C00404'
    },
    challengeButton: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#C00404',
        marginRight: 30,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6
    },
    buttonText: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 16,
        color: 'white',
        fontFamily: 'SpaceGrotesk-SemiBold',
    },
    inputResults: {
        borderRadius: 8,
        marginHorizontal: 30,
        backgroundColor: 'white',
        zIndex: 1,
        borderWidth: 1,
        borderColor: '#E8EBEC',
        maxHeight: 200
    },
    playerResult: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderColor: '#E8EBEC'
    },
    listHeaderView: {
        borderWidth: 2,
        borderRadius: 6,
        borderColor: '#FFC72C',
        zIndex: 2,
        backgroundColor: "white",
        // textAlign: 'center'
    },
    listHeaderStyle: {
        fontSize: 28,
        borderBottomWidth: 0.5,
        fontFamily: 'SpaceGrotesk-SemiBold',
        marginVertical: 15,
        color: 'black',
        textAlign: 'center'
    },
    matchesStyle: {
        position: 'absolute',
        zIndex: -1,
        marginVertical: 30,
        paddingBottom: 50,
        marginHorizontal: matchEntriesHorizontalMargin,
        width: screenWidth - (2 * matchEntriesHorizontalMargin),
    },
    matchesListComponent: {
        borderRadius: 6,
        alignSelf: 'stretch',
        flexGrow: 1
    }
})
