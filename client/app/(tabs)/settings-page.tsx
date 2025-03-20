import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuthStore } from '../../store/authStore';

const Settings = () => {
  const router = useRouter();
  const { logoutUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              setIsLoading(true);
              const { success, message } = await logoutUser();
              
              if (success) {
                router.replace("/login");
              } else {
                Alert.alert("Error", message);
              }
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert("Error", "Failed to logout. Please try again.");
            } finally {
              setIsLoading(false);
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 pt-4">
        <Text className="text-3xl font-sfbold text-green-700 mb-6">
          Settings
        </Text>

  
        <View className="mb-8">
          <Text className="text-lg font-sfmedium text-gray-700 mb-4">
            Account
          </Text>
          
       
          <TouchableOpacity
            onPress={handleLogout}
            disabled={isLoading}
            className={`flex-row items-center justify-between bg-red-50 p-4 rounded-2xl ${
              isLoading ? "opacity-70" : ""
            }`}
          >
            <View className="flex-row items-center space-x-3">
              <Ionicons name="log-out-outline" size={24} color="#ef4444" />
              <Text className="text-red-600 font-sfmedium text-lg">
                Logout
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#ef4444" />
          </TouchableOpacity>
        </View>

 
        <View>
          <Text className="text-lg font-sfmedium text-gray-700 mb-4">
            App Settings
          </Text>
          
       
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Settings