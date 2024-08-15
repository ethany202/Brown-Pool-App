import { Tabs } from 'expo-router';
import React from 'react';
import { EnhancedTabBarIcon } from '@/components/navigation/EnhancedTabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabLayout() {

    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#C00404',//Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
            }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        <EnhancedTabBarIcon name='home' color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: 'Match History',
                    tabBarIcon: ({ color }) => (
                        <EnhancedTabBarIcon name='history' color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="leaderboard"
                options={{
                    title: 'Leaderboard',
                    tabBarIcon: ({ color }) => (
                        <EnhancedTabBarIcon name='leaderboard' color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <EnhancedTabBarIcon name='person' color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
