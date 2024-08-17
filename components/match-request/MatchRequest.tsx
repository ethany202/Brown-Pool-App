import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';

interface MatchRequestParams {
    inMatch: boolean,
    matchID: string,
    opponentName: string,
    opponentRank: string,
    acceptChallengeCallback: Function,
    declineChallengeCallback: Function
}

export function MatchRequest({ inMatch, matchID, opponentName, opponentRank, acceptChallengeCallback, declineChallengeCallback }: MatchRequestParams) {
    const [fontsLoaded, fontError] = useFonts({
        "SpaceGrotesk-Regular": require("../../assets/fonts/SpaceGrotesk-Regular.ttf"),
        "SpaceGrotesk-SemiBold": require("../../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
        "SpaceGrotesk-Bold": require("../../assets/fonts/SpaceGrotesk-Bold.ttf")
    });

    const createConfirmAlert = () => {
        Alert.alert('Decline Challenge', 'Are you sure you want to decline this challenge?', [
            {
                text: 'No',
                onPress: () => console.log("NO decline challenge"),
                style: 'cancel'
            },
            {
                text: 'Yes',
                onPress: () => declineChallengeCallback(matchID),
            }
        ])
    }

    return (
        <View style={styles.matchWrapper}>
            <Text style={[styles.opponentName, { flex: 1 }]}>
                <Text style={{
                    fontFamily: 'SpaceGrotesk-Bold'
                }}>{opponentName} ({opponentRank})</Text>
            </Text>
            <View style={styles.requestButtons}>
                {inMatch
                    ? <MaterialIcons name="check-box" size={25} style={styles.requestButton} color="grey" />
                    : <TouchableOpacity onPress={() => acceptChallengeCallback(matchID)}>
                        <MaterialIcons name="check-box" size={25} style={styles.requestButton} color="green" />
                    </TouchableOpacity>}
                <TouchableOpacity onPress={createConfirmAlert}>
                    <MaterialIcons name="do-disturb-on" size={25} style={styles.requestButton} color="red" />
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    matchWrapper: {
        borderBottomWidth: 1,
        borderColor: '#D3D3D3',
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'stretch',
        paddingVertical: 14,
    },
    opponentName: {
        paddingHorizontal: 20,
        fontFamily: 'SpaceGrotesk-Regular',
        color: '#C00404',
        fontSize: 16
    },
    requestButtons: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    requestButton: {
        paddingHorizontal: 15,
    }
})