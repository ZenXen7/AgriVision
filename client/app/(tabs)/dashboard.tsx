import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import images from "../../constants/images";

const Dashboard = () => {
  const router = useRouter();

  const stats = [
    { label: "Total Scans", value: "24", icon: "scan-outline" },
    { label: "Healthy", value: "18", icon: "leaf-outline" },
    { label: "Diseased", value: "6", icon: "warning-outline" },
  ];

  const recentScans = [
    {
      id: 1,
      date: "2024-03-20",
      result: "Healthy",
      confidence: "98%",
      image: images.lettuce,
    },
    {
      id: 2,
      date: "2024-03-18",
      result: "Diseased",
      confidence: "85%",
      image: images.lettuce,
    },
  ];

  const tips = [
    {
      id: 1,
      icon: '🌱',
      title: 'Proper Watering',
      description: 'Water deeply but infrequently to encourage root growth.'
    },
    {
      id: 2,
      icon: '☀️',
      title: 'Sunlight',
      description: 'Ensure 4-6 hours of direct sunlight daily.'
    },
    {
      id: 3,
      icon: '🌡️',
      title: 'Temperature',
      description: 'Keep between 60-70°F for optimal growth.'
    },
    {
      id: 4,
      icon: '🦠',
      title: 'Disease Prevention',
      description: 'Monitor leaves regularly for spots or discoloration.'
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }} 
      >
        <View className="p-6 mt-5">
          <Text className="text-5xl font-sfbold text-green-700">Dashboard</Text>
          <Text className="text-base font-sfmedium text-green-800">
            Monitor lettuce health, analyze data, and optimize farm conditions.
          </Text>
        </View>

        <View className="px-6">
          
          <View className="flex-row justify-between space-x-4 gap-2">
            {stats.map((stat, index) => (
              <View
                key={index}
                className="flex-1 bg-green-50 p-4 rounded-2xl shadow-sm"
              >
                <Ionicons
                  name={stat.icon as "scan-outline" | "leaf-outline" | "warning-outline"}
                  size={28}
                  color="#16a34a"
                />
                <Text className="text-2xl font-sfbold text-green-700 mt-2">
                  {stat.value}
                </Text>
                <Text className="text-sm font-sfmedium text-gray-600">
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="px-6 py-4">
          
          <TouchableOpacity
            onPress={() => router.push("/scan")}
            className="flex-row items-center justify-between bg-green-600 p-4 rounded-2xl shadow-md"
          >
            <View className="flex-row items-center space-x-3 gap-2">
              <Ionicons name="scan-outline" size={24} color="white" />
              <Text className="text-white font-sfmedium text-lg">Start New Scan</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View className="px-6 py-4">
          <Text className="text-xl font-sfbold text-green-800 mb-4">Recent Scans</Text>
          {recentScans.map((scan) => (
            <TouchableOpacity
              key={scan.id}
              className="flex-row items-center bg-white p-4 rounded-2xl border border-gray-100 mb-3 shadow-sm"
            >
              <Image
                source={images.lettuce}
                className="w-16 h-16 rounded-xl mr-4"
                resizeMode="cover"
              />
              <View className="flex-1">
                <Text className="font-sfmedium text-gray-900">{scan.result}</Text>
                <Text className="text-sm text-gray-500">
                  {scan.date} - {scan.confidence}
                </Text>
              </View>
              <Ionicons
                name={scan.result === "Healthy" ? "leaf-outline" : "warning-outline"}
                size={24}
                color={scan.result === "Healthy" ? "#16a34a" : "#ef4444"}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View className="py-4">
          <Text className="text-xl font-sfbold text-green-800 mb-4 px-6">Growing Tips</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            decelerationRate="fast"
            snapToInterval={Dimensions.get('window').width * 0.85 + 16}
            snapToAlignment="center"
            contentContainerStyle={{ paddingHorizontal: 24 }}
          >
            {tips.map((tip) => (
              <View
                key={tip.id}
                style={{ width: Dimensions.get('window').width * 0.85 }}
                className="bg-green-50 p-6 rounded-2xl border-green-700  mr-4"
              >
                <Text className="text-5xl mb-2">{tip.icon}</Text>
                <Text className="text-2xl font-sfbold text-green-800 mb-2">
                  {tip.title}
                </Text>
                <Text className="text-base font-sfmedium text-gray-700">
                  {tip.description}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
