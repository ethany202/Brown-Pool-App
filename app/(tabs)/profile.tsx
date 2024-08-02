import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Header } from '@/components/header/Header';
import { useFonts } from 'expo-font';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { obtainProfileData } from '../api/api';

export default function Profile() {
    const [fontsLoaded, fontError] = useFonts({
        "SpaceGrotesk-Regular": require("../../assets/fonts/SpaceGrotesk-Regular.ttf"),
        "SpaceGrotesk-SemiBold": require("../../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
        "SpaceGrotesk-Bold": require("../../assets/fonts/SpaceGrotesk-Bold.ttf")
    });
    const [name, setName] = useState<string>('')
    const [profileData, setProfileData] = useState<any>({})

    const pullProfileData = async () => {
        const storedName = await AsyncStorage.getItem('name') || 'John Doe'
        const email = await AsyncStorage.getItem('email') || ''
        const userID = await AsyncStorage.getItem('user_id') || ''

        setName(storedName)
        setProfileData(await obtainProfileData(email, userID))

        console.log(profileData)
    }

    useEffect(() => {
        pullProfileData()
    }, [])

    return (
        <View>
            <Header
                title={name}
            />
            <View style={styles.profileContent}>
                <Text style={styles.profileText}>
                    Current Rank: <Text style={styles.profileValue}>{profileData.currentRank}</Text>
                </Text>
                <Text style={styles.profileText}>
                    Total Points: <Text style={styles.profileValue}>{profileData.points}</Text>
                </Text>
                <Text style={styles.profileText}>
                    Matches Won: <Text style={styles.profileValue}>{profileData.matchesWon}</Text>
                </Text>
                <Text style={styles.profileText}>
                    Matches Lost: <Text style={styles.profileValue}>{profileData.matchesLost}</Text>
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profileContent: {
        display: 'flex',
        alignItems: 'center'
    },
    profileText: {
        paddingVertical: 15,
        fontWeight: 'bold',
        fontFamily: 'SpaceGrotesk-Bold',
        fontSize: 25
    },
    profileValue: {
        color: '#C00404'
    },
    logoutButton: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        height: 40
    }
})