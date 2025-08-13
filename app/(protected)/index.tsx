import AsyncStorage from "@react-native-async-storage/async-storage";

import { TouchableOpacity, Text, View, Alert } from "react-native";
import { Indexstyles as styles } from "@/styles/styles";
import axios, { AxiosError } from "axios";
import React, { useEffect } from "react";
import { AuthResponse } from "@/types";
import { router } from "expo-router";

export default function Index(): React.JSX.Element {
  useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      try {
        // Get token from storage
        const token: string | null = await AsyncStorage.getItem("token");

        if (!token) {
          Alert.alert("Not Logged In", "Please log in to continue.", [
            { text: "OK", onPress: () => router.replace("/login") },
          ]);

          return;
        }

        // Call Auth API
        const res = await axios.post<AuthResponse>(
          "<your-app-url>/api/auth",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // If no user in response
        if (!res.data.user) {
          await AsyncStorage.removeItem("token");

          Alert.alert(
            "Session Expired",
            "Your session has expired. Please log in again.",
            [{ text: "OK", onPress: () => router.replace("/login") }]
          );
        } else {
          Alert.alert("Welcome Back", `Hello, ${res.data.user.name}!`);
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ message?: string }>;
          const message =
            axiosError.response?.data?.message || axiosError.message;

          if (
            message.includes("Access Denied") ||
            message.includes("Invalid Token") ||
            message.includes("User Not Found")
          ) {
            await AsyncStorage.removeItem("token");

            Alert.alert("Authentication Failed", "Please log in again.", [
              { text: "OK", onPress: () => router.replace("/login") },
            ]);
          } else {
            Alert.alert("Error", message || "Something went wrong.");
          }
        } else {
          await AsyncStorage.removeItem("token");

          Alert.alert("Unexpected Error", "Please log in again.", [
            { text: "OK", onPress: () => router.replace("/login") },
          ]);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem("token");

      Alert.alert("Logged Out", "You have been logged out successfully.", [
        { text: "OK", onPress: () => router.replace("/login") },
      ]);
    } catch (error: unknown) {
      Alert.alert("Error", "Could not log out. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ You’re Logged In</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
