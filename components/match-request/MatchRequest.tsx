import { View, TouchableOpacity, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

interface MatchRequestParams {
    matchID: string,
    opponentName: string,
    opponentRank: string
}

export function MatchRequest({ matchID, opponentName, opponentRank }: MatchRequestParams) {
    const [fontsLoaded, fontError] = useFonts({
        "SpaceGrotesk-Regular": require("../../assets/fonts/SpaceGrotesk-Regular.ttf"),
        "SpaceGrotesk-SemiBold": require("../../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
        "SpaceGrotesk-Bold": require("../../assets/fonts/SpaceGrotesk-Bold.ttf")
    });

    return (
        <View style={styles.matchWrapper}>
            <Text style={[styles.opponentName, { flex: 1 }]}>
                <Text style={{
                    fontFamily: 'SpaceGrotesk-Bold'
                }}>{opponentName} ({opponentRank})</Text>
            </Text>
            <View style={styles.requestButtons}>
                <TouchableOpacity>
                    <MaterialIcons name="check-box" size={25} style={styles.requestButton} color="green" />
                </TouchableOpacity>
                <TouchableOpacity>
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