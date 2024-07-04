import { View, Text, StyleSheet } from 'react-native';

interface PlayerEntryProps {
    rank: number,
    name: string,
    points: number,
    style: any
}

export function PlayerEntry({ rank, name, points, style }: PlayerEntryProps) {
    return (
        <View style={[style, {
            // marginHorizontal: 50,
            paddingHorizontal: 10,
            marginVertical: 10,
            paddingVertical: 10,
            borderBottomWidth: 0.5
        }]}>
            <Text style={{
                flex: 1,
                fontSize: 20
            }}>
                {rank}
            </Text>
            <Text style={{
                flex: 2,
                fontSize: 20
            }}>
                {name}
            </Text>
            <Text style={{
                flex: 0,
                fontSize: 20
            }}>
                {points}
            </Text>
        </View>
    )
}