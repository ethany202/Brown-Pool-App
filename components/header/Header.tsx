import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';

const profileIcon = require('../../assets/images/anon-profile.png')

interface HeaderProps {
    title: string
}

export function Header({ title }: HeaderProps) {

    const [fontsLoaded, fontError] = useFonts({
        "SpaceGrotesk-Regular": require("../../assets/fonts/SpaceGrotesk-Regular.ttf"),
        "SpaceGrotesk-SemiBold": require("../../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
        "SpaceGrotesk-Bold": require("../../assets/fonts/SpaceGrotesk-Bold.ttf")
    });

    return (
        <View
            style={styles.headerWrapper}>
            <View
                style={{
                    //flex: 1
                    alignItems: 'flex-end'
                }}>
                <TouchableOpacity>
                    <Image
                        source={profileIcon}
                        style={styles.profileIconStyle}
                    />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    alignItems: 'center'
                }}>
                <Text style={styles.titleStyle}>{title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerWrapper: {
        borderTopWidth: 0.5,
        borderColor: 'grey',
        marginTop: 50
    },
    profileIconStyle: {
        width: 40,
        height: 40,
        margin: 10,
        opacity: 0.5
    },
    titleStyle: {
        fontWeight: 700,
        fontSize: 40,
        fontFamily: 'SpaceGrotesk-SemiBold',
        marginTop: 75,
        marginBottom: 75,
        color: '#C00404'
    }
})