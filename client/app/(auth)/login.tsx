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
import { useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore";

const Login = () => {
  const { email, password, setEmail, setPassword, loginUser } = useAuthStore();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");

      const { success, message } = await loginUser();

      if (success) {
        router.replace("/dashboard");
      } else {
        setErrorMessage(message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
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
              <View className="py-4 -ml-1">
                <Ionicons name="log-in-outline" size={64} color="#16a34a" />
              </View>

              <Text className="text-3xl font-sfbold text-green-700 mb-2">
                Welcome Back
              </Text>
              <Text className="text-base font-sfmedium text-gray-600">
                Login to continue monitoring your lettuce health with AI assistance.
              </Text>
            </View>

            <View className="px-6 py-4 space-y-4">
              <View className="space-y-1">
                <View
                  className={`w-full px-4 pt-5 pb-2 bg-white rounded-2xl border flex-row items-center mt-2 mb-2 ${
                    focusedField === "Email" || email
                      ? "border-2 border-green-700"
                      : "border-gray-200"
                  }`}
                  style={{ height: 64 }}
                >
                  <Text
                    className={`absolute left-5 ${
                      focusedField === "Email" || email
                        ? "text-sm top-2 text-green-700"
                        : "text-base top-5 text-gray-500"
                    } transition-all duration-200`}
                  >
                    Email
                  </Text>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder=""
                    className="flex-1 text-lg text-black font-sfmedium"
                    onFocus={() => setFocusedField("Email")}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      height: "100%",
                      textAlignVertical: "center",
                      paddingVertical: 0,
                    }}
                  />
                </View>
              </View>

              <View className="space-y-1">
                <View
                  className={`w-full px-4 pt-5 pb-2 bg-white rounded-2xl border flex-row items-center mt-2 mb-2 ${
                    focusedField === "Password" || password
                      ? "border-2 border-green-700"
                      : "border-gray-200"
                  }`}
                  style={{ height: 64 }}
                >
                  <Text
                    className={`absolute left-5 ${
                      focusedField === "Password" || password
                        ? "text-sm top-2 text-green-700"
                        : "text-base top-5 text-gray-500"
                    } transition-all duration-200`}
                  >
                    Password
                  </Text>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder=""
                    secureTextEntry={!showPassword}
                    className="flex-1 text-lg text-black font-sfmedium"
                    onFocus={() => setFocusedField("Password")}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      height: "100%",
                      textAlignVertical: "center",
                      paddingVertical: 0,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="p-2"
                  >
                    <Ionicons
                      name={showPassword ? "eye-off" : "eye"}
                      size={24}
                      color="gray"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {errorMessage !== "" && (
                <Text className="text-red-500 text-sm text-center">
                  {errorMessage}
                </Text>
              )}

              <TouchableOpacity
                className={`bg-green-600 w-full rounded-2xl py-4 shadow-md mt-4 ${
                  isLoading ? "opacity-70" : ""
                }`}
                activeOpacity={0.8}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <Text className="text-white font-sfbold text-center text-lg">
                  {isLoading ? "Logging in..." : "Login"}
                </Text>
              </TouchableOpacity>

              <View className="flex-row justify-center items-center mt-4">
                <Text className="text-gray-600 font-sfmedium">
                  Don't have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => router.push("/create")}>
                  <Text className="text-green-700 font-sfbold">Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;