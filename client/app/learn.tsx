import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const Learn = () => {
  const router = useRouter()
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
       
        <View className="px-6 pt-4 pb-6 bg-green-50">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="mb-4"
          >
            <Ionicons name="arrow-back" size={24} color="#16a34a" />
          </TouchableOpacity>
          
          <Text className="text-3xl font-sfbold text-green-700 mb-2">How AgriVision Works</Text>
          <Text className="text-base font-sfmedium text-gray-600">
            Discover how our AI technology helps you identify and treat lettuce diseases
          </Text>
        </View>
        
       
        <View className="px-6 py-8">
        
          <View className="flex-row mb-12">
            <View className="h-12 w-12 rounded-full bg-green-100 items-center justify-center mr-4">
              <Text className="text-xl font-sfbold text-green-600">1</Text>
            </View>
            <View className="flex-1">
              <Text className="text-xl font-sfbold text-green-700 mb-2">Take a Photo</Text>
              <Text className="text-base font-sfmedium text-gray-600 leading-6">
                Simply snap a clear photo of your lettuce plant using your device's camera. Make sure to capture the affected areas clearly.
              </Text>
            </View>
          </View>
          
        
          <View className="flex-row mb-12">
            <View className="h-12 w-12 rounded-full bg-green-100 items-center justify-center mr-4">
              <Text className="text-xl font-sfbold text-green-600">2</Text>
            </View>
            <View className="flex-1">
              <Text className="text-xl font-sfbold text-green-700 mb-2">AI Analysis</Text>
              <Text className="text-base font-sfmedium text-gray-600 leading-6">
                Our deep learning model analyzes the image, identifying patterns and symptoms that indicate specific diseases with high accuracy.
              </Text>
            </View>
          </View>
          
      
          <View className="flex-row mb-12">
            <View className="h-12 w-12 rounded-full bg-green-100 items-center justify-center mr-4">
              <Text className="text-xl font-sfbold text-green-600">3</Text>
            </View>
            <View className="flex-1">
              <Text className="text-xl font-sfbold text-green-700 mb-2">Get Results</Text>
              <Text className="text-base font-sfmedium text-gray-600 leading-6">
                Receive instant diagnosis with detailed information about the detected disease, including confidence level and visual indicators.
              </Text>
            </View>
          </View>
          
        
          <View className="flex-row">
            <View className="h-12 w-12 rounded-full bg-green-100 items-center justify-center mr-4">
              <Text className="text-xl font-sfbold text-green-600">4</Text>
            </View>
            <View className="flex-1">
              <Text className="text-xl font-sfbold text-green-700 mb-2">Treatment Recommendations</Text>
              <Text className="text-base font-sfmedium text-gray-600 leading-6">
                Follow our expert-backed treatment suggestions to address the issue and prevent further spread of the disease.
              </Text>
            </View>
          </View>
        </View>
        
     
        <View className="px-6 py-8 bg-green-50">
          <Text className="text-2xl font-sfbold text-green-700 mb-4">Our Technology</Text>
          
          <View className="bg-white rounded-xl p-5 shadow-sm mb-4">
            <View className="flex-row items-center mb-2">
              <Ionicons name="scan-outline" size={24} color="#16a34a" />
              <Text className="text-lg font-sfbold text-green-700 ml-2">Computer Vision</Text>
            </View>
            <Text className="text-base font-sfmedium text-gray-600">
              Advanced image processing techniques to analyze plant features and identify visual symptoms.
            </Text>
          </View>
          
          <View className="bg-white rounded-xl p-5 shadow-sm mb-4">
            <View className="flex-row items-center mb-2">
              <Ionicons name="extension-puzzle-outline" size={24} color="#16a34a" />
              <Text className="text-lg font-sfbold text-green-700 ml-2">Deep Learning</Text>
            </View>
            <Text className="text-base font-sfmedium text-gray-600">
              Neural networks trained on thousands of plant disease images for accurate identification.
            </Text>
          </View>
          
          <View className="bg-white rounded-xl p-5 shadow-sm">
            <View className="flex-row items-center mb-2">
              <Ionicons name="leaf-outline" size={24} color="#16a34a" />
              <Text className="text-lg font-sfbold text-green-700 ml-2">Agricultural Expertise</Text>
            </View>
            <Text className="text-base font-sfmedium text-gray-600">
              Recommendations developed with agricultural scientists and plant pathologists.
            </Text>
          </View>
        </View>
        
       
        <View className="px-6 py-8 items-center">
          <Text className="text-xl font-sfbold text-green-700 mb-4 text-center">
            Ready to protect your lettuce crops?
          </Text>
          <TouchableOpacity
            className="bg-green-600 rounded-xl py-4 px-8 shadow-md"
            activeOpacity={0.8}
            onPress={() => router.push('/')}
          >
            <Text className="text-white font-sfbold text-center text-lg">
              Start Scanning
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Learn