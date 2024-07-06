import { View, Text } from 'react-native';
import { Header } from '@/components/header/Header';
import { useLocalSearchParams } from "expo-router";

export default function MatchHistory() {
    const params = useLocalSearchParams()
    const profileData = JSON.parse(JSON.stringify(params))

    return (
        <View>
            <Header
                title="Match History"
                profileData={profileData}
            />
        </View>
    )
}