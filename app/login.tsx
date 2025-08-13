import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginStyles as styles } from "@/styles/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import { loginSchema } from "@/zod/schema";
import { router } from "expo-router";
import { LoginForm } from "@/types";

import React from "react";

export default function Login(): React.JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  // ---------------- HANDLE LOGIN ----------------
  const handleLogin: (data: LoginForm) => Promise<void> = async (data) => {
    try {
      const res: AxiosResponse<{ token: string }> = await axios.post("<your-app-url>/api/login", data);

      // Save Token To Storage
      await AsyncStorage.setItem("token", res.data.token);

      Alert.alert("Success", "You Have Successfully Logged In!");
      router.replace("/");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        Alert.alert(
          "Login Failed",
          error.response?.data?.message || "Something Went Wrong"
        );
      } else {
        Alert.alert("Unexpected Error", "Please Try Again Later.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign In</Text>

      {/* Email Field */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      {/* Password Field */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      {/* Login Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(handleLogin)}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Register Link */}
      <View style={styles.loginRow}>
        <Text style={styles.linkText}>Don't Have An Account? </Text>

        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.loginLink}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
