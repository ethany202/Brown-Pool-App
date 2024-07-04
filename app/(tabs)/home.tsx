import { Text, View, ScrollView } from 'react-native';
import { Header } from '@/components/header/Header';

import { StyleSheet } from 'react-native';

export default function Home() {
    return (
        <View>
            <Header title="Current Matches" />
            <View style={styles.pageContent}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pageContent: {

    }
})
