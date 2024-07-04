import {
    TouchableOpacity, Keyboard, TouchableWithoutFeedback, SafeAreaView, View, TextInput,
    Image, KeyboardAvoidingView, Platform, Text
} from "react-native";
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router'
import { userLogin } from "./api/api";
import { useFonts } from "expo-font";

const brownLogo = require('@/assets/images/brown-logo.png');

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [fontsLoaded, fontError] = useFonts({
        "SpaceGrotesk-Regular": require("../assets/fonts/SpaceGrotesk-Regular.ttf"),
        "SpaceGrotesk-SemiBold": require("../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
        "SpaceGrotesk-Bold": require("../assets/fonts/SpaceGrotesk-Bold.ttf")
    });

    async function submitLogin() {
        try {
            const emailJSON = await userLogin(email, password)
            if (emailJSON.email) {
                router.push('/home')
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    if (!fontsLoaded) {

    }

    return (
        <KeyboardAvoidingView
            style={styles.containerStyle}
            behavior={Platform.OS === "ios" ? "padding" : 'height'}
            enabled
        >
            <SafeAreaView
                style={styles.safeAreaStyle}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        marginTop: 100
                    }}>
                        <View style={{ marginBottom: 120 }}>
                            <Image
                                source={brownLogo}
                                style={styles.loginImage}
                            />
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <TextInput
                                placeholder="Email"
                                onChangeText={text => setEmail(text)}
                                style={styles.loginInput} />
                            <TextInput
                                placeholder="Password"
                                secureTextEntry={true}
                                onChangeText={text => setPassword(text)}
                                style={styles.loginInput} />
                            <TouchableOpacity style={styles.loginButton} onPress={submitLogin}>
                                <Text style={styles.loginText}>LOGIN</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </ KeyboardAvoidingView >
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        alignItems: 'center',
        flex: 1
    },
    safeAreaStyle: {
        alignItems: 'center',
        flex: 1
    },
    imageContainer: {
        textAlign: 'center'
    },
    loginImage: {
        height: 200,
        resizeMode: 'contain',
    },
    loginInput: {
        borderColor: '#C00404',
        borderWidth: 1.5,
        borderRadius: 10,
        padding: 20,
        paddingVertical: 15,
        fontSize: 18,
        fontFamily: 'SpaceGrotesk-Regular',
        margin: 20,
        marginBottom: 0,
        width: 300
    },
    loginButton: {
        marginTop: 50,
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 17.5,
        padding: 20,
        paddingVertical: 12.5,
        width: 300,
        backgroundColor: '#C00404',
        borderColor: '#C00404'
    },
    loginText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        letterSpacing: 1,
        fontFamily: 'SpaceGrotesk-Bold',
    }
})