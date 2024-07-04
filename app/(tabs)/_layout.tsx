import { Tabs } from 'expo-router';
import React from 'react';

import { EnhancedTabBarIcon } from '@/components/navigation/EnhancedTabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

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
                    tabBarIcon: ({ color, focused }) => (
                        <EnhancedTabBarIcon name='home' color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="leaderboard"
                options={{
                    title: 'Leaderboard',
                    tabBarIcon: ({ color, focused }) => (
                        <EnhancedTabBarIcon name='leaderboard' color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
