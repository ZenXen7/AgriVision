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
  Modal,
} from "react-native";

import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

const Personal = () => {
  const router = useRouter();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleCloseModal = () => {
    setShowDatePicker(false);
  };


  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
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
                <Ionicons name="person-outline" size={64} color="#16a34a" />
              </View>

              <Text className="text-3xl font-sfbold text-green-700 mb-2">
                Personal Information
              </Text>

              <Text className="text-base text-gray-600 font-sfmedium">
                Fill out your personal information to get started.
              </Text>
            </View>

            <View className="px-6 py-4 space-y-4">
             
              <View className="space-y-1">
                <View
                  className={`w-full px-4 pt-5 pb-2 bg-white rounded-2xl border flex-row items-center mt-2 mb-2 ${
                    focusedField === "First Name" || firstName
                      ? "border-2 border-green-700"
                      : "border-gray-200"
                  }`}
                  style={{ height: 64 }}
                >
                  <Text
                    className={`absolute left-5 ${
                      focusedField === "First Name" || firstName
                        ? "text-sm top-2 text-green-700"
                        : "text-base top-5 text-gray-500"
                    } transition-all duration-200`}
                  >
                    First Name
                  </Text>
                  <TextInput
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder=""
                    className="flex-1 text-lg text-black font-sfmedium"
                    onFocus={() => setFocusedField("First Name")}
                    onBlur={() => setFocusedField(null)}
                    style={{ height: "100%", textAlignVertical: "center", paddingVertical: 0 }}
                  />
                </View>
              </View>

            
              <View className="space-y-1">
                <View
                  className={`w-full px-4 pt-5 pb-2 bg-white rounded-2xl border flex-row items-center mt-2 mb-2 ${
                    focusedField === "Last Name" || lastName
                      ? "border-2 border-green-700"
                      : "border-gray-200"
                  }`}
                  style={{ height: 64 }}
                >
                  <Text
                    className={`absolute left-5 ${
                      focusedField === "Last Name" || lastName
                        ? "text-sm top-2 text-green-700"
                        : "text-base top-5 text-gray-500"
                    } transition-all duration-200`}
                  >
                    Last Name
                  </Text>
                  <TextInput
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder=""
                    className="flex-1 text-lg text-black font-sfmedium"
                    onFocus={() => setFocusedField("Last Name")}
                    onBlur={() => setFocusedField(null)}
                    style={{ height: "100%", textAlignVertical: "center", paddingVertical: 0 }}
                  />
                </View>
              </View>

          
              <View className="space-y-1">
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  className={`w-full px-4 pt-5 pb-2 bg-white rounded-2xl border flex-row items-center mt-2 mb-2 ${
                    focusedField === "Birth Date" || date
                      ? "border-2 border-green-700"
                      : "border-gray-200"
                  }`}
                  style={{ height: 64 }}
                  activeOpacity={0.7}
                >
                  <Text
                    className={`absolute left-5 ${
                      date ? "text-sm top-2 text-green-700" : "text-base top-5 text-gray-500"
                    } transition-all duration-200`}
                  >
                    Birth Date
                  </Text>
                  <Text className="flex-1 text-base text-black">
                    {formatDate(date)}
                  </Text>
                  <Ionicons 
                    name="calendar-outline" 
                    size={22} 
                    color="#16a34a" 
                    className="mr-2"
                  />
                </TouchableOpacity>
                
       
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={showDatePicker}
                  onRequestClose={handleCloseModal}
                >
                  <TouchableWithoutFeedback onPress={handleCloseModal}>
                    <View className="flex-1 justify-center items-center bg-black/50">
                      <TouchableWithoutFeedback>
                        <View className="bg-white p-6 rounded-3xl w-5/6 items-center">
                          <Text className="text-xl font-semibold text-green-700 mb-4">
                            Select Birth Date
                          </Text>
                          
                          <DateTimePicker
                            value={date}
                            mode="date"
                            display="spinner"
                            onChange={handleDateChange}
                            maximumDate={new Date()}
                            themeVariant="light"
                            style={{ width: '100%' }}
                          />
                          
                          <View className="flex-row justify-end w-full mt-4 space-x-3 gap-2">
                            <TouchableOpacity
                              onPress={handleCloseModal}
                              className="px-5 py-2 rounded-xl border border-green-600"
                            >
                              <Text className="text-green-600 font-medium">Cancel</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                              onPress={handleCloseModal}
                              className="px-5 py-2 rounded-xl bg-green-600"
                            >
                              <Text className="text-white font-medium">Confirm</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </TouchableWithoutFeedback>
                </Modal>
              </View>

            
              <TouchableOpacity
                className="bg-green-600 w-full rounded-2xl py-4 shadow-md mt-6"
                activeOpacity={0.8}
                onPress={() => console.log("Submitted")}
              >
                <Text className="text-white font-sfbold text-center text-lg">
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Personal;