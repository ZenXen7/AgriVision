import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

const Scan = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      analyzeImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      analyzeImage(result.assets[0].uri);
    }
  };

  const analyzeImage = async (imageUri: string) => {
    setIsAnalyzing(true);
    try {
      // Add your API call here to analyze the image
      // const response = await fetch('your-api-endpoint', {
      //   method: 'POST',
      //   body: JSON.stringify({ image: imageUri })
      // });
      // const result = await response.json();
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Handle the result
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 pt-4">
        <Text className="text-3xl font-sfbold text-green-700 mb-2">
          Scan Lettuce
        </Text>
        <Text className="text-base font-sfmedium text-gray-600">
          Take a photo or upload an image to analyze
        </Text>
      </View>

      <View className="flex-1 items-center justify-center px-6">
        {image ? (
          <View className="w-full">
            <Image
              source={{ uri: image }}
              className="w-full h-80 rounded-2xl mb-4"
              resizeMode="cover"
            />
            {isAnalyzing ? (
              <View className="bg-green-50 p-4 rounded-2xl items-center">
                <Text className="text-green-700 font-sfmedium">
                  Analyzing image...
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => setImage(null)}
                className="bg-red-50 p-4 rounded-2xl items-center"
              >
                <Text className="text-red-600 font-sfmedium">
                  Try Another Image
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View className="space-y-4 w-full">
            <TouchableOpacity
              onPress={takePhoto}
              className="flex-row items-center justify-center bg-green-600 p-4 rounded-2xl space-x-2"
            >
              <Ionicons name="camera-outline" size={24} color="white" />
              <Text className="text-white font-sfmedium text-lg">
                Take Photo
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={pickImage}
              className="flex-row items-center justify-center bg-green-50 p-4 rounded-2xl space-x-2"
            >
              <Ionicons name="images-outline" size={24} color="#16a34a" />
              <Text className="text-green-700 font-sfmedium text-lg">
                Choose from Gallery
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

export default Scan