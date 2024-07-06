import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Header } from '@/components/header/Header';
import { useLocalSearchParams } from 'expo-router';
import { useFonts } from 'expo-font';

export default function Profile() {
    // Retrieve statistics on load ==> no need to continuously calculate
    const params = useLocalSearchParams()
    const profileData = JSON.parse(JSON.stringify(params))
    const [fontsLoaded, fontError] = useFonts({
        "SpaceGrotesk-Regular": require("../../assets/fonts/SpaceGrotesk-Regular.ttf"),
        "SpaceGrotesk-SemiBold": require("../../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
        "SpaceGrotesk-Bold": require("../../assets/fonts/SpaceGrotesk-Bold.ttf")
    });

    return (
        <View>
            <Header
                title={profileData.name}
                profileData={profileData} />
            <View style={styles.profileContent}>
                <Text style={styles.profileText}>
                    Current Rank: <Text style={styles.profileValue}>{profileData.currentRank}</Text>
                </Text>
                <Text style={styles.profileText}>
                    Total Points: <Text style={styles.profileValue}>{profileData.points}</Text>
                </Text>
                <Text style={styles.profileText}>
                    Games Won: <Text style={styles.profileValue}>{profileData.gamesWon}</Text>
                </Text>
                <Text style={styles.profileText}>
                    Games Lost: <Text style={styles.profileValue}>{profileData.gamesLost}</Text>
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