import { View, Pressable, TouchableOpacity, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

interface OngoingMatchProps {
    matchNumber: number,
    opponentName: string,
    opponentEmail: string
}

export function OngoingMatchEntry({ matchNumber, opponentName, opponentEmail }: OngoingMatchProps) {

    const [fontsLoaded, fontError] = useFonts({
        "SpaceGrotesk-Regular": require("../../assets/fonts/SpaceGrotesk-Regular.ttf"),
        "SpaceGrotesk-SemiBold": require("../../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
        "SpaceGrotesk-Bold": require("../../assets/fonts/SpaceGrotesk-Bold.ttf")
    });

    return (
        <TouchableOpacity>
            <View style={styles.matchWrapper}>
                <Text style={[styles.opponentName, { flex: 1 }]}>
                    Opponent:
                </Text>
                <Text style={[styles.opponentName, { fontFamily: 'SpaceGrotesk-Bold' }]}>{opponentName} (1) </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    matchWrapper: {
        borderBottomWidth: 1,
        borderColor: '#D3D3D3',
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'stretch',
        paddingVertical: 15,
    },
    opponentName: {
        paddingHorizontal: 20,
        fontFamily: 'SpaceGrotesk-Regular',
        color: '#C00404',
        fontSize: 16
    }
})

