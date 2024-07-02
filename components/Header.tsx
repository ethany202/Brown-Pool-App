import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

const profileIcon = require('../assets/images/anon-profile.png')

interface HeaderProps {
    title: string
}

export function Header({ title }: HeaderProps) {
    return (
        <View
            style={{
                //flex: 1,
                //alignItems: 'center',
                //justifyContent: 'center'
            }}>
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
    profileIconStyle: {
        width: 75,
        height: 75
    },
    titleStyle: {
        fontWeight: 300,
        fontSize: 40
    }
})