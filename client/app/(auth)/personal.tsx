import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";


const Personal = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
            >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView className="flex-1">
              <View className="px-6 pt-4 pb-6">
              <TouchableOpacity onPress={() => router.back()} className="mb-4">
                 <Ionicons name="arrow-back" size={24} color="#16a34a" />
              </TouchableOpacity>
                <View className="py-4 -ml-2">
                  <Ionicons name="person-circle" size={64} color="#16a34a" />
                </View>


              <Text className="text-3xl font-sfbold text-green-700 mb-2">
                Personal Information
              </Text>

              <Text className="text-base font-sfmedium text-gray-600">
                Fill out your personal information to get started.
              </Text>
              </View>

              <View className="px-6 py-4 space-y-4">
                


              </View>



              </ScrollView>



              
            </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Personal