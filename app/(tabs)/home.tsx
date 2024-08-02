import {
    Text, View, TextInput, ScrollView, Pressable, SafeAreaView, FlatList,
    SectionList
} from 'react-native';
import { Header } from '@/components/header/Header';
import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

export default function Home() {

    /**
     * Creating matches ==> Send request to backend to create match ONCE request is processed
     * Requests are displayed on HOME page
     */
    const [isInputFocused, setInputFocused] = useState<boolean>(false)
    const [allPlayers, setAllPlayers] = useState<any>([])
    const [filteredPlayers, setFilteredPlayers] = useState<any>(['ethan_ye@brown.edu'])
    const [matchRequests, setMatchRequests] = useState<any>([])
    const [playerSearch, setPlayerSearch] = useState<string>('')
    const [fontsLoaded, fontError] = useFonts({
        "SpaceGrotesk-Regular": require("../../assets/fonts/SpaceGrotesk-Regular.ttf"),
        "SpaceGrotesk-SemiBold": require("../../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
        "SpaceGrotesk-Bold": require("../../assets/fonts/SpaceGrotesk-Bold.ttf")
    });

    return (
        <View style={{
            flex: 1
        }}>
            <Header
                title="Current Match" />
            <View style={styles.pageContent}>
                <View style={styles.searchBarStyle}>
                    <TextInput
                        onFocus={() => setInputFocused(true)}
                        // onBlur={() => { setInputFocused(false); console.log('UNFOCUSED') }}
                        style={styles.searchInput}
                        placeholder="Search email..."
                        onChangeText={setPlayerSearch}
                        value={playerSearch}
                    />
                    <Pressable
                        style={styles.challengeButton}>
                        <Text style={styles.buttonText}>Send</Text>
                    </Pressable>
                </View>
                {isInputFocused &&
                    <FlatList
                        style={styles.inputResults}
                        data={filteredPlayers}
                        renderItem={({ item }) => {
                            return (
                                <Pressable
                                    onPress={() => {
                                        setPlayerSearch(item)
                                        setInputFocused(false)
                                    }}
                                    style={styles.playerResult}>
                                    <Text
                                        style={{
                                            fontSize: 16
                                        }}
                                    >{item}</Text>
                                </Pressable>
                            )

                        }}
                    />}
                {/* <View style={{
                    alignItems: 'center'
                }}>
                    <Text style={{
                        position: 'absolute',
                    }}>Helo</Text>
                </View> */}
                {/* <SectionList>

                </SectionList> */}
            </View>
        </View>
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
        borderWidth: 1.5,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        marginLeft: 30,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontFamily: 'SpaceGrotesk-Regular',
        fontSize: 16,
        flex: 2.5,
        color: 'black',
        borderRightWidth: 0
    },
    challengeButton: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#C00404',
        marginRight: 30,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    },
    buttonText: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 16,
        color: 'white',
        fontFamily: 'SpaceGrotesk-SemiBold',
    },
    inputResults: {
        borderTopLeftRadius: 8,
        borderTopEndRadius: 8,
        marginHorizontal: 30,
        backgroundColor: '#dadada',
        zIndex: 1
    },
    playerResult: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderBottomWidth: 0.5
    }
})
