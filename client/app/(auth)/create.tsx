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
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';

const Signup = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    setErrorMessage('');
    console.log('Create Account Pressed');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView className="flex-1">
            {/* Header */}
            <View className="px-6 pt-4 pb-6">
              <TouchableOpacity onPress={() => router.back()} className="mb-4">
                <Ionicons name="arrow-back" size={24} color="#16a34a" />
              </TouchableOpacity>
              <View className="py-4 -ml-2">
                <Ionicons name="person-circle" size={64} color="#16a34a" />
              </View>

              <Text className="text-3xl font-sfbold text-green-700 mb-2">Create Account</Text>
              <Text className="text-base font-sfmedium text-gray-600">
              Discover how our AI technology helps you identify and treat lettuce diseases.
              </Text>
            </View>

            <View className="px-6 py-4 space-y-4">
             
              <View className="space-y-1">
                <View
                  className={`w-full px-4 pt-5 pb-2 bg-white rounded-2xl border flex-row items-center mt-2 mb-2 ${
                    focusedField === 'Email' || email ? 'border-2 border-green-700' : 'border-gray-200'
                  }`}
                  style={{ height: 64 }}
                >
                  <Text
                    className={`absolute left-5 ${
                      focusedField === 'Email' || email
                        ? 'text-sm top-2 text-green-700'
                        : 'text-base top-5 text-gray-500'
                    } transition-all duration-200`}
                  >
                    Email
                  </Text>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder=""
                    className="flex-1 text-lg text-black font-sfmedium"
                    onFocus={() => setFocusedField('Email')}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      height: '100%',
                      textAlignVertical: 'center',
                      paddingVertical: 0,
                    }}
                  />
                </View>
              </View>

              {[
                { label: 'Password', value: password, setter: setPassword, show: showPassword, setShow: setShowPassword },
                { label: 'Confirm Password', value: confirmPassword, setter: setConfirmPassword, show: showConfirmPassword, setShow: setShowConfirmPassword },
              ].map(({ label, value, setter, show, setShow }, index) => (
                <View key={index} className="space-y-1">
                  <View
                    className={`w-full px-4 pt-5 pb-2 bg-white rounded-2xl border flex-row items-center mt-2 mb-2 ${
                      focusedField === label || value ? 'border-2 border-green-700' : 'border-gray-200'
                    }`}
                    style={{ height: 64 }}
                  >
                    <Text
                      className={`absolute left-5 ${
                        focusedField === label || value
                          ? 'text-sm top-2 text-green-700'
                          : 'text-base top-5 text-gray-500'
                      } transition-all duration-200`}
                    >
                      {label}
                    </Text>
                    <TextInput
                      value={value}
                      onChangeText={setter}
                      placeholder=""
                      secureTextEntry={!show}
                      className="flex-1 text-lg text-black font-sfmedium"
                      onFocus={() => setFocusedField(label)}
                      onBlur={() => setFocusedField(null)}
                      style={{
                        height: '100%',
                        textAlignVertical: 'center',
                        paddingVertical: 0,
                      }}
                    />
                    <TouchableOpacity onPress={() => setShow(!show)} className="p-2">
                      <Ionicons name={show ? 'eye-off' : 'eye'} size={24} color="gray" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}

         
              {errorMessage !== '' && (
                <Text className="text-red-500 text-sm text-center">{errorMessage}</Text>
              )}

              <Link href="/personal" asChild>
              <TouchableOpacity
                className="bg-green-600 w-full rounded-2xl py-4 shadow-md mt-4"
                activeOpacity={0.8}
                onPress={handleSignup}
              >
                <Text className="text-white font-sfbold text-center text-lg">Continue</Text>
              </TouchableOpacity>
              </Link>
              

              
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;
