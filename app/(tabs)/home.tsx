import { Text, View, ScrollView } from 'react-native';
import { Header } from '@/components/header/Header';

import { StyleSheet } from 'react-native';
import { useLocalSearchParams } from "expo-router";


export default function Home() {
    const params = useLocalSearchParams()
    const profileData = JSON.parse(JSON.stringify(params))
    //console.log(params)

    return (
        <View>
            <Header
                title="Current Match"
                profileData={profileData} />
            <View style={styles.pageContent}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pageContent: {

    }
})
