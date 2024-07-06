import { Tabs } from 'expo-router';
import React from 'react';

import { EnhancedTabBarIcon } from '@/components/navigation/EnhancedTabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    // Perform search here
    var profileData = {
        name: 'Ethan Ye',
        currentRank: 1,
        points: 92,
        gamesWon: 100,
        gamesLost: 80
    }


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
                initialParams={profileData}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: 'Match History',
                    tabBarIcon: ({ color }) => (
                        <EnhancedTabBarIcon name='history' color={color} />
                    ),
                }}
                initialParams={profileData}
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
                initialParams={profileData}
            />
        </Tabs>
    );
}
