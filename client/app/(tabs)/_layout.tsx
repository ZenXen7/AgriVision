import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#16a34a', // Green color for active tab
        tabBarInactiveTintColor: '#9ca3af', // Gray color for inactive tab
        tabBarStyle: {
          
          borderRadius: 0,  // Softer rounding
          marginHorizontal: 0,
          paddingTop: 10,
          height: 100,  // Adjusted height
          position: 'absolute',
          bottom: 0,  // Space from the bottom
          paddingHorizontal: 20, 
          paddingVertical: 10,  // More padding for a clean layout
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          borderTopWidth: 1,  // Add a small top border
        
      },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '400' },
        tabBarIconStyle: { marginBottom: -2 },
       
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="scan-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings-page"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  )
}

export default _layout