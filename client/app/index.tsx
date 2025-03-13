import { Link } from "expo-router";
import { Image, Text, View, TouchableOpacity, StatusBar, Pressable, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../constants/images";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  return (
    <LinearGradient
      colors={['#f0f9f0', '#ffffff']}
      className="h-full"
    >
      <SafeAreaView className="h-full pt-safe">
        <View className="w-full flex justify-between h-full items-center px-6 py-8">
      
          <View className="w-full items-center mt-4">
            <Text className="text-green-600 font-intero text-6xl mb-2">AgriVision</Text>
            <Text className="text-green-700/70 font-sfmedium text-lg">Plant Health Assistant</Text>
          </View>
          
       
          <View className="w-full items-center">
            <Image 
              source={images.home} 
              className="w-[320px] h-[280px]"
              resizeMode="contain" 
            />
            
            <View className="bg-white/80 rounded-3xl p-6 shadow-sm w-full mt-1">
              <Text className="text-green-600 font-sfbold text-2xl mb-3">
                Detect Plant Diseases Instantly
              </Text>
              <Text className="text-gray-700 font-sfmedium text-base text-center leading-6">
                Our AI technology identifies lettuce diseases with a simple photo, 
                providing immediate diagnosis and treatment recommendations.
              </Text>
            </View>
          </View>
          
        
          <View className="w-full items-center">
              <Link href="/create" asChild>
            <TouchableOpacity className="bg-green-600 w-full rounded-2xl py-4 shadow-md" activeOpacity={0.8}>
              <Text className="text-white font-sfbold text-center text-lg">Get Started</Text>
            </TouchableOpacity>
             </Link>
          
          <Link href="/learn" asChild>
          <TouchableOpacity className="mt-4">
              <Text className="text-green-700 font-sfmedium text-base">
                Learn how it works
              </Text>
              
            </TouchableOpacity>
          </Link> 
           
          </View>
        </View>
        <StatusBar barStyle="dark-content" />
      </SafeAreaView>
    </LinearGradient>
  );
}