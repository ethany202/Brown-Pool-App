import { View, Text, Image, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const brownLogo = require('../../assets/images/brown-logo.png')
const logoutIcon = require('../../assets/images/user-logout.png')

interface HeaderProps {
    title: string,
}

export function Header({ title }: HeaderProps) {

    const [fontsLoaded, fontError] = useFonts({
        "SpaceGrotesk-Regular": require("../../assets/fonts/SpaceGrotesk-Regular.ttf"),
        "SpaceGrotesk-SemiBold": require("../../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
        "SpaceGrotesk-Bold": require("../../assets/fonts/SpaceGrotesk-Bold.ttf")
    });


    async function logout() {
        AsyncStorage.removeItem('email')
            .then(() => router.replace('/'))
    }

    if (fontsLoaded) {
        return (
            <View
                style={styles.headerWrapper}>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                    <Image
                        source={brownLogo}
                        style={styles.logoStyle}
                    />
                    <Pressable
                        onPress={() => logout()}
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end'

                        }}>
                        <Image
                            source={logoutIcon}
                            style={styles.logoutIconStyle}
                        />
                    </Pressable>
                </View>
                <View style={{
                    alignItems: 'center',
                }}>
                    <Text style={styles.titleStyle}>{title}</Text>

                </View>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    headerWrapper: {
        // borderTopWidth: 0.5,
        // borderColor: 'grey',
        marginTop: 50,
    },
    logoStyle: {
        width: 35,
        height: 35,
        marginTop: 20,
        marginLeft: 20,
        opacity: 1,
    },
    logoutIconStyle: {
        width: 30,
        height: 30,
        marginTop: 20,
        marginRight: 20,
        opacity: 1
    },
    titleStyle: {
        fontWeight: 700,
        fontSize: 40,
        fontFamily: 'SpaceGrotesk-SemiBold',
        marginTop: 75,
        marginBottom: 75,
        paddingHorizontal: 10,
        color: 'white',
        backgroundColor: '#C00404'
    }
})